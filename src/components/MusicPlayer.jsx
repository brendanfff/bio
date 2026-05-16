import { useState, useRef, useCallback, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

function cubicVolume(sliderVal) {
  return sliderVal * sliderVal * sliderVal;
}

export default function MusicPlayer({ entered }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef(null);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(import.meta.env.BASE_URL + 'Nun%204%20No%20Schmuck%20-%20Glokk40Spaz.mp3');
      audio.loop = true;
      audio.volume = cubicVolume(volume);
      audioRef.current = audio;
    }
    return audioRef.current;
  }, [volume]);

  useEffect(() => {
    if (!entered) return;
    const audio = getAudio();
    audio.play().catch(() => {});
    setPlaying(true);
  }, [entered, getAudio]);

  const toggle = () => {
    const audio = getAudio();
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch((e) => console.warn('Audio play failed:', e));
    }
    setPlaying(!playing);
  };

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = cubicVolume(val);
    }
  };

  return (
    <div className="music-player">
      <button className="music-btn" onClick={toggle} title={playing ? 'Pause' : 'Play'}>
        {playing ? <FaPause /> : <FaPlay />}
      </button>
      <span className="music-label">Nun 4 No Schmuck</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolume}
        className="volume-slider"
        title="Volume"
      />
    </div>
  );
}
