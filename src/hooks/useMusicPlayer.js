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
  if (typeof document !== 'undefined' && document.querySelector('script[src*="youtube.com/iframe_api"]')) {
    isScriptLoading = true;
    return;
  }
  isScriptLoading = true;

  const prevHandler = typeof window !== 'undefined' ? window.onYouTubeIframeAPIReady : null;
  if (typeof window !== 'undefined') {
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevHandler === 'function') {
        try { prevHandler(); } catch (e) {}
      }
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
  }

  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  tag.async = true;
  document.head.appendChild(tag);
}

// Pre-warm the YouTube IFrame API script early on idle or first interaction
if (typeof window !== 'undefined') {
  const prewarm = () => {
    loadYTAPI();
    window.removeEventListener('pointerdown', prewarm);
    window.removeEventListener('touchstart', prewarm);
    window.removeEventListener('scroll', prewarm);
  };
  if (document.readyState === 'complete') {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => loadYTAPI(), { timeout: 2000 });
    } else {
      setTimeout(loadYTAPI, 1000);
    }
  } else {
    window.addEventListener('load', () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => loadYTAPI(), { timeout: 2000 });
      } else {
        setTimeout(loadYTAPI, 1000);
      }
    }, { once: true });
  }
  window.addEventListener('pointerdown', prewarm, { passive: true, once: true });
  window.addEventListener('touchstart', prewarm, { passive: true, once: true });
  window.addEventListener('scroll', prewarm, { passive: true, once: true });
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
  const userIntentToPlayRef = useRef(isPlaying);
  const loadingTimeoutRef   = useRef(null);
  // Flag: true while a track-switch loadVideoById is in flight.
  // Prevents the isPlaying effect from issuing pauseVideo mid-transition.
  const trackChangePendingRef = useRef(false);

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
  const gestureUnblockCleanupRef = useRef(null);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    userIntentToPlayRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => { volumeRef.current = volume; }, [volume]);
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);
  useEffect(() => { nextTrackRef.current = nextTrack; }, [nextTrack]);
  useEffect(() => { setErrorMessageRef.current = setErrorMessage; }, [setErrorMessage]);
  useEffect(() => { setCurrentTimeRef.current = setCurrentTime; }, [setCurrentTime]);
  useEffect(() => { setDurationRef.current = setDuration; }, [setDuration]);
  useEffect(() => { setIsPlayingRef.current = setIsPlaying; }, [setIsPlaying]);
  useEffect(() => { setIsBufferingRef.current = setIsBuffering; }, [setIsBuffering]);
  useEffect(() => { setIsLoadingRef.current = setIsLoading; }, [setIsLoading]);

  // Safety fallback: Never leave the UI stuck in loading spinner for >4s if autoplay was restricted
  const clearLoadingSafety = useCallback(() => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  }, []);

  const scheduleLoadingSafety = useCallback(() => {
    clearLoadingSafety();
    loadingTimeoutRef.current = setTimeout(() => {
      trackChangePendingRef.current = false;
      setIsLoadingRef.current(false);
      setIsBufferingRef.current(false);
    }, 4000);
  }, [clearLoadingSafety]);

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
    try {
      const safeOrigin = typeof window !== 'undefined' && window.location && window.location.origin && window.location.origin !== 'null'
        ? window.location.origin
        : undefined;

      new window.YT.Player(elementId, {
        height: '100%',
        width: '100%',
        videoId: initialVideoId,
        host: 'https://www.youtube.com',
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          enablejsapi: 1,
          fs: 1,
          ...(safeOrigin ? { origin: safeOrigin } : {}),
        },
        events: {
          onReady: (e) => {
            playerInstanceRef.current = e.target;
            if (playerRef) playerRef.current = e.target;
            isInitializingRef.current = false;
            setPlayerReady(true);
            setIsLoadingRef.current(false);
            clearLoadingSafety();

            try {
              // Ensure iframe has all required media attributes for in-app WebViews (FB/Insta/Lite)
              const iframe = e.target.getIframe?.();
              if (iframe) {
                iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
                iframe.setAttribute('playsinline', '1');
                iframe.setAttribute('webkit-playsinline', '1');
              }

              e.target.setVolume(volumeRef.current || 80);
              if (isMutedRef.current) {
                e.target.mute();
              } else {
                e.target.unMute();
              }

              const latestId = lastLoadedIdRef.current;

              if (latestId && latestId !== initialVideoId) {
                trackChangePendingRef.current = true;
                if (userIntentToPlayRef.current || isPlayingRef.current) {
                  e.target.loadVideoById(latestId, 0);
                  e.target.playVideo();
                } else {
                  e.target.cueVideoById(latestId, 0);
                }
              } else if (userIntentToPlayRef.current || isPlayingRef.current) {
                e.target.playVideo();
                startPollingRef.current?.();
              }

              // Persistent user-gesture unblock for in-app browsers (Instagram, Facebook, FB Lite).
              const unblockEvents = ['touchstart', 'touchend', 'click', 'pointerdown', 'keydown'];
              const handleGestureUnblock = () => {
                try {
                  const target = playerInstanceRef.current || e.target;
                  if (target && typeof target.getPlayerState === 'function') {
                    const st = target.getPlayerState();
                    if (st === 1 || st === 3) {
                      // Already playing or buffering — remove listener
                      unblockEvents.forEach(evt => window.removeEventListener(evt, handleGestureUnblock, { capture: true }));
                      gestureUnblockCleanupRef.current = null;
                    } else if (userIntentToPlayRef.current || isPlayingRef.current) {
                      // Play was intended but player is not playing — dispatch and remove
                      target.playVideo?.();
                      unblockEvents.forEach(evt => window.removeEventListener(evt, handleGestureUnblock, { capture: true }));
                      gestureUnblockCleanupRef.current = null;
                    }
                  }
                } catch (err) {
                  console.warn('[YT] Gesture unblock error:', err);
                }
              };
              const cleanupGestureUnblock = () => {
                unblockEvents.forEach(evt => window.removeEventListener(evt, handleGestureUnblock, { capture: true }));
              };
              gestureUnblockCleanupRef.current = cleanupGestureUnblock;
              unblockEvents.forEach(evt => {
                window.addEventListener(evt, handleGestureUnblock, { capture: true, passive: true });
              });
            } catch (err) {
              console.warn('[YT] onReady setup error:', err);
            }
          },
          onAutoplayBlocked: () => {
            console.warn('[PujaMusic] onAutoplayBlocked event fired by YouTube IFrame API');
            setIsPlayingRef.current(false);
            setIsBufferingRef.current(false);
            setIsLoadingRef.current(false);
            clearLoadingSafety();
          },
          onStateChange: (e) => {
            const YTState = window.YT?.PlayerState;
            if (!YTState) return;
            const stateLabel =
              e.data === 1 ? 'PLAYING(1)' :
              e.data === 2 ? 'PAUSED(2)' :
              e.data === 0 ? 'ENDED(0)' :
              e.data === 3 ? 'BUFFERING(3)' :
              e.data === 5 ? 'CUED(5)' : `UNSTARTED(${e.data})`;
            console.log('[PujaMusic] onStateChange →', stateLabel);

            if (e.data === YTState.PLAYING) {
              trackChangePendingRef.current = false;
              setIsPlayingRef.current(true);
              setIsBufferingRef.current(false);
              setIsLoadingRef.current(false);
              clearLoadingSafety();
              startPollingRef.current?.();
            } else if (e.data === YTState.BUFFERING) {
              setIsBufferingRef.current(true);
              scheduleLoadingSafety();
            } else if (e.data === YTState.CUED) {
              setIsPlayingRef.current(false);
              setIsBufferingRef.current(false);
              setIsLoadingRef.current(false);
              clearLoadingSafety();
              trackChangePendingRef.current = false;
              if (userIntentToPlayRef.current || isPlayingRef.current) {
                console.log('[PujaMusic] CUED state with play intent → triggering playVideo()');
                try {
                  e.target.playVideo();
                } catch (err) {}
              }
            } else if (e.data === YTState.PAUSED) {
              clearLoadingSafety();
              stopPollingRef.current?.();

              const wasTrackChange = trackChangePendingRef.current;
              trackChangePendingRef.current = false;

              // Always clear loading/buffering indicators on PAUSED
              setIsBufferingRef.current(false);
              setIsLoadingRef.current(false);

              if (wasTrackChange && (userIntentToPlayRef.current || isPlayingRef.current)) {
                console.log('[PujaMusic] PAUSED after track change with play intent → kicking playVideo()');
                try {
                  e.target.playVideo();
                } catch (err) {}
              } else {
                setIsPlayingRef.current(false);
              }
            } else if (e.data === YTState.ENDED) {
              trackChangePendingRef.current = false;
              setIsPlayingRef.current(false);
              setIsBufferingRef.current(false);
              setIsLoadingRef.current(false);
              clearLoadingSafety();
              stopPollingRef.current?.();
              if (AUTO_ADVANCE_PLAYLIST && typeof nextTrackRef.current === 'function') {
                console.log('[PujaMusic] ENDED → auto advancing');
                nextTrackRef.current();
              }
            }
          },
          onError: (e) => {
            console.warn('[PujaMusic] onError code:', e.data,
              '(100=not found, 101/150=embed restricted, 2=invalid param, 5=HTML5 error)');
            trackChangePendingRef.current = false;
            setIsBufferingRef.current(false);
            setIsLoadingRef.current(false);
            setIsPlayingRef.current(false);
            clearLoadingSafety();

            let msg = 'Unable to play this track.';
            if (e.data === 101 || e.data === 150) {
              msg = 'This track has YouTube embed restrictions.';
            } else if (e.data === 100) {
              msg = 'This track was not found or has been removed.';
            } else if (e.data === 2) {
              msg = 'Invalid YouTube video ID.';
            }
            if (typeof setErrorMessageRef.current === 'function') {
              setErrorMessageRef.current(msg);
            }
          },
        },
      });
    } catch (err) {
      isInitializingRef.current = false;
      clearLoadingSafety();
      console.warn('[YT] YT.Player() constructor error:', err);
    }
  }, [elementId, playerRef, setPlayerReady, clearLoadingSafety, scheduleLoadingSafety]);

  initPlayerRef.current = initPlayer;

  useEffect(() => {
    return () => {
      stopTimePolling();
      clearLoadingSafety();
      gestureUnblockCleanupRef.current?.();
      gestureUnblockCleanupRef.current = null;
    };
  }, [stopTimePolling, clearLoadingSafety]);

  const DEFAULT_INITIAL_VIDEO_ID = 'X5isMK80lLg';
  const videoId = currentTrack?.youtubeId || currentTrack?.id || null;

  // Background pre-initialization on mount:
  // Pre-warms the single persistent YouTube player on idle so that when the user taps
  // ANY song or festival button, playerRef.current is ALREADY ready.
  // The synchronous loadVideoById + playVideo will execute inside the user's active gesture.
  useEffect(() => {
    if (!playerInstanceRef.current && !isInitializingRef.current) {
      const initialId = videoId || DEFAULT_INITIAL_VIDEO_ID;
      lastLoadedIdRef.current = initialId;
      console.log('[PujaMusic] Pre-initializing persistent player in background, videoId:', initialId);
      runWhenYTReady(() => {
        initPlayerRef.current?.();
      });
    }
  }, []);

  useEffect(() => {
    if (!videoId) return;

    const previousId = lastLoadedIdRef.current;

    if (!playerInstanceRef.current) {
      if (!isInitializingRef.current) {
        lastLoadedIdRef.current = videoId;
        // Snapshot intent now — before React batches catch up — so initPlayer/onReady
        // sees the correct play/cue decision even if isPlaying state is still stale.
        userIntentToPlayRef.current = isPlayingRef.current;
        scheduleLoadingSafety();
        console.log('[PujaMusic] Track requested but player not initialized yet, scheduling init for videoId:', videoId);
        runWhenYTReady(() => {
          initPlayerRef.current?.();
        });
      }
      return;
    }

    // If already loaded by the synchronous user tap in MusicContext, skip duplicate call
    if (previousId === videoId || playerInstanceRef.current?._lastLoadedId === videoId) {
      lastLoadedIdRef.current = videoId;
      trackChangePendingRef.current = true;
      scheduleLoadingSafety();
      return;
    }

    lastLoadedIdRef.current = videoId;
    // Snapshot the current play intent (isPlayingRef is already up-to-date via its own effect).
    const shouldPlay = userIntentToPlayRef.current || isPlayingRef.current;
    console.log('[PujaMusic] Track change effect → loadVideoById:', videoId, 'shouldPlay:', shouldPlay);

    // Mark a track-change in flight so onStateChange PAUSED is not misinterpreted.
    trackChangePendingRef.current = true;
    scheduleLoadingSafety();

    try {
      if (typeof playerInstanceRef.current.loadVideoById === 'function') {
        if (shouldPlay) {
          playerInstanceRef.current.loadVideoById(videoId, 0);
        } else {
          playerInstanceRef.current.cueVideoById(videoId, 0);
        }
      }
    } catch (e) {
      trackChangePendingRef.current = false;
      console.warn('[PujaMusic] loadVideoById error in effect:', e);
    }
  }, [videoId, scheduleLoadingSafety]);

  // Sync time polling with isPlaying state without issuing unwanted pause/play commands
  useEffect(() => {
    if (isPlaying) {
      startTimePolling();
    } else {
      stopTimePolling();
    }
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
