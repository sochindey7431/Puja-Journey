import { useEffect, useRef, useCallback } from 'react';
import { useMusicContext } from '../contexts/MusicContext.jsx';
import { AUTO_ADVANCE_PLAYLIST } from '../config/musicConfig.js';

let isScriptLoading = false;
let isScriptLoaded = false;
const readyQueue = [];

function loadYTAPI() {
  if (isScriptLoaded) return;
  if (typeof window !== 'undefined' && window.YT && window.YT.Player) {
    isScriptLoaded = true;
    return;
  }
  if (isScriptLoading) return;
  isScriptLoading = true;

  window.onYouTubeIframeAPIReady = () => {
    isScriptLoaded = true;
    isScriptLoading = false;
    readyQueue.forEach(cb => {
      try { cb(); } catch (e) {
        console.warn('[Music] ready callback error:', e);
      }
    });
    readyQueue.length = 0;
  };

  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  tag.async = true;
  document.head.appendChild(tag);
}

function runWhenYTReady(fn) {
  if (isScriptLoaded || (typeof window !== 'undefined' && window.YT && window.YT.Player)) {
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
    setIsBuffering,
    setIsLoading,
    setCurrentTime,
    setDuration,
    nextTrack,
    playerRef,
    setPlayerReady,
    volume,
    isMuted,
    setErrorMessage,
  } = useMusicContext();

  const playerInstanceRef = useRef(null);
  const trackIdRef = useRef(currentTrack?.youtubeId || currentTrack?.id || null);
  const isPlayingRef = useRef(isPlaying);
  const volumeRef = useRef(volume);
  const isMutedRef = useRef(isMuted);
  const nextTrackRef = useRef(nextTrack);
  const setErrorMessageRef = useRef(setErrorMessage);
  const timeIntervalRef = useRef(null);
  const lastLoadedIdRef = useRef(null);
  const isInitializingRef = useRef(false);

  // Keep refs synchronized without triggering effect re-runs
  useEffect(() => {
    trackIdRef.current = currentTrack?.youtubeId || currentTrack?.id || null;
  }, [currentTrack?.youtubeId, currentTrack?.id]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    nextTrackRef.current = nextTrack;
  }, [nextTrack]);

  useEffect(() => {
    setErrorMessageRef.current = setErrorMessage;
  }, [setErrorMessage]);

  // Poll playback position smoothly
  const startTimePolling = useCallback(() => {
    if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);
    timeIntervalRef.current = setInterval(() => {
      if (playerInstanceRef.current && typeof playerInstanceRef.current.getCurrentTime === 'function') {
        try {
          const cur = playerInstanceRef.current.getCurrentTime();
          const dur = playerInstanceRef.current.getDuration();
          if (typeof cur === 'number' && !isNaN(cur) && isFinite(cur) && cur >= 0) {
            setCurrentTime(cur);
          }
          if (typeof dur === 'number' && !isNaN(dur) && isFinite(dur) && dur > 0) {
            setDuration(dur);
          }
        } catch (e) {}
      }
    }, 250);
  }, [setCurrentTime, setDuration]);

  const stopTimePolling = useCallback(() => {
    if (timeIntervalRef.current) {
      clearInterval(timeIntervalRef.current);
      timeIntervalRef.current = null;
    }
  }, []);

  // Initialize YT.Player once with the selected track
  const initPlayer = useCallback(() => {
    if (!elementId) return;
    if (playerInstanceRef.current || isInitializingRef.current) return;
    const el = document.getElementById(elementId);
    if (!el || typeof window === 'undefined' || !window.YT || !window.YT.Player) return;

    const initialVideoId = trackIdRef.current;
    if (!initialVideoId) return; // Wait until a festival track is selected

    isInitializingRef.current = true;
    lastLoadedIdRef.current = initialVideoId;

    try {
      const player = new window.YT.Player(elementId, {
        height: '100%',
        width: '100%',
        videoId: initialVideoId,
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
            isInitializingRef.current = false;
            setPlayerReady(true);
            setIsLoading(false);
            try {
              e.target.setVolume(volumeRef.current);
              if (isMutedRef.current) e.target.mute();
              if (isPlayingRef.current) {
                e.target.playVideo();
                startTimePolling();
              }
            } catch (err) {}
          },
          onStateChange: (e) => {
            const YT = window.YT;
            if (!YT) return;
            if (e.data === YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              setIsBuffering(false);
              setIsLoading(false);
              startTimePolling();
            } else if (e.data === YT.PlayerState.PAUSED) {
              setIsPlaying(false);
              setIsBuffering(false);
              stopTimePolling();
            } else if (e.data === YT.PlayerState.ENDED) {
              setIsPlaying(false);
              setIsBuffering(false);
              stopTimePolling();
              if (AUTO_ADVANCE_PLAYLIST && typeof nextTrackRef.current === 'function') {
                nextTrackRef.current();
              }
            } else if (e.data === YT.PlayerState.BUFFERING) {
              setIsBuffering(true);
            } else if (e.data === YT.PlayerState.CUED) {
              setIsBuffering(false);
              setIsLoading(false);
            }
          },
          onError: (e) => {
            console.warn('[Music] YouTube Player notice code:', e.data);
            setIsBuffering(false);
            setIsLoading(false);

            let msg = 'This devotional track is currently unavailable. Playing next track...';
            if (e.data === 101 || e.data === 150) {
              msg = 'This track has YouTube playback restrictions. Switching to next track...';
            } else if (e.data === 100) {
              msg = 'This track was not found or removed. Switching to next track...';
            }
            if (typeof setErrorMessageRef.current === 'function') {
              setErrorMessageRef.current(msg);
            }

            // Move to next track after brief delay without reloading
            setTimeout(() => {
              if (AUTO_ADVANCE_PLAYLIST && typeof nextTrackRef.current === 'function') {
                nextTrackRef.current();
              }
            }, 2000);
          },
        },
      });
    } catch (err) {
      isInitializingRef.current = false;
      console.warn('[Music] YT.Player init error:', err);
    }
  }, [
    elementId,
    playerRef,
    setIsPlaying,
    setIsBuffering,
    setIsLoading,
    setPlayerReady,
    startTimePolling,
    stopTimePolling,
  ]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      stopTimePolling();
    };
  }, [stopTimePolling]);

  // Load new video when current track changes (IN-MEMORY on existing player instance)
  useEffect(() => {
    const videoId = currentTrack?.youtubeId || currentTrack?.id;
    if (!videoId) return;

    // If player is not initialized yet, initialize it
    if (!playerInstanceRef.current) {
      runWhenYTReady(() => {
        setTimeout(initPlayer, 50);
      });
      return;
    }

    if (lastLoadedIdRef.current === videoId) return;
    lastLoadedIdRef.current = videoId;

    try {
      if (typeof playerInstanceRef.current.loadVideoById === 'function') {
        playerInstanceRef.current.loadVideoById(videoId, 0);
        if (isPlaying) {
          startTimePolling();
        }
      }
    } catch (e) {
      console.warn('[Music] Error loading video by ID:', e);
    }
  }, [currentTrack?.youtubeId, currentTrack?.id, initPlayer, isPlaying, startTimePolling]);

  // Handle external play/pause triggers safely
  useEffect(() => {
    if (!playerInstanceRef.current) return;
    try {
      const state = playerInstanceRef.current.getPlayerState?.();
      const YT = window.YT;
      if (isPlaying) {
        if (state !== YT?.PlayerState?.PLAYING && state !== YT?.PlayerState?.BUFFERING) {
          playerInstanceRef.current.playVideo?.();
          startTimePolling();
        }
      } else {
        if (state === YT?.PlayerState?.PLAYING || state === YT?.PlayerState?.BUFFERING) {
          playerInstanceRef.current.pauseVideo?.();
          stopTimePolling();
        }
      }
    } catch (e) {}
  }, [isPlaying, startTimePolling, stopTimePolling]);

  // Handle volume changes smoothly
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
