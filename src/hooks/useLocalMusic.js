/**
 * PUJA JOURNEY — useLocalMusic Hook
 *
 * Fetches the manifest.json for a given festival ID,
 * manages an HTMLAudioElement, and exposes all player controls.
 *
 * Usage:
 *   const player = useLocalMusic('durga-puja-ashtami');
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { getAssetUrl } from '../utils/assetUtils.js';

/** Convert a raw filename into a display title */
export function fileToTitle(filename) {
  if (!filename) return '';
  return String(filename)
    .replace(/\.[^.]+$/, '')                                                                    // strip extension
    .replace(/\s*\([^)]*(?:128k|320k|kbps|m4a|mp3|official|audio|video|lyrics)[^)]*\)/gi, '') // strip (M4A_128K) etc
    .replace(/\s*\[[^\]]*(?:128k|320k|kbps|m4a|mp3|official|audio|video|lyrics)[^\]]*\]/gi, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/\s*-\s*/g, ' - ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}

export function useLocalMusic(festivalId) {
  const [tracks, setTracks]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]   = useState(0);
  const [volume, setVolume]       = useState(0.8);
  const [isMuted, setIsMuted]     = useState(false);
  const [isRepeat, setIsRepeat]   = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [trackError, setTrackError] = useState(false);

  const audioRef = useRef(null);
  const shuffleOrderRef = useRef([]);

  // ── Fetch manifest ─────────────────────────────────────────────────
  useEffect(() => {
    if (!festivalId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    setTracks([]);
    setTrackIndex(0);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    fetch(getAssetUrl(`music/${festivalId}/manifest.json?t=${Date.now()}`))
      .then(r => {
        if (!r.ok) throw new Error('manifest_not_found');
        return r.json();
      })
      .then(data => {
        const t = Array.isArray(data.tracks) ? data.tracks : [];
        setTracks(t);
        shuffleOrderRef.current = [...Array(t.length).keys()];
        setLoading(false);
      })
      .catch(() => {
        setTracks([]);
        setLoading(false);
        setError('empty');
      });
  }, [festivalId]);

  // ── Create / update audio element ─────────────────────────────────
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    const onTimeUpdate  = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onEnded       = () => handleTrackEnd();
    const onError       = () => { setTrackError(true); setIsPlaying(false); };
    const onPlay        = () => setIsPlaying(true);
    const onPause       = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Sync audio src when track changes ─────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !tracks.length) return;
    const track = tracks[trackIndex];
    if (!track) return;

    setTrackError(false);
    setCurrentTime(0);
    setDuration(0);
    audio.src = track.url;
    audio.load();
    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Autoplay blocked — retry on first user interaction
          const unblockEvents = ['touchstart', 'touchend', 'click', 'scroll', 'pointerdown'];
          const onFirstInteraction = () => {
            unblockEvents.forEach(evt => window.removeEventListener(evt, onFirstInteraction, { capture: true, passive: true }));
            if (audioRef.current) {
              audioRef.current.play().catch(() => {});
            }
          };
          unblockEvents.forEach(evt => {
            window.addEventListener(evt, onFirstInteraction, { capture: true, passive: true, once: true });
          });
          setIsPlaying(false);
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex, tracks]);

  // ── Sync volume / mute ────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  // ── Cleanup on unmount ────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────
  function handleTrackEnd() {
    if (isRepeat) {
      audioRef.current.currentTime = 0;
      const p = audioRef.current.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
      return;
    }
    if (isShuffle) {
      const order = shuffleOrderRef.current;
      const next = order[Math.floor(Math.random() * order.length)];
      setTrackIndex(next);
    } else {
      if (trackIndex < tracks.length - 1) {
        setTrackIndex(i => i + 1);
      } else {
        // End of playlist — stop
        setIsPlaying(false);
      }
    }
  }

  // ── Controls ──────────────────────────────────────────────────────
  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !tracks.length) return;
    if (!audio.src || audio.src.endsWith('undefined')) {
      audio.src = tracks[trackIndex]?.url || '';
      audio.load();
    }
    const p = audio.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => setIsPlaying(false));
    }
  }, [tracks, trackIndex]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause(); else play();
  }, [isPlaying, play, pause]);

  const nextTrack = useCallback(() => {
    if (!tracks.length) return;
    setTrackIndex(i => (i + 1) % tracks.length);
    setIsPlaying(true);
  }, [tracks]);

  const prevTrack = useCallback(() => {
    if (!tracks.length) return;
    const audio = audioRef.current;
    // If more than 3 seconds in, restart; else go to prev
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
    } else {
      setTrackIndex(i => (i === 0 ? tracks.length - 1 : i - 1));
    }
    setIsPlaying(true);
  }, [tracks]);

  const selectTrack = useCallback((index) => {
    setTrackIndex(index);
    setIsPlaying(true);
  }, []);

  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const changeVolume = useCallback((v) => {
    setVolume(v);
    if (v > 0 && isMuted) setIsMuted(false);
  }, [isMuted]);

  const toggleMute  = useCallback(() => setIsMuted(m => !m), []);
  const toggleRepeat  = useCallback(() => setIsRepeat(r => !r), []);
  const toggleShuffle = useCallback(() => setIsShuffle(s => !s), []);

  const currentTrack = tracks[trackIndex] || null;

  return {
    tracks,
    loading,
    error,
    trackIndex,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isRepeat,
    isShuffle,
    trackError,
    play,
    pause,
    togglePlay,
    nextTrack,
    prevTrack,
    selectTrack,
    seek,
    changeVolume,
    toggleMute,
    toggleRepeat,
    toggleShuffle,
  };
}
