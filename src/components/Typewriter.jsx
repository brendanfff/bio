import { useState, useEffect } from 'react';

const phrases = [
  'gentoo user',
  'nixos user',
  'void user',
  'c developer',
  'c++ developer',
];

export default function Typewriter({ typingSpeed = 80, deletingSpeed = 40, pause = 2000 }) {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    if (phase === 'typing') {
      if (text.length < phrases[idx].length) {
        const t = setTimeout(() => setText(phrases[idx].slice(0, text.length + 1)), typingSpeed);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase('pausing'), pause);
      return () => clearTimeout(t);
    }

    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('deleting'), pause);
      return () => clearTimeout(t);
    }

    if (phase === 'deleting') {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed);
        return () => clearTimeout(t);
      }
      setIdx((prev) => (prev + 1) % phrases.length);
      setPhase('typing');
    }
  }, [text, phase, idx, typingSpeed, deletingSpeed, pause]);

  return (
    <span>
      {text}
      <span className="cursor-blink" />
    </span>
  );
}
