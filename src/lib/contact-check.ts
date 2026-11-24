/** A real address needs a name, a domain, and a dot, like name@gmail.com. */
export function isValidEmail(value: string) {
  const email = value.trim();
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/.test(email);
}

/**
 * Accepts an international number (10–15 digits, optional +) or a Bangladesh
 * mobile number, either 01XXXXXXXXX or +8801XXXXXXXXX.
 */
export function isValidPhone(value: string) {
  const compact = value.trim().replace(/[\s().-]/g, "");
  if (!/^\+?\d+$/.test(compact)) return false;
  const digits = compact.startsWith("+") ? compact.slice(1) : compact;
  if (digits.startsWith("880")) return /^8801[3-9]\d{8}$/.test(digits);
  if (digits.startsWith("0")) return /^01[3-9]\d{8}$/.test(digits);
  return digits.length >= 10 && digits.length <= 15;
}
