import React, { useState, useEffect, useRef, useMemo } from 'react';
import { crc32 } from './utils/crc32';
import { EASTER_EGGS } from './eastereggs';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

const getContrastColor = (hex) => {
  const r = parseInt(hex.slice(0, 2), 16) || 0;
  const g = parseInt(hex.slice(2, 4), 16) || 0;
  const b = parseInt(hex.slice(4, 6), 16) || 0;
  return (((r * 299) + (g * 587) + (b * 114)) / 1000) >= 128;
};

export default function App() {
  const [name, setName] = useState('');
  const [particles, setParticles] = useState([]);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  // Focus input if tapping background on mobile
  useEffect(() => {
    const handleBodyClick = (e) => {
      if (window.innerWidth <= 800 && e.target !== inputRef.current) {
        inputRef.current?.focus();
      }
    };
    document.addEventListener('click', handleBodyClick);
    return () => document.removeEventListener('click', handleBodyClick);
  }, []);

  const hasInput = name.trim() !== '';
  const normalizedName = name.trim().toLowerCase();
  const activeEgg = EASTER_EGGS[normalizedName];

  // Memoize hash and color calculations
  const { hash8, hash6, angleHex, colour, angleDeg } = useMemo(() => {
    if (!hasInput) return { hash8: '00000000', hash6: '000000', angleHex: '00', colour: '#1a1a1a', angleDeg: 0 };
    
    if (activeEgg) {
      return { hash8: 'OVERRIDE', hash6: activeEgg.hex, angleHex: 'FF', colour: '#' + activeEgg.hex, angleDeg: activeEgg.angle };
    }
    
    const h = crc32(name);
    const h6 = h.slice(0, 6);
    const aHex = h.slice(6, 8);
    return { hash8: h, hash6: h6, angleHex: aHex, colour: '#' + h6, angleDeg: Math.round((parseInt(aHex, 16) / 255) * 360) };
  }, [hasInput, activeEgg, name]);

  const isLight = useMemo(() => getContrastColor(hash6), [hash6]);

  // Trigger custom particle explosions
  useEffect(() => {
    if (activeEgg) {
      const newParticles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        emoji: activeEgg.emojis[Math.floor(Math.random() * activeEgg.emojis.length)],
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 2 + 2}s`,
        delay: `${Math.random() * 0.5}s`,
        size: `${Math.random() * 2 + 1.5}rem`
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [activeEgg]);

  // Memoize dynamic text
  const { headerText, subtitleText, labelText } = useMemo(() => ({
    headerText: !hasInput ? (
      <>Every name<br/>is a <em>colour.</em></>
    ) : activeEgg?.customHeader ? (
      activeEgg.customHeader(colour)
    ) : activeEgg ? (
      <>Every name is a colour.<br/>{activeEgg.prefix} <em style={{ color: colour }}>{activeEgg.title}</em></>
    ) : (
      <>Every name<br/>is a <em>colour.</em></>
    ),
    subtitleText: activeEgg?.desc || "An 8-character hash is generated from your name. The first 6 define your base colour, the final 2 calculate a light angle.",
    labelText: activeEgg?.label || "Calculated Hex"
  }), [hasInput, activeEgg, colour]);

  // Copy to Clipboard Function
  const handleCopy = () => {
    if (!hasInput) return;
    navigator.clipboard.writeText(colour);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page" style={{
      '--mobile-pill-bg': isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)',
      '--mobile-pill-border': isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.08)'
    }}>
      
      {/* EASTER EGG PARTICLES */}
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          left: p.left, fontSize: p.size, animationDuration: p.animationDuration, animationDelay: p.delay,
          fontFamily: activeEgg?.label === 'Creator Identity' ? "'DM Mono', monospace" : "inherit"
        }}>
          {p.emoji}
        </div>
      ))}

      <div className="left">
        <p className="eyebrow">Name → Colour</p>
        
        <h1>{headerText}</h1>
        <p className="subtitle">{subtitleText}</p>

        <div className="input-group">
          <label className="input-label" htmlFor="nameInput">Your name</label>
          <input type="text" id="nameInput" ref={inputRef} placeholder="Enter name..." autoComplete="off" spellCheck="false"
            value={name} onChange={(e) => setName(e.target.value)}
            style={{ fontSize: name.length > 12 ? 'clamp(28px, 10vw, 50px)' : 'clamp(48px, 15vw, 90px)' }}
          />
          <div className="underline-bar"></div>
        </div>

        <div className={`result-block ${hasInput ? 'visible' : ''}`}>
          <div className="stagger-item">
            <p className="hex-display">{labelText}</p>
            {/* CLICK TO COPY BUTTON (DESKTOP) */}
            <p 
              className="hex-value copyable" 
              style={{ color: colour }}
              onClick={handleCopy}
              title="Click to copy hex code"
            >
              {copied ? 'COPIED!' : colour}
            </p>
          </div>
          
          <div className="algo-steps stagger-item">
            <div className="step"><span className="step-label">{activeEgg ? 'override' : 'crc32'}</span><span className="step-val">{hash8}</span></div>
            <div className="step"><span className="step-label">base</span><span className="step-val">{hash6} (base)</span></div>
            <div className="step"><span className="step-label">angle</span><span className="step-val highlight">{angleHex} → {angleDeg}°</span></div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="right" style={{ backgroundColor: colour }}>
        <div className={`light-sheen ${hasInput ? 'active' : ''}`} style={{
          backgroundImage: hasInput ? `linear-gradient(${angleDeg}deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 30%, transparent 50%, rgba(0,0,0,0.15) 100%)` : 'none'
        }}></div>
        
        {/* CLICK TO COPY BUTTON (MOBILE PILL) */}
        <span 
          className={`swatch-hex-pill copyable ${hasInput ? 'visible' : ''}`}
          onClick={handleCopy}
        >
          {copied ? 'Copied!' : colour}
        </span>

        <div className={`idle-msg ${hasInput ? 'hidden' : ''}`}>
          <div className="idle-inner">
            <div className="idle-circle">N</div>
            <p className="idle-text">Awaiting Entry</p>
          </div>
        </div>

        <div className="stagger-item swatch-text-group" style={{ opacity: hasInput ? 1 : 0 }}>
          <p className="swatch-label">colour of</p>
          <p className="swatch-name">{name || '\u00a0'}</p>
        </div>
      </div>
      
      <Analytics />
    </div>
  );
}