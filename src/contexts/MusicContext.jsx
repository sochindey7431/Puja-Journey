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
        setIsPlaying(true);
        if (playerRef.current?.playVideo) {
          try { playerRef.current.playVideo(); } catch (e) {}
        }
      }
      return;
    }

    // Load new festival playlist - reset track index
    // State update triggers useMusicPlayer's useEffect([videoId]) which will call loadVideoById.
    console.log('[YT] LOAD FESTIVAL PLAYLIST:', festivalId);
    setCurrentPlaylistKey(festivalId);
    setCurrentTrackIndex(0);
    setCurrentTime(0);
    setDuration(0);
    if (autoPlay) {
      setIsPlaying(true);
      setIsLoading(true);
      const firstTrackObj = playlist.tracks[0];
      const targetId = firstTrackObj?.youtubeId || firstTrackObj?.id;
      if (playerRef.current && targetId) {
        playerRef.current._lastLoadedId = targetId;
        try {
          if (typeof playerRef.current.loadVideoById === 'function') {
            playerRef.current.loadVideoById(targetId, 0);
            playerRef.current.playVideo?.();
          }
        } catch (e) {}
      }
    }
  }, [currentPlaylistKey]);

  // Alias for loadPlaylist
  const loadPlaylist = loadFestivalMusic;

  const play = useCallback(() => {
    setErrorMessage(null);
    setIsLoading(true);
    setIsPlaying(true);
    if (playerRef.current?.playVideo) {
      try {
        playerRef.current.playVideo();
      } catch (e) {
        setIsLoading(false);
        setIsPlaying(false);
      }
    }
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
    setIsLoading(false);
    setIsBuffering(false);
    if (playerRef.current?.pauseVideo) {
      try { playerRef.current.pauseVideo(); } catch (e) {}
    }
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
    setErrorMessage(null);
    setCurrentTime(0);
    const nextIdx = (currentTrackIndex + 1) % currentPlaylist.tracks.length;
    setCurrentTrackIndex(nextIdx);

    const nextTrackObj = currentPlaylist.tracks[nextIdx];
    const targetId = nextTrackObj?.youtubeId || nextTrackObj?.id;

    if (isPlaying) {
      setIsLoading(true);
      if (playerRef.current && targetId) {
        playerRef.current._lastLoadedId = targetId;
        try {
          if (typeof playerRef.current.loadVideoById === 'function') {
            playerRef.current.loadVideoById(targetId, 0);
            playerRef.current.playVideo?.();
          }
        } catch (e) {}
      }
    } else {
      // Not currently playing — cue the track without starting playback,
      // EXCEPT when userIntentToPlayRef is true (autoplay was blocked in-app browser).
      // In that case the videoId effect in useMusicPlayer will see isPlayingRef=false
      // but the gesture listener registered in onReady will kick playVideo on first touch.
      if (playerRef.current && targetId) {
        playerRef.current._lastLoadedId = targetId;
        try {
          if (typeof playerRef.current.cueVideoById === 'function') {
            playerRef.current.cueVideoById(targetId, 0);
          }
        } catch (e) {}
      }
    }
  }, [currentPlaylist, currentTrackIndex, isPlaying]);

  // Previous Track — synchronously passes user gesture to playerRef and updates React state
  const prevTrack = useCallback(() => {
    if (!currentPlaylist?.tracks?.length) return;
    setErrorMessage(null);
    setCurrentTime(0);
    const prevIdx = currentTrackIndex === 0 ? currentPlaylist.tracks.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIdx);

    const prevTrackObj = currentPlaylist.tracks[prevIdx];
    const targetId = prevTrackObj?.youtubeId || prevTrackObj?.id;

    if (isPlaying) {
      setIsLoading(true);
      if (playerRef.current && targetId) {
        playerRef.current._lastLoadedId = targetId;
        try {
          if (typeof playerRef.current.loadVideoById === 'function') {
            playerRef.current.loadVideoById(targetId, 0);
            playerRef.current.playVideo?.();
          }
        } catch (e) {}
      }
    } else {
      if (playerRef.current && targetId) {
        playerRef.current._lastLoadedId = targetId;
        try {
          if (typeof playerRef.current.cueVideoById === 'function') {
            playerRef.current.cueVideoById(targetId, 0);
          }
        } catch (e) {}
      }
    }
  }, [currentPlaylist, currentTrackIndex, isPlaying]);

  // Select Track — synchronously passes user gesture to playerRef and updates React state
  const selectTrack = useCallback((index) => {
    if (typeof index !== 'number' || index < 0 || !currentPlaylist?.tracks?.[index]) return;
    setErrorMessage(null);
    setCurrentTime(0);
    setCurrentTrackIndex(index);
    setIsLoading(true);
    setIsPlaying(true);

    const trackObj = currentPlaylist.tracks[index];
    const targetId = trackObj?.youtubeId || trackObj?.id;

    if (playerRef.current && targetId) {
      playerRef.current._lastLoadedId = targetId;
      try {
        if (typeof playerRef.current.loadVideoById === 'function') {
          playerRef.current.loadVideoById(targetId, 0);
          playerRef.current.playVideo?.();
        }
      } catch (e) {}
    }
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

