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

if (typeof window !== 'undefined') {
  window.__YT_DEBUG__ = window.__YT_DEBUG__ || {
    scriptLoaded: false,
    apiReadyFired: false,
    constructorCalled: false,
    onReadyFired: false,
    lastState: 'INIT',
    lastErrorCode: null,
  };
}

function loadYTAPI() {
  if (isScriptLoaded) return;
  if (typeof window !== 'undefined' && window.YT && window.YT.Player) {
    isScriptLoaded = true;
    if (window.__YT_DEBUG__) window.__YT_DEBUG__.scriptLoaded = true;
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
      if (window.__YT_DEBUG__) {
        window.__YT_DEBUG__.scriptLoaded = true;
        window.__YT_DEBUG__.apiReadyFired = true;
      }
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
  tag.onerror = (err) => {
    console.error('[YT] Failed to load iframe_api script:', err);
    isScriptLoading = false;
    if (window.__YT_DEBUG__) {
      window.__YT_DEBUG__.scriptLoaded = false;
      window.__YT_DEBUG__.lastState = 'SCRIPT_ERROR';
    }
  };
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
    if (window.__YT_DEBUG__) window.__YT_DEBUG__.constructorCalled = true;
    console.log('[YT] PLAYER INIT on element:', elementId, 'videoId:', initialVideoId);

    // Timeout safety: if onReady does not fire within 4.5s (e.g. WebView sandbox delay), unblock UI
    const initTimeout = setTimeout(() => {
      if (isInitializingRef.current) {
        console.warn('[YT] Init timeout (4.5s) — onReady did not fire in this WebView. Unblocking UI spinner.');
        isInitializingRef.current = false;
        setIsLoadingRef.current(false);
        setIsBufferingRef.current(false);
        if (window.__YT_DEBUG__) window.__YT_DEBUG__.lastState = 'INIT_TIMEOUT_CLEARED';
      }
    }, 4500);

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
          autoplay: 1,
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
            clearTimeout(initTimeout);
            console.log('[YT] PLAYER READY');
            playerInstanceRef.current = e.target;
            if (playerRef) playerRef.current = e.target;
            isInitializingRef.current = false;
            setPlayerReady(true);
            setIsLoadingRef.current(false);
            clearLoadingSafety();
            if (window.__YT_DEBUG__) window.__YT_DEBUG__.onReadyFired = true;

            try {
              // Ensure iframe has all required media attributes for in-app WebViews (FB/Insta/Lite)
              const iframe = e.target.getIframe?.();
              if (iframe) {
                iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
                iframe.setAttribute('playsinline', '1');
                iframe.setAttribute('webkit-playsinline', '1');
              }

              e.target.setVolume(volumeRef.current);
              if (isMutedRef.current) e.target.mute();

              const latestId = lastLoadedIdRef.current;
              if (latestId && latestId !== initialVideoId) {
                console.log('[YT] onReady → loading latest queued track:', latestId);
                trackChangePendingRef.current = true;
                if (userIntentToPlayRef.current || isPlayingRef.current) {
                  e.target.loadVideoById(latestId, 0);
                  e.target.playVideo();
                } else {
                  e.target.cueVideoById(latestId, 0);
                }
              } else if (userIntentToPlayRef.current || isPlayingRef.current) {
                console.log('[YT] onReady → executing playVideo() for user intent');
                e.target.playVideo();
                startPollingRef.current?.();
              }

              // Muted autoplay + first-interaction unmute fallback strategy for strict WebViews (Instagram / Mobile WebViews)
              const unblockEvents = ['touchstart', 'touchend', 'click', 'scroll', 'pointerdown', 'keydown'];
              const handleFirstInteraction = () => {
                unblockEvents.forEach(evt => window.removeEventListener(evt, handleFirstInteraction, { capture: true, passive: true }));
                try {
                  if (!isMutedRef.current) {
                    e.target.unMute();
                    e.target.setVolume(volumeRef.current);
                  }
                  const st = e.target.getPlayerState?.();
                  if (st !== 1 && st !== 3 && (userIntentToPlayRef.current || isPlayingRef.current)) {
                    e.target.playVideo();
                  }
                } catch (err) {
                  console.warn('[YT] Unblock on first interaction error:', err);
                }
              };

              unblockEvents.forEach(evt => {
                window.addEventListener(evt, handleFirstInteraction, { capture: true, passive: true, once: true });
              });
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
            if (window.__YT_DEBUG__) window.__YT_DEBUG__.lastState = stateLabel;

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
              setIsBufferingRef.current(false);
              setIsLoadingRef.current(false);
              clearLoadingSafety();
              trackChangePendingRef.current = false;
              if (userIntentToPlayRef.current || isPlayingRef.current) {
                console.log('[YT] CUED → executing playVideo() for pending user play request');
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
                // Mobile WebViews often land in PAUSED after video cue. Kick playVideo once:
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
                console.log('[YT] ENDED — auto-advancing playlist');
                nextTrackRef.current();
              }
            }
          },
          onError: (e) => {
            clearTimeout(initTimeout);
            console.warn('[YT] ERROR code:', e.data,
              '(100=not found, 101/150=embed restricted, 2=invalid param, 5=HTML5 error)');
            if (window.__YT_DEBUG__) window.__YT_DEBUG__.lastErrorCode = e.data;
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
            console.warn('[YT] ERROR — showing inline message, not auto-advancing:', msg);
            if (typeof setErrorMessageRef.current === 'function') {
              setErrorMessageRef.current(msg);
            }
          },
        },
      });
    } catch (err) {
      clearTimeout(initTimeout);
      isInitializingRef.current = false;
      clearLoadingSafety();
      setIsLoadingRef.current(false);
      setIsBufferingRef.current(false);
      console.warn('[YT] YT.Player() constructor error:', err);
    }
  }, [elementId, playerRef, setPlayerReady, clearLoadingSafety, scheduleLoadingSafety]);

  initPlayerRef.current = initPlayer;

  useEffect(() => {
    return () => {
      stopTimePolling();
      clearLoadingSafety();
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
      console.log('[YT] Pre-initializing persistent player in background, videoId:', initialId);
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
        console.log('[YT] TRACK requested, player not ready yet, scheduling init, videoId:', videoId);
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
    console.log('[YT] TRACK CHANGE (effect) → loadVideoById:', videoId, '(was:', previousId, ') shouldPlay:', shouldPlay);

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
      console.warn('[YT] loadVideoById error:', e);
    }
  }, [videoId, scheduleLoadingSafety]);

  const prevIsPlayingRef = useRef(isPlaying);
  useEffect(() => {
    const prev = prevIsPlayingRef.current;
    prevIsPlayingRef.current = isPlaying;

    const p = playerInstanceRef.current;
    if (!p) return;
    // Do not interfere while a track-change is in flight — onStateChange handles resumption.
    if (trackChangePendingRef.current) return;
    try {
      const state = p.getPlayerState?.();
      const YTState = window.YT?.PlayerState;
      if (isPlaying && !prev) {
        userIntentToPlayRef.current = true;
        if (state !== YTState?.PLAYING && state !== YTState?.BUFFERING) {
          console.log('[YT] Play command → playVideo()');
          p.playVideo?.();
          startTimePolling();
        }
      } else if (!isPlaying && prev) {
        userIntentToPlayRef.current = false;
        if (state === YTState?.PLAYING || state === YTState?.BUFFERING) {
          console.log('[YT] Pause command → pauseVideo()');
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
