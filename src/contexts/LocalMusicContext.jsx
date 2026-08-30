/**
 * PUJA JOURNEY — LocalMusicContext
 *
 * Global context managing native HTMLAudioElement local music playback.
 * Fetches and plays MP3/M4A tracks from /public/music/<festivalId>/manifest.json.
 * 
 * Works seamlessly across all desktop and mobile browsers, including
 * Instagram In-App Browser and Facebook Lite, without cross-origin iframe
 * restrictions.
 */
import { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { getAssetUrl } from '../utils/assetUtils.js';
import { festivals } from '../data/festivals.js';
import { fileToTitle } from '../hooks/useLocalMusic.js';

const LocalMusicContext = createContext(null);

export function LocalMusicProvider({ children }) {
  const [currentFestivalId, setCurrentFestivalId] = useState(null);
  const [tracks, setTracks]                       = useState([]);
  const [trackIndex, setTrackIndex]               = useState(0);
  const [isPlaying, setIsPlaying]                 = useState(false);
  const [isLoading, setIsLoading]                 = useState(false);
  const [currentTime, setCurrentTime]             = useState(0);
  const [duration, setDuration]                   = useState(0);
  const [volume, setVolume]                       = useState(0.8);
  const [isMuted, setIsMuted]                     = useState(false);
  const [isRepeat, setIsRepeat]                   = useState(false);
  const [isShuffle, setIsShuffle]                 = useState(false);
  const [isPlayerOpen, setIsPlayerOpen]           = useState(false);
  const [trackError, setTrackError]               = useState(false);

  const audioRef = useRef(null);
  const tracksRef = useRef([]);
  const trackIndexRef = useRef(0);
  const isRepeatRef = useRef(false);
  const isShuffleRef = useRef(false);

  useEffect(() => { tracksRef.current = tracks; }, [tracks]);
  useEffect(() => { trackIndexRef.current = trackIndex; }, [trackIndex]);
  useEffect(() => { isRepeatRef.current = isRepeat; }, [isRepeat]);
  useEffect(() => { isShuffleRef.current = isShuffle; }, [isShuffle]);

  // Track switching function that loads and plays the audio at the specified index
  const playTrackAtIndex = useCallback((idx, trackList = tracksRef.current) => {
    if (!trackList || !trackList[idx]) return;
    const track = trackList[idx];
    setTrackIndex(idx);
    setTrackError(false);
    setCurrentTime(0);
    setDuration(0);
    setIsLoading(true);

    const audio = audioRef.current;
    if (audio) {
      const rawUrl = track.url || '';
      const cleanUrl = rawUrl.startsWith('/') ? rawUrl.slice(1) : rawUrl;
      audio.src = getAssetUrl(cleanUrl);
      audio.load();
      const p = audio.play();
      if (p && typeof p.catch === 'function') {
        p.catch((err) => {
          console.warn('[LocalMusic] play error:', err);
          setIsPlaying(false);
          setIsLoading(false);
        });
      }
    }
  }, []);

  const handleTrackEnd = useCallback(() => {
    if (isRepeatRef.current) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      return;
    }
    const currentTracks = tracksRef.current;
    if (!currentTracks.length) return;

    if (isShuffleRef.current && currentTracks.length > 1) {
      let next = Math.floor(Math.random() * currentTracks.length);
      if (next === trackIndexRef.current) next = (trackIndexRef.current + 1) % currentTracks.length;
      playTrackAtIndex(next, currentTracks);
      return;
    }

    if (trackIndexRef.current < currentTracks.length - 1) {
      playTrackAtIndex(trackIndexRef.current + 1, currentTracks);
    } else {
      setIsPlaying(false);
    }
  }, [playTrackAtIndex]);

  // Initialize singleton Audio element
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const audio = new Audio();
    audioRef.current = audio;
    audio.volume = 0.8;

    const onTimeUpdate     = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onEnded          = () => handleTrackEnd();
    const onError          = () => {
      setTrackError(true);
      setIsPlaying(false);
      setIsLoading(false);
    };
    const onPlay           = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };
    const onPause          = () => setIsPlaying(false);
    const onWaiting        = () => setIsLoading(true);
    const onPlaying        = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onPlaying);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onPlaying);
      audio.pause();
      audio.src = '';
    };
  }, [handleTrackEnd]);

  // Load festival playlist and start playback
  const loadFestivalMusic = useCallback(async (festivalId, autoPlay = true) => {
    if (!festivalId) return;
    setIsLoading(true);
    setTrackError(false);
    setCurrentFestivalId(festivalId);
    setIsPlayerOpen(true);

    try {
      const manifestUrl = getAssetUrl(`music/${festivalId}/manifest.json?t=${Date.now()}`);
      const res = await fetch(manifestUrl);
      if (!res.ok) throw new Error('Manifest not found');
      const data = await res.json();
      const loadedTracks = Array.isArray(data.tracks) ? data.tracks : [];

      setTracks(loadedTracks);
      tracksRef.current = loadedTracks;
      setTrackIndex(0);
      trackIndexRef.current = 0;
      setCurrentTime(0);
      setDuration(0);

      if (loadedTracks.length > 0) {
        const firstTrack = loadedTracks[0];
        const audio = audioRef.current;
        if (audio) {
          const rawUrl = firstTrack.url || '';
          const cleanUrl = rawUrl.startsWith('/') ? rawUrl.slice(1) : rawUrl;
          audio.src = getAssetUrl(cleanUrl);
          audio.load();
          if (autoPlay) {
            const playPromise = audio.play();
            if (playPromise && typeof playPromise.catch === 'function') {
              playPromise.catch((err) => {
                console.warn('[LocalMusic] Autoplay blocked or deferred:', err);
                setIsPlaying(false);
                setIsLoading(false);
              });
            }
          }
        }
      } else {
        setIsLoading(false);
        setIsPlaying(false);
      }
    } catch (e) {
      console.warn('[LocalMusic] Error loading manifest for', festivalId, e);
      setTracks([]);
      tracksRef.current = [];
      setIsLoading(false);
      setIsPlaying(false);
    }
  }, []);

  const play = useCallback(() => {
    if (audioRef.current && tracksRef.current.length > 0) {
      const audio = audioRef.current;
      if (!audio.src || audio.src === '' || audio.src.endsWith('undefined')) {
        const track = tracksRef.current[trackIndexRef.current];
        if (track) {
          const rawUrl = track.url || '';
          const cleanUrl = rawUrl.startsWith('/') ? rawUrl.slice(1) : rawUrl;
          audio.src = getAssetUrl(cleanUrl);
          audio.load();
        }
      }
      const p = audio.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => setIsPlaying(false));
      }
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const nextTrack = useCallback(() => {
    const curTracks = tracksRef.current;
    if (!curTracks.length) return;
    const nextIdx = (trackIndexRef.current + 1) % curTracks.length;
    playTrackAtIndex(nextIdx, curTracks);
  }, [playTrackAtIndex]);

  const prevTrack = useCallback(() => {
    const curTracks = tracksRef.current;
    if (!curTracks.length) return;
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } else {
      const prevIdx = trackIndexRef.current === 0 ? curTracks.length - 1 : trackIndexRef.current - 1;
      playTrackAtIndex(prevIdx, curTracks);
    }
  }, [playTrackAtIndex]);

  const selectTrack = useCallback((idx) => {
    playTrackAtIndex(idx);
  }, [playTrackAtIndex]);

  const seek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const changeVolume = useCallback((v) => {
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
      if (v > 0 && isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((m) => {
      const next = !m;
      if (audioRef.current) audioRef.current.muted = next;
      return next;
    });
  }, []);

  const toggleRepeat  = useCallback(() => setIsRepeat(r => !r), []);
  const toggleShuffle = useCallback(() => setIsShuffle(s => !s), []);

  const dismiss = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setIsPlayerOpen(false);
  }, []);

  // Festival metadata lookup
  const activeFestival = festivals.find((f) => f.id === currentFestivalId) || null;
  const festivalName   = activeFestival ? activeFestival.nameEn : '';
  const festivalNameBn = activeFestival ? activeFestival.nameBn : '';
  const festivalEmoji  = activeFestival ? activeFestival.emoji : '🎵';
  const accentColor    = activeFestival?.theme?.accent || '#d4a017';
  const festivalImage  = activeFestival?.image || null;

  const currentTrack = tracks[trackIndex] || null;

  const value = {
    currentFestivalId,
    currentTrack,
    tracks,
    trackIndex,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    volume,
    isMuted,
    isRepeat,
    isShuffle,
    isPlayerOpen,
    trackError,
    festivalName,
    festivalNameBn,
    festivalEmoji,
    accentColor,
    festivalImage,
    loadFestivalMusic,
    loadPlaylist: loadFestivalMusic,
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
    dismiss,
    setIsPlayerOpen,
  };

  return (
    <LocalMusicContext.Provider value={value}>
      {children}
    </LocalMusicContext.Provider>
  );
}

export function useLocalMusicContext() {
  const ctx = useContext(LocalMusicContext);
  if (!ctx) throw new Error('useLocalMusicContext must be inside LocalMusicProvider');
  return ctx;
}
