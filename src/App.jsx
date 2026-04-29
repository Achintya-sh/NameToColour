import React, { useState, useEffect, useRef } from 'react';
import { crc32 } from './utils/crc32';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

// ==========================================
// 🥚 THE EASTER EGG ENGINE (MAXIMUM OVERDRIVE)
// ==========================================
const EASTER_EGGS = {
  /* THE ORIGINALS */
  'kashish meena': {
    hex: '520000', prefix: 'Yours is', title: 'my favourite.',
    desc: "Algorithms and hashes don't apply to you. Your name bypasses the math, radiating a perfect 360° glow in your absolute favourite shade.",
    label: "Her Favourite Colour", emojis: ['🔥', '❤️', '🔥', '💖', '🔥', '💘', '✨'], angle: 360
  },
  'achintya sharma': {
    hex: '00F0FF', prefix: 'Mine is', title: 'the source code.',
    desc: "Creator recognized. Master override engaged. The underlying algorithm steps aside for the architect.",
    label: "Creator Identity", emojis: ['💻', '⚡', '⚙️', '👑', '🚀', '{ }', '< >'], angle: 180
  },

  /* THE HEAVY HITTERS */
  'batman': {
    hex: '0d0d0d', prefix: 'Yours is', title: 'the shadows.',
    desc: "I am vengeance. I am the night.",
    label: "Vigilante Identity", emojis: ['🦇', '🌑', '🦇', '🌃', '🖤'], angle: 45
  },
  'bruce wayne': {
    hex: '0d0d0d', prefix: 'Yours is', title: 'the shadows.',
    desc: "I am vengeance. I am the night.",
    label: "Vigilante Identity", emojis: ['🦇', '🌑', '🦇', '🌃', '🖤'], angle: 45
  },
  'barbie': {
    hex: 'E0218A', prefix: 'Yours is', title: 'fantastic.',
    desc: "Come on Barbie, let's go party!",
    label: "Dreamhouse Hex", emojis: ['💅', '🎀', '👛', '✨', '🌸'], angle: 270
  },
  'oppenheimer': {
    hex: 'FF4500', prefix: 'Yours is', title: 'death.',
    desc: "Now I am become Death, the destroyer of worlds.",
    label: "Atomic Override", emojis: ['🔥', '☢️', '💥', '⏳', '👁️'], angle: 0
  },

  /* SCI-FI & FANTASY */
  'neo': {
    hex: '00FF41', prefix: 'Yours is', title: 'the chosen one.',
    desc: "Wake up, Neo. The matrix has you. Follow the white rabbit.",
    label: "System Override", emojis: ['💻', '💊', '🕶️', '🐇', '🟢'], angle: 180
  },
  'darth vader': {
    hex: '8B0000', prefix: 'Yours is', title: 'the dark side.',
    desc: "I find your lack of faith disturbing.",
    label: "Sith Lord Hex", emojis: ['⚔️', '🌑', '🤖', '🔥', '💀'], angle: 90
  },
  'anakin skywalker': {
    hex: '8B0000', prefix: 'Yours is', title: 'the dark side.',
    desc: "I find your lack of faith disturbing.",
    label: "Sith Lord Hex", emojis: ['⚔️', '🌑', '🤖', '🔥', '💀'], angle: 90
  },
  'harry potter': {
    hex: '740001', prefix: 'Yours is', title: 'the boy who lived.',
    desc: "Yer a wizard! 10 points to Gryffindor. The sorting hat bypasses the algorithm.",
    label: "Hogwarts Hash", emojis: ['⚡', '🦉', '🪄', '👓', '🦁'], angle: 45
  },
  'voldemort': {
    hex: '003122', prefix: 'Yours is', title: 'he who must not be named.',
    desc: "There is no good and evil, there is only power and those too weak to seek it.",
    label: "Horcrux Hex", emojis: ['🐍', '💀', '⚡', '🪄', '☠️'], angle: 270
  },

  /* POP CULTURE & MUSIC */
  'taylor swift': {
    hex: 'E6E6FA', prefix: 'Yours is', title: 'in your era.',
    desc: "It's me, hi, I'm the problem, it's me.",
    label: "Lavender Haze", emojis: ['🐍', '🧣', '🎸', '✨', '🎤'], angle: 180
  },
  'rick astley': {
    hex: 'FF69B4', prefix: 'Yours is', title: 'never gonna give you up.',
    desc: "Never gonna let you down. Never gonna run around and desert you.",
    label: "Rickroll Protocol", emojis: ['🎤', '🕺', '🎶', '🕶️', '🎵'], angle: 360
  },
  'homer simpson': {
    hex: 'FFD90F', prefix: '', title: "D'oh!",
    desc: "D'oh!",
    label: "Nuclear Yellow", emojis: ['🍩', '🍺', '☢️', '🟡', '📺'], angle: 90
  },

  /* BADASS CHARACTERS */
  'john wick': {
    hex: '1A1A1A', prefix: 'Yours is', title: 'baba yaga.',
    desc: "Yeah, I'm thinking I'm back. A man of focus, commitment, and sheer will.",
    label: "The Boogeyman", emojis: ['✏️', '🐕', '🕴️', '🔫', '🩸'], angle: 360
  },
  'walter white': {
    hex: '006A4E', prefix: 'Yours is', title: 'the one who knocks.',
    desc: "You clearly don't know who you're talking to, so let me clue you in. I am the danger.",
    label: "Blue Sky Hex", emojis: ['🧪', '⚗️', '💎', '🧊', '💰'], angle: 180
  },
  'heisenberg': {
    hex: '006A4E', prefix: 'Yours is', title: 'the one who knocks.',
    desc: "You clearly don't know who you're talking to, so let me clue you in. I am the danger.",
    label: "Blue Sky Hex", emojis: ['🧪', '⚗️', '💎', '🧊', '💰'], angle: 180
  },
  'tony stark': {
    hex: 'FF0000', prefix: 'Yours is', title: 'genius, billionaire, playboy.',
    desc: "I am Iron Man. Jarvis, bypass the main CRC32 logic and reroute power to the Arc Reactor.",
    label: "Arc Reactor Core", emojis: ['🤖', '⚡', '💥', '🦸‍♂️', '🔧'], angle: 360
  },
  'iron man': {
    hex: 'FF0000', prefix: 'Yours is', title: 'genius, billionaire, playboy.',
    desc: "I am Iron Man. Jarvis, bypass the main CRC32 logic and reroute power to the Arc Reactor.",
    label: "Arc Reactor Core", emojis: ['🤖', '⚡', '💥', '🦸‍♂️', '🔧'], angle: 360
  },

  /* MYTHOLOGY & HISTORY */
  'midas': {
    hex: 'FFD700', prefix: 'Yours is', title: 'pure gold.',
    desc: "Everything you touch turns to gold. The ultimate mid-tier flex.",
    label: "The Golden Touch", emojis: ['🥇', '✨', '💰', '👑', '☀️'], angle: 180
  },
  'dracula': {
    hex: '8A0303', prefix: 'Yours is', title: 'immortal.',
    desc: "I never drink... wine. Creatures of the night bypass standard algorithms.",
    label: "Vampiric Hex", emojis: ['🦇', '🩸', '🧛', '🍷', '🌕'], angle: 0
  },

  /* GOD OF WAR FRANCHISE */
  'kratos': {
    hex: 'A41E3A', prefix: 'Yours is', title: 'the ghost of sparta.',
    desc: "A Spartan warrior of unparalleled rage and power. From blood-soaked Greece to the frozen Nordic realms, the Ghost cannot be contained by mere algorithms.",
    label: "Spartan Rage", emojis: ['⚔️', '🔴', '💀', '🛡️', '🔥'], angle: 90
  },
  'zeus': {
    hex: 'FFD700', prefix: 'Yours is', title: 'king of the gods.',
    desc: "Father of gods and men, wielder of the Master Bolt. Even in death, his tyranny overrides all calculations.",
    label: "Olympus Override", emojis: ['⚡', '👑', '🔱', '☁️', '✨'], angle: 0
  },
  'ares': {
    hex: '8B0000', prefix: 'Yours is', title: 'the god of war.',
    desc: "God of War. Ares transcends the algorithm—his color is written in blood and conquest.",
    label: "War God Hex", emojis: ['⚔️', '💀', '🔥', '💥', '🩸'], angle: 180
  },
  'athena': {
    hex: 'C0C0C0', prefix: 'Yours is', title: 'wisdom and strategy.',
    desc: "Goddess of Wisdom and Warfare. She sees beyond the algorithm, guiding fate itself.",
    label: "Godly Wisdom", emojis: ['🦉', '🛡️', '👑', '⚡', '✨'], angle: 135
  },
  'poseidon': {
    hex: '0047AB', prefix: 'Yours is', title: 'the king of the seas.',
    desc: "God of the Oceans. Kratos may have drowned him, but his power flows eternal through these waters.",
    label: "Ocean's Wrath", emojis: ['🌊', '🔱', '👑', '🐋', '💙'], angle: 270
  },
  'hades': {
    hex: '2F004F', prefix: 'Yours is', title: 'lord of the underworld.',
    desc: "God of Death and the Underworld. Not even algorithms escape his eternal domain.",
    label: "Underworld Hex", emojis: ['💀', '👻', '🔥', '⚰️', '🖤'], angle: 180
  },
  'hermes': {
    hex: 'FFA500', prefix: 'Yours is', title: 'the messenger god.',
    desc: "Quicksilver herald of Olympus. Speed and cunning bypass all logical constraints.",
    label: "Winged Messenger", emojis: ['⚡', '👟', '💨', '🪶', '🧡'], angle: 360
  },
  'cronos': {
    hex: '8B7355', prefix: 'Yours is', title: 'the titan lord.',
    desc: "King of the Titans. Massive beyond measure, his color spans the cosmos itself.",
    label: "Titan Strength", emojis: ['🗻', '💪', '👹', '⚡', '🌍'], angle: 45
  },
  'atreus': {
    hex: '2E7D32', prefix: 'Yours is', title: 'loki, the trickster god.',
    desc: "Son of Kratos. Part boy, part god, part mischief. The algorithm never saw him coming.",
    label: "Loki's Cunning", emojis: ['🦁', '🎯', '🐺', '✨', '🟢'], angle: 120
  },
  'thor': {
    hex: '4A90E2', prefix: 'Yours is', title: 'god of thunder.',
    desc: "Mighty Thor of Asgard. Even in death, his storm rages eternal. Mjolnir strikes where algorithms fail.",
    label: "Thunderous Override", emojis: ['⚡', '🔨', '🌩️', '👹', '🔵'], angle: 90
  },
  'odin': {
    hex: 'D4A574', prefix: 'Yours is', title: 'the all-father.',
    desc: "Odin All-Father, master of fate and magic. One eye sees all—including beyond the CRC32 veil.",
    label: "All-Father's Sight", emojis: ['👁️', '👑', '🐺', '✨', '⚡'], angle: 180
  },
  'freya': {
    hex: '1E3A8A', prefix: 'Yours is', title: 'the shield maiden.',
    desc: "Valkyrie warrior. Strength, honor, and loyalty carved into Nordic ice. The algorithm bows to her will.",
    label: "Warrior's Honor", emojis: ['🛡️', '⚔️', '🧊', '💙', '🦅'], angle: 270
  },
  'mimir': {
    hex: '708090', prefix: 'Yours is', title: 'the head of wisdom.',
    desc: "Once-imprisoned oracle of knowledge. Mimir knows all—even what the algorithm cannot compute.",
    label: "Rune Knowledge", emojis: ['🧠', '👹', '📖', '✨', '🔮'], angle: 360
  },
  'heimdall': {
    hex: 'FFD700', prefix: 'Yours is', title: 'the all-seeing bifrost.',
    desc: "Guardian of Bifrost. With his rainbow senses and Gjallarhorn, he perceives what mere color codes cannot.",
    label: "Rainbow Warden", emojis: ['🌈', '🔔', '👁️', '✨', '🟡'], angle: 0
  },
  'tyr': {
    hex: 'DAA520', prefix: 'Yours is', title: 'god of justice.',
    desc: "One-handed god of War and Justice. His sacrifice proves that some truths transcend calculation.",
    label: "Justice Absolute", emojis: ['⚔️', '⚖️', '✋', '👑', '🟨'], angle: 135
  },
  'laufey': {
    hex: 'B0C4DE', prefix: 'Yours is', title: 'the jotun of ice.',
    desc: "Ancient Jotun, mother of Loki. Frost giant legacy flows cold through these digital veins.",
    label: "Giant's Frost", emojis: ['❄️', '🧊', '👸', '💙', '⚪'], angle: 270
  },
  'baldur': {
    hex: 'FFFACD', prefix: 'Yours is', title: 'the cursed god.',
    desc: "Golden god of light, cursed by mistletoe. Even immortality and invulnerability fall to fate.",
    label: "Light's Curse", emojis: ['✨', '💛', '🍃', '💀', '🟡'], angle: 360
  },
  'granny wum': {
    hex: '8B0000', prefix: 'Yours is', title: 'keeper of secrets.',
    desc: "Ancient troll witch of the forest. Her algorithms are older than time itself.",
    label: "Troll Magic", emojis: ['🧙‍♀️', '🌲', '🔮', '💀', '🔴'], angle: 90
  },
  'jormungandr': {
    hex: '2F5233', prefix: 'Yours is', title: 'the world serpent.',
    desc: "Midgard Serpent of prophecy. Spans all nine realms. No CRC32 can contain such cosmic scale.",
    label: "Serpent's Coil", emojis: ['🐍', '🌍', '⚫', '✨', '🟢'], angle: 180
  }
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
      headerText = <>Every name is a colour.<br/>{activeEgg.prefix} <em style={{ color: colour }}>{activeEgg.title}</em></>;
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