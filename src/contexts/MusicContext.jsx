import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { festivalPlaylists, getPlaylistForFestival } from '../data/festivalPlaylists.js';

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const [currentPlaylistKey, setCurrentPlaylistKey] = useState('mahalaya');
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

  const currentPlaylist = currentPlaylistKey
    ? (festivalPlaylists[currentPlaylistKey] || getPlaylistForFestival(currentPlaylistKey) || festivalPlaylists.mahalaya)
    : festivalPlaylists.mahalaya;

  const currentTrack = currentPlaylist?.tracks?.[currentTrackIndex] || currentPlaylist?.tracks?.[0] || null;

  // Load a festival playlist & immediately play first track
  const loadFestivalMusic = useCallback((festivalId, autoPlay = true) => {
    const playlist = getPlaylistForFestival(festivalId) || festivalPlaylists[festivalId];
    if (!playlist) return;

    const key = festivalPlaylists[festivalId]
      ? festivalId
      : Object.keys(festivalPlaylists).find(k => festivalId?.startsWith(k)) || festivalId;

    setErrorMessage(null);
    setIsPlayerOpen(true);
    setIsPlayerMinimized(false);

    if (currentPlaylistKey === key) {
      if (autoPlay) {
        setIsPlaying(true);
        if (playerRef.current?.playVideo) {
          try { playerRef.current.playVideo(); } catch (e) {}
        }
      }
      return;
    }

    setCurrentPlaylistKey(key);
    setCurrentTrackIndex(0);
    setCurrentTime(0);
    setDuration(0);
    if (autoPlay) {
      setIsPlaying(true);
      setIsLoading(true);
    }
  }, [currentPlaylistKey]);

  // Alias for loadPlaylist
  const loadPlaylist = loadFestivalMusic;

  const play = useCallback(() => {
    setErrorMessage(null);
    setIsPlaying(true);
    if (playerRef.current?.playVideo) {
      try { playerRef.current.playVideo(); } catch (e) {}
    }
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
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

  const nextTrack = useCallback(() => {
    if (!currentPlaylist?.tracks?.length) return;
    setErrorMessage(null);
    setCurrentTime(0);
    setCurrentTrackIndex(i => (i + 1) % currentPlaylist.tracks.length);
    setIsPlaying(true);
    setIsLoading(true);
  }, [currentPlaylist]);

  const prevTrack = useCallback(() => {
    if (!currentPlaylist?.tracks?.length) return;
    setErrorMessage(null);
    setCurrentTime(0);
    setCurrentTrackIndex(i => (i === 0 ? currentPlaylist.tracks.length - 1 : i - 1));
    setIsPlaying(true);
    setIsLoading(true);
  }, [currentPlaylist]);

  const selectTrack = useCallback((index) => {
    setErrorMessage(null);
    setCurrentTime(0);
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setIsLoading(true);
  }, []);

  const seek = useCallback((seconds) => {
    setCurrentTime(seconds);
    if (playerRef.current?.seekTo) {
      try {
        playerRef.current.seekTo(seconds, true);
      } catch (e) {}
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
    setIsPlayerOpen(false);
    setIsPlaylistOpen(false);
    setIsVideoExpanded(false);
    pause();
  }, [pause]);

  const togglePlaylist = useCallback(() => {
    setIsPlaylistOpen(o => !o);
  }, []);

  const toggleVideo = useCallback(() => {
    setIsVideoExpanded(o => !o);
  }, []);

  const toggleMinimize = useCallback(() => {
    setIsPlayerMinimized(o => !o);
  }, []);

  const dismissError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  return (
    <MusicContext.Provider value={{
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
    }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicContext() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusicContext must be used within MusicProvider');
  return ctx;
}

