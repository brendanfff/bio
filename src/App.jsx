import { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import RippleBackground from './components/RippleBackground';
import ProfileCard from './components/ProfileCard';
import MusicPlayer from './components/MusicPlayer';
import EnterOverlay from './components/EnterOverlay';
import './App.css';

function App() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const title = '@brendanff';
    let idx = 0;
    let dir = 1;
    let timer;

    const tick = () => {
      document.title = title.slice(0, idx);
      idx += dir;
      if (idx > title.length) { idx = title.length; dir = -1; timer = setTimeout(tick, 1500); return; }
      if (idx < 1) { idx = 1; dir = 1; timer = setTimeout(tick, 800); return; }
      timer = setTimeout(tick, 120);
    };
    tick();

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <div className={`blur-target${!entered ? ' blurred' : ''}`}>
        <RippleBackground rows={12} cols={30} cellSize={48} />
        <main className="content">
          <MusicPlayer entered={entered} />
          <ProfileCard />
          <footer className="footer">
            <span>© 2026 — built with milk</span>
          </footer>
        </main>
      </div>
      <CustomCursor />
      {!entered && <EnterOverlay onEnter={() => setEntered(true)} />}
    </div>
  );
}

export default App;
