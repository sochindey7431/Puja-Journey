/**
 * MusicPlayer — updated to use the global YouTube music system.
 *
 * The old inline-iframe approach is replaced with FestivalMusicButton,
 * which connects each festival section to the floating global player.
 *
 * Props kept compatible with existing FestivalSection usage:
 *   music        — festival.music object (used for festivalId extraction)
 *   festivalName — English name
 *   festivalId   — festival ID (new, passed from FestivalSection)
 *   festivalNameBn — Bengali name (new, optional)
 */
import FestivalMusicButton from '../music/FestivalMusicButton.jsx';

export default function MusicPlayer({ music, festivalName, festivalId, festivalNameBn }) {
  // Derive festival ID from the music object or prop
  const id = festivalId || music?.festivalId || null;
  if (!id) return null;

  return (
    <FestivalMusicButton
      festivalId={id}
      festivalNameEn={festivalName}
      festivalNameBn={festivalNameBn}
    />
  );
}
