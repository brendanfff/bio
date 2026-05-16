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
    <div className={`enter-overlay${leaving ? ' leaving' : ''}`} onClick={handleClick}>
      <span>click to enter</span>
    </div>
  );
}
