import { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react';
import { getPlaylistForFestival, hasPlaylistForFestival } from '../data/festivalPlaylists.js';

const MusicContext = createContext(null);
const MusicTimeContext = createContext({ currentTime: 0, duration: 0 });

export function MusicProvider({ children }) {
  const [currentPlaylistKey, setCurrentPlaylistKey] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [exploringFestivalId, setExploringFestivalId] = useState(null);
  const [welcomeShown, setWelcomeShown] = useState(false);

  const playerRef = useRef(null); // Reference to YT.Player instance

  // Derive playlist from the current key
  const currentPlaylist = useMemo(() => {
    return currentPlaylistKey ? getPlaylistForFestival(currentPlaylistKey) : null;
  }, [currentPlaylistKey]);

  const currentTrack = useMemo(() => {
    return currentPlaylist?.tracks?.[currentTrackIndex] || currentPlaylist?.tracks?.[0] || null;
  }, [currentPlaylist, currentTrackIndex]);

  // Load a festival playlist & immediately play first track.
  // NOTE: loadVideoById is called directly here for the initial festival load only.
  // For track changes (next/prev/select), useMusicPlayer.js's useEffect([videoId])
  // is the single source of truth for loadVideoById to avoid double-call race conditions.
  const loadFestivalMusic = useCallback((festivalId, autoPlay = true) => {
    if (!festivalId) return;
    const playlist = getPlaylistForFestival(festivalId);
    if (!playlist || !playlist.tracks || playlist.tracks.length === 0) {
      return;
    }

    setErrorMessage(null);
    setIsPlayerOpen(true);
    setIsVideoExpanded(false); // Never start in expanded mode
    setIsPlayerMinimized(false);

    // If same festival playlist is already loaded, toggle/resume
    if (currentPlaylistKey === festivalId) {
      if (autoPlay) {
        if (playerRef.current?.playVideo) {
          try { playerRef.current.playVideo(); } catch (e) {}
        }
        setIsPlaying(true);
      }
      return;
    }

    const firstTrackObj = playlist.tracks[0];
    const targetId = firstTrackObj?.youtubeId || firstTrackObj?.id;

    // 1. Synchronously execute the player command FIRST before any React state dispatches
    if (autoPlay && playerRef.current && targetId) {
      playerRef.current._lastLoadedId = targetId;
      try {
        if (typeof playerRef.current.loadVideoById === 'function') {
          playerRef.current.loadVideoById(targetId, 0);
          playerRef.current.playVideo?.();
        }
      } catch (e) {}
    }

    // 2. Then update React state
    console.log('[YT] LOAD FESTIVAL PLAYLIST:', festivalId);
    setErrorMessage(null);
    setIsPlayerOpen(true);
    setIsVideoExpanded(false); // Never start in expanded mode
    setIsPlayerMinimized(false);
    setCurrentPlaylistKey(festivalId);
    setCurrentTrackIndex(0);
    setCurrentTime(0);
    setDuration(0);
    if (autoPlay) {
      setIsLoading(true);
    }
  }, [currentPlaylistKey]);

  // Alias for loadPlaylist
  const loadPlaylist = loadFestivalMusic;

  const play = useCallback(() => {
    // 1. Synchronously execute the player command FIRST before any state dispatchers
    if (playerRef.current?.playVideo) {
      try {
        playerRef.current.playVideo();
      } catch (e) {}
    }
    // 2. Then update React state — set loading until real PLAYING state arrives
    setErrorMessage(null);
    setIsLoading(true);
  }, []);

  const pause = useCallback(() => {
    if (playerRef.current?.pauseVideo) {
      try { playerRef.current.pauseVideo(); } catch (e) {}
    }
    setIsPlaying(false);
    setIsLoading(false);
    setIsBuffering(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Next Track — synchronously passes user gesture to playerRef and updates React state
  const nextTrack = useCallback(() => {
    if (!currentPlaylist?.tracks?.length) return;
    const nextIdx = (currentTrackIndex + 1) % currentPlaylist.tracks.length;
    const nextTrackObj = currentPlaylist.tracks[nextIdx];
    const targetId = nextTrackObj?.youtubeId || nextTrackObj?.id;

    // 1. Synchronously execute player command FIRST
    if (playerRef.current && targetId) {
      playerRef.current._lastLoadedId = targetId;
      try {
        if (typeof playerRef.current.loadVideoById === 'function') {
          if (isPlaying) {
            playerRef.current.loadVideoById(targetId, 0);
            playerRef.current.playVideo?.();
          } else {
            playerRef.current.cueVideoById(targetId, 0);
          }
        }
      } catch (e) {}
    }

    // 2. Then update React state
    setErrorMessage(null);
    setCurrentTime(0);
    setCurrentTrackIndex(nextIdx);
    if (isPlaying) {
      setIsLoading(true);
    }
  }, [currentPlaylist, currentTrackIndex, isPlaying]);

  // Previous Track — synchronously passes user gesture to playerRef and updates React state
  const prevTrack = useCallback(() => {
    if (!currentPlaylist?.tracks?.length) return;
    const prevIdx = currentTrackIndex === 0 ? currentPlaylist.tracks.length - 1 : currentTrackIndex - 1;
    const prevTrackObj = currentPlaylist.tracks[prevIdx];
    const targetId = prevTrackObj?.youtubeId || prevTrackObj?.id;

    // 1. Synchronously execute player command FIRST
    if (playerRef.current && targetId) {
      playerRef.current._lastLoadedId = targetId;
      try {
        if (typeof playerRef.current.loadVideoById === 'function') {
          if (isPlaying) {
            playerRef.current.loadVideoById(targetId, 0);
            playerRef.current.playVideo?.();
          } else {
            playerRef.current.cueVideoById(targetId, 0);
          }
        }
      } catch (e) {}
    }

    // 2. Then update React state
    setErrorMessage(null);
    setCurrentTime(0);
    setCurrentTrackIndex(prevIdx);
    if (isPlaying) {
      setIsLoading(true);
    }
  }, [currentPlaylist, currentTrackIndex, isPlaying]);

  // Select Track — synchronously passes user gesture to playerRef and updates React state
  const selectTrack = useCallback((index) => {
    if (typeof index !== 'number' || index < 0 || !currentPlaylist?.tracks?.[index]) return;
    const trackObj = currentPlaylist.tracks[index];
    const targetId = trackObj?.youtubeId || trackObj?.id;

    // 1. Synchronously execute player command FIRST
    if (playerRef.current && targetId) {
      playerRef.current._lastLoadedId = targetId;
      try {
        if (typeof playerRef.current.loadVideoById === 'function') {
          playerRef.current.loadVideoById(targetId, 0);
          playerRef.current.playVideo?.();
        }
      } catch (e) {}
    }

    // 2. Then update React state
    setErrorMessage(null);
    setCurrentTime(0);
    setCurrentTrackIndex(index);
    setIsLoading(true);
  }, [currentPlaylist]);

  // Seek - ONLY calls player.seekTo(seconds, true), NEVER touches isVideoExpanded or reloads
  const seek = useCallback((seconds) => {
    if (typeof seconds !== 'number' || isNaN(seconds) || !isFinite(seconds) || seconds < 0) return;
    console.log('[YT] SEEK to second:', seconds);
    setCurrentTime(seconds);
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      try {
        playerRef.current.seekTo(seconds, true);
      } catch (e) {
        console.warn('[YT] seekTo error:', e);
      }
    }
  }, []);

  const handleVolumeChange = useCallback((newVol) => {
    const clamped = Math.max(0, Math.min(100, newVol));
    setVolume(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
    if (playerRef.current?.setVolume) {
      try {
        playerRef.current.setVolume(clamped);
        if (isMuted && clamped > 0) playerRef.current.unMute?.();
      } catch (e) {}
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(m => {
      const next = !m;
      if (playerRef.current) {
        try {
          if (next) {
            playerRef.current.mute?.();
          } else {
            playerRef.current.unMute?.();
            playerRef.current.setVolume?.(volume);
          }
        } catch (e) {}
      }
      return next;
    });
  }, [volume]);

  const closePlayer = useCallback(() => {
    console.log('[YT] CLOSE player');
    setIsPlayerOpen(false);
    setIsPlaylistOpen(false);
    setIsVideoExpanded(false);
    pause();
  }, [pause]);

  const togglePlaylist = useCallback(() => {
    setIsPlaylistOpen(o => !o);
  }, []);

  const toggleVideo = useCallback(() => {
    setIsVideoExpanded(o => {
      const next = !o;
      console.log(next ? '[YT] EXPANDED' : '[YT] MINIMIZED');
      return next;
    });
  }, []);

  const toggleMinimize = useCallback(() => {
    setIsPlayerMinimized(o => !o);
  }, []);

  const dismissError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  const timeValue = useMemo(() => ({
    currentTime,
    duration,
  }), [currentTime, duration]);

  const contextValue = useMemo(() => ({
    currentPlaylistKey,
    currentPlaylist,
    currentTrackIndex,
    currentTrack,
    isPlaying,
    setIsPlaying,
    isBuffering,
    setIsBuffering,
    isLoading,
    setIsLoading,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    isPlayerOpen,
    setIsPlayerOpen,
    isPlaylistOpen,
    setIsPlaylistOpen,
    isVideoExpanded,
    setIsVideoExpanded,
    isPlayerMinimized,
    setIsPlayerMinimized,
    playerReady,
    setPlayerReady,
    volume,
    setVolume,
    isMuted,
    setIsMuted,
    errorMessage,
    setErrorMessage,
    dismissError,
    handleVolumeChange,
    toggleMute,
    exploringFestivalId,
    setExploringFestivalId,
    welcomeShown,
    setWelcomeShown,
    playerRef,
    loadFestivalMusic,
    loadPlaylist,
    play,
    pause,
    togglePlay,
    nextTrack,
    prevTrack,
    selectTrack,
    seek,
    closePlayer,
    togglePlaylist,
    toggleVideo,
    toggleMinimize,
  }), [
    currentPlaylistKey,
    currentPlaylist,
    currentTrackIndex,
    currentTrack,
    isPlaying,
    isBuffering,
    isLoading,
    currentTime,
    duration,
    isPlayerOpen,
    isPlaylistOpen,
    isVideoExpanded,
    isPlayerMinimized,
    playerReady,
    volume,
    isMuted,
    errorMessage,
    exploringFestivalId,
    welcomeShown,
    loadFestivalMusic,
    loadPlaylist,
    play,
    pause,
    togglePlay,
    nextTrack,
    prevTrack,
    selectTrack,
    seek,
    closePlayer,
    togglePlaylist,
    toggleVideo,
    toggleMinimize,
    dismissError,
    handleVolumeChange,
    toggleMute,
  ]);

  return (
    <MusicContext.Provider value={contextValue}>
      <MusicTimeContext.Provider value={timeValue}>
        {children}
      </MusicTimeContext.Provider>
    </MusicContext.Provider>
  );
}

export function useMusicContext() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusicContext must be used within MusicProvider');
  return ctx;
}

export function useMusicTime() {
  return useContext(MusicTimeContext);
}

