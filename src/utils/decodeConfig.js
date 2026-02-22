// Ensure that all required keys exist in an object
const requireKeys = (obj, keys) => {
  for (const key of keys) {
    if (!obj[key]) {
      throw new Error(`Missing required key: ${key}`);
    }
  }
};

const decodeConfig = (str, keys) => {
  if (!str) return {};
  const obj = {};
  str.split(',').forEach((pair) => {
    // Split only on the FIRST ":" so values can contain ":"
    const [key, ...rest] = pair.split(':');
    // Rejoin remaining parts to reconstruct full value
    const value = rest.join(':');
    if (key && value) obj[key.trim()] = value.trim();
  });
  requireKeys(obj, keys);
  return obj;
};

module.exports = decodeConfig;
