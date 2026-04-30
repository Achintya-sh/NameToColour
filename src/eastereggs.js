// ==========================================
// 🥚 THE EASTER EGG ENGINE (MAXIMUM OVERDRIVE)
// ==========================================

export const EASTER_EGGS = {
  /* THE ORIGINALS */
  'kashish meena': {
    hex: '520000', prefix: 'Yours is', title: 'my favourite.',
    desc: "Algorithms and hashes don't apply to you. Your name bypasses the math, radiating a perfect 360° glow in your absolute favourite shade.",
    label: "Her Favourite Colour", emojis: ['🔥', '❤️', '🔥', '💖', '🔥', '💘', '✨'], angle: 360,
  },
  'achintya sharma': {
    hex: '00F0FF', prefix: 'Mine is', title: 'the source code.',
    desc: "Creator recognized. Master override engaged. The underlying algorithm steps aside for the architect.",
    label: "Creator Identity", emojis: ['💻', '⚡', '⚙️', '👑', '🚀', '{ }', '< >'], angle: 180,
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
    label: "Nuclear Yellow", emojis: ['🍩', '🍺', '☢️', '🟡', '📺'], angle: 90,
    customHeader: (colour) => <>Mmm, <em style={{ color: colour }}>D'oh!</em></>
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
    label: "Spartan Rage", emojis: ['⚔️', '🔴', '💀', '🛡️', '🔥'], angle: 90,
    customHeader: (colour) => <>Rage and blood<br/>manifest in <em style={{ color: colour }}>crimson.</em></>
  },
  'zeus': {
    hex: 'FFD700', prefix: 'Yours is', title: 'king of the gods.',
    desc: "Father of gods and men, wielder of the Master Bolt. Even in death, his tyranny overrides all calculations.",
    label: "Olympus Override", emojis: ['⚡', '👑', '🔱', '☁️', '✨'], angle: 0,
    customHeader: (colour) => <>Gods transcend<br/>the mortal <em style={{ color: colour }}>palette.</em></>
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
    label: "Loki's Cunning", emojis: ['🦁', '🎯', '🐺', '✨', '🟢'], angle: 120,
    customHeader: (colour) => <>Destiny weaves<br/>in <em style={{ color: colour }}>verdant</em> mischief.</>
  },
  'thor': {
    hex: '4A90E2', prefix: 'Yours is', title: 'god of thunder.',
    desc: "Mighty Thor of Asgard. Even in death, his storm rages eternal. Mjolnir strikes where algorithms fail.",
    label: "Thunderous Override", emojis: ['⚡', '🔨', '🌩️', '👹', '🔵'], angle: 90,
    customHeader: (colour) => <>Thunder crashes<br/>in <em style={{ color: colour }}>azure</em> fury.</>
  },
  'odin': {
    hex: 'D4A574', prefix: 'Yours is', title: 'the all-father.',
    desc: "Odin All-Father, master of fate and magic. One eye sees all—including beyond the CRC32 veil.",
    label: "All-Father's Sight", emojis: ['👁️', '👑', '🐺', '✨', '⚡'], angle: 180,
    customHeader: (colour) => <>Fate itself dwells<br/>in <em style={{ color: colour }}>gold.</em></>
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
    label: "Serpent's Coil", emojis: ['🐍', '🌍', '⚫', '✨', '🟢'], angle: 180,
    customHeader: (colour) => <>The serpent coils<br/>through all <em style={{ color: colour }}>nine realms.</em></>
  }
};
