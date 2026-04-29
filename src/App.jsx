import React, { useState, useEffect, useRef } from 'react';
import { crc32 } from './utils/crc32';
import './App.css';

export default function App() {
  const [name, setName] = useState('');
  const [particles, setParticles] = useState([]);
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
  
  // --- EXCEPTION FLAGS ---
  const isKashish = name.trim().toLowerCase() === 'kashish meena';
  const isAchintya = name.trim().toLowerCase() === 'achintya sharma';

  // Trigger custom particle explosions
  useEffect(() => {
    if (isKashish) {
      const emojis = ['🔥', '❤️', '🔥', '💖', '🔥', '💘', '✨'];
      const newParticles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 2 + 2}s`,
        delay: `${Math.random() * 0.5}s`,
        size: `${Math.random() * 2 + 1.5}rem`
      }));
      setParticles(newParticles);
    } else if (isAchintya) {
      // The Creator's Emojis: Tech, Power, and Code
      const emojis = ['💻', '⚡', '⚙️', '👑', '🚀', '{ }', '< >'];
      const newParticles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 2 + 2}s`,
        delay: `${Math.random() * 0.5}s`,
        size: `${Math.random() * 2 + 1.5}rem`
      }));
      setParticles(newParticles);
    } else {
      setParticles([]); // Clear explosion if it's a normal name
    }
  }, [isKashish, isAchintya]);

  // Calculate hash and colours (with Overrides)
  let hash8 = '00000000';
  let hash6 = '000000';
  let angleHex = '00';
  let colour = '#1a1a1a';
  let angleDeg = 0;

  if (hasInput) {
    if (isKashish) {
      // Her Overrides
      hash8 = 'L0VE1000'; 
      hash6 = '520000';
      angleHex = 'FF';
      colour = '#520000';
      angleDeg = 360; 
    } else if (isAchintya) {
      // Creator Overrides (Neon Cyberpunk Cyan)
      hash8 = 'M4ST3RKY'; 
      hash6 = '00F0FF';
      angleHex = 'FF';
      colour = '#00F0FF';
      angleDeg = 180; 
    } else {
      // Standard deterministic math
      hash8 = crc32(name);
      hash6 = hash8.slice(0, 6);
      angleHex = hash8.slice(6, 8);
      colour = '#' + hash6;
      angleDeg = Math.round((parseInt(angleHex, 16) / 255) * 360);
    }
  }

  // Calculate contrast for the pill background on mobile
  const r = parseInt(hash6.slice(0, 2), 16) || 0;
  const g = parseInt(hash6.slice(2, 4), 16) || 0;
  const b = parseInt(hash6.slice(4, 6), 16) || 0;
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  const isLight = yiq >= 128;

  // --- DYNAMIC TEXT LOGIC ---
  let headerText = <>Every name<br/>is a <em>colour.</em></>;
  let subtitleText = "An 8-character hash is generated from your name. The first 6 define your base colour, the final 2 calculate a light angle.";
  let labelText = "Calculated Hex";

  if (isKashish) {
    headerText = <>Every name is a colour.<br/>Yours is <em style={{ color: colour }}>my favourite.</em></>;
    subtitleText = "Algorithms and hashes don't apply to you. Your name bypasses the math, radiating a perfect 360° glow in your absolute favourite shade.";
    labelText = "Her Favourite Colour";
  } else if (isAchintya) {
    headerText = <>Every name is a colour.<br/>Mine is <em style={{ color: colour }}>the source code.</em></>;
    subtitleText = "Creator recognized. Master override engaged. The underlying algorithm steps aside for the G.O.A.T";
    labelText = "Creator Identity";
  }

  // Dynamic inline styles
  const swatchStyle = { backgroundColor: colour };
  const sheenStyle = {
    backgroundImage: hasInput 
      ? `linear-gradient(${angleDeg}deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 30%, transparent 50%, rgba(0,0,0,0.15) 100%)`
      : 'none',
  };
  const inputStyle = {
    fontSize: name.length > 12 ? 'clamp(28px, 10vw, 50px)' : 'clamp(48px, 15vw, 90px)'
  };

  return (
    <div className="page" style={{
      '--mobile-pill-bg': isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)',
      '--mobile-pill-border': isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.08)'
    }}>
      
      {/* EASTER EGG PARTICLES */}
      {particles.map(p => (
        <div 
          key={p.id} 
          className="particle"
          style={{
            left: p.left,
            fontSize: p.size,
            animationDuration: p.animationDuration,
            animationDelay: p.delay,
            fontFamily: isAchintya ? "'DM Mono', monospace" : "inherit"
          }}
        >
          {p.emoji}
        </div>
      ))}

      <div className="left">
        <p className="eyebrow">Name → Colour</p>
        
        <h1>{headerText}</h1>
        <p className="subtitle">{subtitleText}</p>

        <div className="input-group">
          <label className="input-label" htmlFor="nameInput">Your name</label>
          <input 
            type="text" 
            id="nameInput" 
            ref={inputRef}
            placeholder="Enter name..." 
            autoComplete="off" 
            spellCheck="false"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
          <div className="underline-bar"></div>
        </div>

        <div className={`result-block ${hasInput ? 'visible' : ''}`}>
          <div className="stagger-item">
            <p className="hex-display">{labelText}</p>
            <p className="hex-value" style={{ color: colour }}>{colour}</p>
          </div>
          
          <div className="algo-steps stagger-item">
            <div className="step">
              <span className="step-label">{isAchintya ? 'override' : 'crc32'}</span>
              <span className="step-val">{hash8}</span>
            </div>
            <div className="step">
              <span className="step-label">base</span>
              <span className="step-val">{hash6} (base)</span>
            </div>
            <div className="step">
              <span className="step-label">angle</span>
              <span className="step-val highlight">{angleHex} → {angleDeg}°</span>
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="right" style={swatchStyle}>
        <div className={`light-sheen ${hasInput ? 'active' : ''}`} style={sheenStyle}></div>
        <p className="corner-text">Colour identity</p>
        
        <span className={`swatch-hex-pill ${hasInput ? 'visible' : ''}`}>
          {colour}
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
      
    </div>
  );
}