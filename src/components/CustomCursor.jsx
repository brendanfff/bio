import { useEffect, useRef } from 'react';

const TRAIL_LENGTH = 12;

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trailRef.current.push({ ...posRef.current, alpha: 1 });
      if (trailRef.current.length > TRAIL_LENGTH) {
        trailRef.current.shift();
      }

      for (let i = 0; i < trailRef.current.length; i++) {
        const p = trailRef.current[i];
        p.alpha -= 0.016 * (TRAIL_LENGTH / 4);
        if (p.alpha <= 0) continue;

        const size = 4 + (i / trailRef.current.length) * 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha * 0.5})`;
        ctx.fill();
      }

      const { x, y } = posRef.current;
      ctx.beginPath();
      ctx.arc(x, y, 14, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
