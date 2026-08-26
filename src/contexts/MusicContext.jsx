import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { festivalPlaylists, getPlaylistForFestival } from '../data/festivalPlaylists.js';

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const [currentPlaylistKey, setCurrentPlaylistKey] = useState('mahalaya');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [exploringFestivalId, setExploringFestivalId] = useState(null);
  const [welcomeShown, setWelcomeShown] = useState(false);

  const playerRef = useRef(null); // Reference to YT.Player instance or postMessage dispatcher

  const currentPlaylist = currentPlaylistKey
    ? (festivalPlaylists[currentPlaylistKey] || getPlaylistForFestival(currentPlaylistKey) || festivalPlaylists.mahalaya)
    : festivalPlaylists.mahalaya;

  const currentTrack = currentPlaylist?.tracks?.[currentTrackIndex] || currentPlaylist?.tracks?.[0] || null;

  // Load a festival playlist
  const loadPlaylist = useCallback((festivalId, autoPlay = true) => {
    const playlist = getPlaylistForFestival(festivalId) || festivalPlaylists[festivalId];
    if (!playlist) return;

    const key = festivalPlaylists[festivalId]
      ? festivalId
      : Object.keys(festivalPlaylists).find(k => festivalId?.startsWith(k)) || festivalId;

    if (currentPlaylistKey === key) {
      setIsPlayerOpen(true);
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
    setIsPlayerOpen(true);
    if (autoPlay) {
      setIsPlaying(true);
    }
  }, [currentPlaylistKey]);

  const play = useCallback(() => {
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
    setCurrentTrackIndex(i => (i + 1) % currentPlaylist.tracks.length);
    setIsPlaying(true);
  }, [currentPlaylist]);

  const prevTrack = useCallback(() => {
    if (!currentPlaylist?.tracks?.length) return;
    setCurrentTrackIndex(i => (i === 0 ? currentPlaylist.tracks.length - 1 : i - 1));
    setIsPlaying(true);
  }, [currentPlaylist]);

  const selectTrack = useCallback((index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  }, []);

  const handleVolumeChange = useCallback((newVol) => {
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
    if (playerRef.current?.setVolume) {
      try {
        playerRef.current.setVolume(newVol);
        if (isMuted) playerRef.current.unMute();
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

  return (
    <MusicContext.Provider value={{
      currentPlaylistKey,
      currentPlaylist,
      currentTrackIndex,
      currentTrack,
      isPlaying,
      setIsPlaying,
      isPlayerOpen,
      setIsPlayerOpen,
      isPlaylistOpen,
      setIsPlaylistOpen,
      isVideoExpanded,
      setIsVideoExpanded,
      playerReady,
      setPlayerReady,
      volume,
      setVolume,
      isMuted,
      setIsMuted,
      handleVolumeChange,
      toggleMute,
      exploringFestivalId,
      setExploringFestivalId,
      welcomeShown,
      setWelcomeShown,
      playerRef,
      loadPlaylist,
      play,
      pause,
      togglePlay,
      nextTrack,
      prevTrack,
      selectTrack,
      closePlayer,
      togglePlaylist,
      toggleVideo,
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
