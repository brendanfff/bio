import { useState, useEffect, useCallback } from 'react';
import { FaGithub, FaDiscord, FaSteam } from 'react-icons/fa';

const links = [
  { label: 'GitHub',  icon: FaGithub,  url: 'https://github.com/brendanfff', copyOnly: false },
  { label: 'Discord', icon: FaDiscord, username: 'brendanff',     copyOnly: true  },
  { label: 'Steam',   icon: FaSteam,   url: 'https://steamcommunity.com/id/gurenlagan3456/', copyOnly: false },
];

export default function SocialLinks() {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const t = setTimeout(() => setActiveIndex(null), 1500);
    return () => clearTimeout(t);
  }, [activeIndex]);

  const copy = useCallback(async (username, index) => {
    try {
      await navigator.clipboard.writeText(username);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = username;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setActiveIndex(index);
  }, []);

  return (
    <div className="social-links">
      {links.map((link, i) => {
        const { label, icon: Icon } = link;

        if (link.copyOnly) {
          return (
            <button
              key={label}
              className="social-link"
              onClick={() => copy(link.username, i)}
            >
              {activeIndex === i ? (
                <span>copied username</span>
              ) : (
                <>
                  <Icon />
                  <span>{label}</span>
                </>
              )}
            </button>
          );
        }

        return (
          <a
            key={label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <Icon />
            <span>{label}</span>
          </a>
        );
      })}
    </div>
  );
}
