/**
 * PUJA JOURNEY — LocalMusicContext
 *
 * A global context that holds the currently active local-file
 * music playback state. The embedded FestivalMusicPlayer reports its
 * state here so the FloatingLocalPlayer can mirror it.
 *
 * This is separate from the existing YouTube MusicContext.
 */
import { createContext, useContext, useState, useRef, useCallback } from 'react';

const LocalMusicContext = createContext(null);

export function LocalMusicProvider({ children }) {
  const [currentTrack, setCurrentTrack]     = useState(null);
  const [isPlaying, setIsPlaying]           = useState(false);
  const [currentTime, setCurrentTime]       = useState(0);
  const [duration, setDuration]             = useState(0);
  const [festivalName, setFestivalName]     = useState('');
  const [festivalEmoji, setFestivalEmoji]   = useState('🎵');
  const [accentColor, setAccentColor]       = useState('#d4a017');
  const [festivalImage, setFestivalImage]   = useState(null);

  // Ref to callbacks registered by the active FestivalMusicPlayer
  const controlsRef = useRef({
    togglePlay: () => {},
    prevTrack: () => {},
    nextTrack: () => {},
    seek: () => {},
  });

  // Called by FestivalMusicPlayer to register itself
  const registerPlayer = useCallback((controls) => {
    controlsRef.current = controls;
  }, []);

  // Called by FestivalMusicPlayer to push playback state here
  const pushState = useCallback((state) => {
    setCurrentTrack(state.currentTrack ?? null);
    setIsPlaying(state.isPlaying ?? false);
    setCurrentTime(state.currentTime ?? 0);
    setDuration(state.duration ?? 0);
    if (state.festivalName)  setFestivalName(state.festivalName);
    if (state.festivalEmoji) setFestivalEmoji(state.festivalEmoji);
    if (state.accentColor)   setAccentColor(state.accentColor);
    setFestivalImage(state.festivalImage ?? null);
  }, []);

  const dismiss = useCallback(() => {
    controlsRef.current.togglePlay?.();
    setCurrentTrack(null);
    setIsPlaying(false);
  }, []);

  const value = {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    festivalName,
    festivalEmoji,
    accentColor,
    festivalImage,
    registerPlayer,
    pushState,
    dismiss,
    togglePlay: () => controlsRef.current.togglePlay?.(),
    prevTrack:  () => controlsRef.current.prevTrack?.(),
    nextTrack:  () => controlsRef.current.nextTrack?.(),
    seek:       (t) => controlsRef.current.seek?.(t),
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
