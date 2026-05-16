import { useMemo, useState, useEffect } from 'react';
import { cn } from '../lib/utils';

export default function BackgroundRippleEffect({ cellSize = 48 }) {
  const [clickedCell, setClickedCell] = useState(null);
  const [rippleKey, setRippleKey] = useState(0);
  const [dims, setDims] = useState(() => ({
    cols: Math.ceil(window.innerWidth / cellSize) + 4,
    rows: Math.ceil(window.innerHeight / cellSize) + 4,
  }));

  useEffect(() => {
    const handle = () => {
      setDims({
        cols: Math.ceil(window.innerWidth / cellSize) + 4,
        rows: Math.ceil(window.innerHeight / cellSize) + 4,
      });
    };
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, [cellSize]);

  return (
    <div className="fixed inset-0 h-full w-full z-0 overflow-hidden">
      <div className="relative h-full w-full flex items-center justify-center">
        <DivGrid
          key={`base-${rippleKey}`}
          rows={dims.rows}
          cols={dims.cols}
          cellSize={cellSize}
          borderColor="rgba(255,255,255,0.04)"
          fillColor="rgba(168,85,247,0.04)"
          clickedCell={clickedCell}
          onCellClick={(row, col) => {
            setClickedCell({ row, col });
            setRippleKey((k) => k + 1);
          }}
          interactive
        />
      </div>
    </div>
  );
}

function DivGrid({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = '#3f3f46',
  fillColor = 'rgba(14,165,233,0.3)',
  clickedCell = null,
  onCellClick = () => {},
  interactive = true,
}) {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols]
  );

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
  };

  return (
    <div className={cn('relative z-[3]', className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay = clickedCell ? Math.max(0, distance * 55) : 0;
        const duration = 200 + distance * 80;

        const customStyle = clickedCell
          ? { '--delay': `${delay}ms`, '--duration': `${duration}ms` }
          : {};

        return (
          <div
            key={idx}
            className={cn(
              'cell relative border-[0.5px] opacity-30 transition-opacity duration-150 will-change-transform hover:opacity-60',
              clickedCell && 'animate-cell-ripple [animation-fill-mode:none]',
              !interactive && 'pointer-events-none'
            )}
            style={{
              backgroundColor: fillColor,
              borderColor,
              ...customStyle,
            }}
            onClick={interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined}
          />
        );
      })}
    </div>
  );
}
