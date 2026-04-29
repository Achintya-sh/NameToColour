const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[i] = c;
  }
  return t;
})();

export function crc32(str) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < str.length; i++) {
    crc = CRC_TABLE[(crc ^ str.charCodeAt(i)) & 0xFF] ^ (crc >>> 8);
  }
  return ((crc ^ 0xFFFFFFFF) >>> 0).toString(16).padStart(8, '0').toUpperCase();
}