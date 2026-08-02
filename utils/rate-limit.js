const buckets = new Map();

export function isRateLimited(key, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const timestamps = (buckets.get(key) || []).filter((t) => now - t < windowMs);

  if (timestamps.length >= limit) {
    buckets.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  buckets.set(key, timestamps);
  return false;
}
