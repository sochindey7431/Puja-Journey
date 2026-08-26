import { useEffect, useRef, useCallback } from 'react';
import { useMusicContext } from '../contexts/MusicContext.jsx';

let isScriptLoading = false;
let isScriptLoaded = false;
const readyQueue = [];

function loadYTAPI() {
  if (isScriptLoaded) return;
  if (window.YT && window.YT.Player) {
    isScriptLoaded = true;
    return;
  }
  if (isScriptLoading) return;
  isScriptLoading = true;

  window.onYouTubeIframeAPIReady = () => {
    isScriptLoaded = true;
    isScriptLoading = false;
    readyQueue.forEach(cb => {
      try { cb(); } catch (e) {}
    });
    readyQueue.length = 0;
  };

  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  tag.async = true;
  document.head.appendChild(tag);
}

function runWhenYTReady(fn) {
  if (isScriptLoaded || (window.YT && window.YT.Player)) {
    fn();
  } else {
    readyQueue.push(fn);
    loadYTAPI();
  }
}

export function useYouTubePlayer(elementId) {
  const {
    currentTrack,
    isPlaying,
    setIsPlaying,
    nextTrack,
    playerRef,
    setPlayerReady,
    volume,
    isMuted,
  } = useMusicContext();

  const playerInstanceRef = useRef(null);
  const trackIdRef = useRef(currentTrack?.id);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    trackIdRef.current = currentTrack?.id;
  }, [currentTrack?.id]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Create player
  const initPlayer = useCallback(() => {
    if (!elementId || playerInstanceRef.current) return;
    const el = document.getElementById(elementId);
    if (!el) return;

    try {
      const player = new window.YT.Player(elementId, {
        height: '100%',
        width: '100%',
        videoId: trackIdRef.current || 'SUT_e3BKB6c',
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          enablejsapi: 1,
          fs: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (e) => {
            playerInstanceRef.current = e.target;
            playerRef.current = e.target;
            setPlayerReady(true);
            try {
              e.target.setVolume(volume);
              if (isMuted) e.target.mute();
              if (isPlayingRef.current) {
                e.target.playVideo();
              }
            } catch (err) {}
          },
          onStateChange: (e) => {
            const YT = window.YT;
            if (!YT) return;
            if (e.data === YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (e.data === YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            } else if (e.data === YT.PlayerState.ENDED) {
              setIsPlaying(false);
              nextTrack();
            } else if (e.data === YT.PlayerState.BUFFERING) {
              setIsPlaying(true);
            }
          },
          onError: (e) => {
            console.warn('YouTube playback error code:', e.data);
            // Skip to next track if video is restricted or unavailable
            setTimeout(() => nextTrack(), 1200);
          },
        },
      });
    } catch (err) {
      console.warn('YT.Player init failed:', err);
    }
  }, [elementId, nextTrack, playerRef, setIsPlaying, setPlayerReady, volume, isMuted]);

  // Init on mount or when element is ready
  useEffect(() => {
    runWhenYTReady(() => {
      // small tick to ensure DOM element exists
      setTimeout(initPlayer, 100);
    });
  }, [initPlayer]);

  // Load new video when track changes
  useEffect(() => {
    if (!currentTrack?.id || !playerInstanceRef.current) return;
    try {
      if (playerInstanceRef.current.loadVideoById) {
        playerInstanceRef.current.loadVideoById({
          videoId: currentTrack.id,
          startSeconds: 0,
        });
        if (isPlaying) {
          playerInstanceRef.current.playVideo();
        }
      }
    } catch (e) {
      console.warn('Error loading video by ID:', e);
    }
  }, [currentTrack?.id]); // eslint-disable-line

  // Handle play/pause externally
  useEffect(() => {
    if (!playerInstanceRef.current) return;
    try {
      const state = playerInstanceRef.current.getPlayerState?.();
      const YT = window.YT;
      if (isPlaying) {
        if (state !== YT?.PlayerState?.PLAYING && state !== YT?.PlayerState?.BUFFERING) {
          playerInstanceRef.current.playVideo?.();
        }
      } else {
        if (state === YT?.PlayerState?.PLAYING || state === YT?.PlayerState?.BUFFERING) {
          playerInstanceRef.current.pauseVideo?.();
        }
      }
    } catch (e) {}
  }, [isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (!playerInstanceRef.current?.setVolume) return;
    try {
      playerInstanceRef.current.setVolume(volume);
      if (isMuted) {
        playerInstanceRef.current.mute();
      } else {
        playerInstanceRef.current.unMute();
      }
    } catch (e) {}
  }, [volume, isMuted]);

  return { player: playerInstanceRef.current };
}

export default useYouTubePlayer;
