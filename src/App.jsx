import React, { useState, useEffect, useRef } from 'react';
import { crc32 } from './utils/crc32';
import { EASTER_EGGS } from './eastereggs';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

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

  // Handle Math & Overrides
  let hash8 = '00000000', hash6 = '000000', angleHex = '00';
  let colour = '#1a1a1a', angleDeg = 0;
  
  // Handle Dynamic Text
  let headerText = <>Every name<br/>is a <em>colour.</em></>;
  let subtitleText = "An 8-character hash is generated from your name. The first 6 define your base colour, the final 2 calculate a light angle.";
  let labelText = "Calculated Hex";

  if (hasInput) {
    if (activeEgg) {
      // Apply Easter Egg Settings
      hash8 = 'OVERRIDE'; 
      hash6 = activeEgg.hex;
      angleHex = 'FF';
      colour = '#' + activeEgg.hex;
      angleDeg = activeEgg.angle;
      
      // We dynamically pull the prefix (Mine is vs Yours is) right here!
      if (activeEgg.customHeader) {
        headerText = activeEgg.customHeader(colour);
      } else {
        headerText = <>Every name is a colour.<br/>{activeEgg.prefix} <em style={{ color: colour }}>{activeEgg.title}</em></>;
      }
      subtitleText = activeEgg.desc;
      labelText = activeEgg.label;
    } else {
      // Standard Math
      hash8 = crc32(name);
      hash6 = hash8.slice(0, 6);
      angleHex = hash8.slice(6, 8);
      colour = '#' + hash6;
      angleDeg = Math.round((parseInt(angleHex, 16) / 255) * 360);
    }
  }

  // Calculate contrast for mobile reading
  const r = parseInt(hash6.slice(0, 2), 16) || 0;
  const g = parseInt(hash6.slice(2, 4), 16) || 0;
  const b = parseInt(hash6.slice(4, 6), 16) || 0;
  const isLight = (((r * 299) + (g * 587) + (b * 114)) / 1000) >= 128;

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