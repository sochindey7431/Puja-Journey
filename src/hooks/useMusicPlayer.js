/**
 * PUJA JOURNEY — useYouTubePlayer
 *
 * ROOT-CAUSE FIXES:
 * FIX #4  — ONE persistent YT.Player instance, never recreated
 * FIX #5  — videoId effect ONLY re-fires on actual video ID change
 *            (initPlayer & startTimePolling removed from deps)
 * FIX #6  — Next/Prev uses existing player.loadVideoById(), no remount
 * FIX #7  — Seek uses player.seekTo() only (handled in MusicContext)
 * FIX #9  — No auto-nextTrack on error (prevents error→next loop)
 * FIX #10 — Error only sets message, never touches overlay/page
 * FIX #15 — Debug logging throughout
 *
 * PRIVACY-ENHANCED MODE:
 * The YT.Player 'host' option is set to 'https://www.youtube-nocookie.com',
 * which is the official YouTube IFrame API way to use Privacy-Enhanced Mode.
 * This does NOT block or modify advertisements — YouTube still serves ads
 * normally. It only changes the iframe embed domain to youtube-nocookie.com
 * per YouTube's official embedding documentation.
 * See: https://developers.google.com/youtube/player_parameters#host
 */
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
    console.log('[YT] API SCRIPT LOADED');
    isScriptLoaded = true;
    isScriptLoading = false;
    readyQueue.forEach(cb => {
      try { cb(); } catch (e) {
        console.warn('[YT] Callback error on ready:', e);
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

  const playerInstanceRef   = useRef(null);
  const isInitializingRef   = useRef(false);
  const lastLoadedIdRef     = useRef(null);
  const timeIntervalRef     = useRef(null);

  const isPlayingRef        = useRef(isPlaying);
  const volumeRef           = useRef(volume);
  const isMutedRef          = useRef(isMuted);
  const nextTrackRef        = useRef(nextTrack);
  const setErrorMessageRef  = useRef(setErrorMessage);
  const setCurrentTimeRef   = useRef(setCurrentTime);
  const setDurationRef      = useRef(setDuration);
  const setIsPlayingRef     = useRef(setIsPlaying);
  const setIsBufferingRef   = useRef(setIsBuffering);
  const setIsLoadingRef     = useRef(setIsLoading);

  const startPollingRef     = useRef(null);
  const stopPollingRef      = useRef(null);
  const initPlayerRef       = useRef(null);

  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { volumeRef.current = volume; }, [volume]);
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);
  useEffect(() => { nextTrackRef.current = nextTrack; }, [nextTrack]);
  useEffect(() => { setErrorMessageRef.current = setErrorMessage; }, [setErrorMessage]);
  useEffect(() => { setCurrentTimeRef.current = setCurrentTime; }, [setCurrentTime]);
  useEffect(() => { setDurationRef.current = setDuration; }, [setDuration]);
  useEffect(() => { setIsPlayingRef.current = setIsPlaying; }, [setIsPlaying]);
  useEffect(() => { setIsBufferingRef.current = setIsBuffering; }, [setIsBuffering]);
  useEffect(() => { setIsLoadingRef.current = setIsLoading; }, [setIsLoading]);

  const startTimePolling = useCallback(() => {
    if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);
    timeIntervalRef.current = setInterval(() => {
      const p = playerInstanceRef.current;
      if (p && typeof p.getCurrentTime === 'function') {
        try {
          const cur = p.getCurrentTime();
          const dur = p.getDuration();
          if (typeof cur === 'number' && !isNaN(cur) && isFinite(cur) && cur >= 0) {
            setCurrentTimeRef.current(cur);
          }
          if (typeof dur === 'number' && !isNaN(dur) && isFinite(dur) && dur > 0) {
            setDurationRef.current(dur);
          }
        } catch (e) {}
      }
    }, 250);
  }, []);

  const stopTimePolling = useCallback(() => {
    if (timeIntervalRef.current) {
      clearInterval(timeIntervalRef.current);
      timeIntervalRef.current = null;
    }
  }, []);

  startPollingRef.current = startTimePolling;
  stopPollingRef.current = stopTimePolling;

  const initPlayer = useCallback(() => {
    if (!elementId) return;
    if (playerInstanceRef.current || isInitializingRef.current) return;
    const el = document.getElementById(elementId);
    if (!el || typeof window === 'undefined' || !window.YT || !window.YT.Player) return;

    const initialVideoId = lastLoadedIdRef.current;
    if (!initialVideoId) return;

    isInitializingRef.current = true;
    console.log('[YT] PLAYER INIT on element:', elementId, 'videoId:', initialVideoId);

    try {
      new window.YT.Player(elementId, {
        height: '100%',
        width: '100%',
        videoId: initialVideoId,
        // Use Privacy-Enhanced Mode via the official 'host' option.
        // The IFrame API will load the embed from youtube-nocookie.com instead
        // of youtube.com. Advertisements are NOT blocked — they still function
        // normally. This follows YouTube's official embedding policy.
        host: 'https://www.youtube-nocookie.com',
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
            console.log('[YT] PLAYER READY');
            playerInstanceRef.current = e.target;
            if (playerRef) playerRef.current = e.target;
            isInitializingRef.current = false;
            setPlayerReady(true);
            setIsLoadingRef.current(false);
            try {
              e.target.setVolume(volumeRef.current);
              if (isMutedRef.current) e.target.mute();
              if (isPlayingRef.current) {
                e.target.playVideo();
                startPollingRef.current?.();
              }
            } catch (err) {
              console.warn('[YT] onReady setup error:', err);
            }
          },
          onStateChange: (e) => {
            const YTState = window.YT?.PlayerState;
            if (!YTState) return;
            const stateLabel =
              e.data === 1 ? 'PLAYING' :
              e.data === 2 ? 'PAUSED' :
              e.data === 0 ? 'ENDED' :
              e.data === 3 ? 'BUFFERING' :
              e.data === 5 ? 'CUED' : `UNSTARTED(${e.data})`;
            console.log('[YT] PLAYER STATE:', stateLabel);

            if (e.data === YTState.PLAYING) {
              setIsPlayingRef.current(true);
              setIsBufferingRef.current(false);
              setIsLoadingRef.current(false);
              startPollingRef.current?.();
            } else if (e.data === YTState.PAUSED) {
              setIsPlayingRef.current(false);
              setIsBufferingRef.current(false);
              stopPollingRef.current?.();
            } else if (e.data === YTState.ENDED) {
              setIsPlayingRef.current(false);
              setIsBufferingRef.current(false);
              stopPollingRef.current?.();
              if (AUTO_ADVANCE_PLAYLIST && typeof nextTrackRef.current === 'function') {
                console.log('[YT] ENDED — auto-advancing playlist');
                nextTrackRef.current();
              }
            } else if (e.data === YTState.BUFFERING) {
              setIsBufferingRef.current(true);
            } else if (e.data === YTState.CUED) {
              setIsBufferingRef.current(false);
              setIsLoadingRef.current(false);
            }
          },
          onError: (e) => {
            console.warn('[YT] ERROR code:', e.data,
              '(100=not found, 101/150=embed restricted, 2=invalid param, 5=HTML5 error)');
            setIsBufferingRef.current(false);
            setIsLoadingRef.current(false);

            let msg = 'Unable to play this track.';
            if (e.data === 101 || e.data === 150) {
              msg = 'This track has YouTube embed restrictions.';
            } else if (e.data === 100) {
              msg = 'This track was not found or has been removed.';
            } else if (e.data === 2) {
              msg = 'Invalid YouTube video ID.';
            }
            console.warn('[YT] ERROR — showing inline message, not auto-advancing:', msg);
            if (typeof setErrorMessageRef.current === 'function') {
              setErrorMessageRef.current(msg);
            }
          },
        },
      });
    } catch (err) {
      isInitializingRef.current = false;
      console.warn('[YT] YT.Player() constructor error:', err);
    }
  }, [elementId, playerRef, setPlayerReady]);

  initPlayerRef.current = initPlayer;

  useEffect(() => {
    return () => {
      stopTimePolling();
    };
  }, [stopTimePolling]);

  const videoId = currentTrack?.youtubeId || currentTrack?.id || null;

  useEffect(() => {
    if (!videoId) return;

    const previousId = lastLoadedIdRef.current;

    if (!playerInstanceRef.current) {
      if (!isInitializingRef.current) {
        lastLoadedIdRef.current = videoId;
        console.log('[YT] TRACK requested, player not ready yet, scheduling init, videoId:', videoId);
        runWhenYTReady(() => {
          setTimeout(() => {
            initPlayerRef.current?.();
          }, 50);
        });
      }
      return;
    }

    if (previousId === videoId) {
      return;
    }

    lastLoadedIdRef.current = videoId;
    console.log('[YT] TRACK CHANGE → loadVideoById:', videoId, '(was:', previousId, ')');

    try {
      if (typeof playerInstanceRef.current.loadVideoById === 'function') {
        playerInstanceRef.current.loadVideoById(videoId, 0);
      }
    } catch (e) {
      console.warn('[YT] loadVideoById error:', e);
    }
  }, [videoId]);

  useEffect(() => {
    const p = playerInstanceRef.current;
    if (!p) return;
    try {
      const state = p.getPlayerState?.();
      const YTState = window.YT?.PlayerState;
      if (isPlaying) {
        if (state !== YTState?.PLAYING && state !== YTState?.BUFFERING) {
          console.log('[YT] External play command → playVideo()');
          p.playVideo?.();
          startTimePolling();
        }
      } else {
        if (state === YTState?.PLAYING || state === YTState?.BUFFERING) {
          console.log('[YT] External pause command → pauseVideo()');
          p.pauseVideo?.();
          stopTimePolling();
        }
      }
    } catch (e) {}
  }, [isPlaying, startTimePolling, stopTimePolling]);

  useEffect(() => {
    const p = playerInstanceRef.current;
    if (!p?.setVolume) return;
    try {
      p.setVolume(volume);
      if (isMuted) {
        p.mute();
      } else {
        p.unMute();
      }
    } catch (e) {}
  }, [volume, isMuted]);

  return { player: playerInstanceRef.current };
}

export default useYouTubePlayer;
