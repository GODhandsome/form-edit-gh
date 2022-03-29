const numbers = '0123456789';
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Generate random string
 * @param {Number} length
 * @param {any} options
 */
function randomString(length, options) {
  let num = length || 8;
  let chars = '';
  let result = '';

  if (typeof options === 'number' || typeof options === 'string') {
    chars += options;
  } else {
    chars += numbers + letters;
  }

  while (num > 0) {
    num -= 1;
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export default randomString;
