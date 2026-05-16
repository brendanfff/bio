import { useState } from 'react';

export default function EnterOverlay({ onEnter }) {
  const [leaving, setLeaving] = useState(false);

  const handleClick = () => {
    setLeaving(true);
    setTimeout(() => {
      onEnter();
    }, 400);
  };

  return (
    <div
      className={`enter-overlay${leaving ? ' leaving' : ''}`}
      onClick={handleClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10, 10, 15, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        cursor: 'default',
        transition: 'opacity 0.4s ease',
      }}
    >
      <span>click to enter</span>
    </div>
  );
}
