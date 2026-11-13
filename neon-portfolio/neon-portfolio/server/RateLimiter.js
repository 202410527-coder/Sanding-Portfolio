/** Spam limit: allows a few requests per visitor in a time window. */
class RateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.hits = new Map();
  }

  allow(key) {
    const now = Date.now();
    const recent = (this.hits.get(key) || []).filter((time) => now - time < this.windowMs);
    if (recent.length >= this.maxRequests) return false;
    recent.push(now);
    this.hits.set(key, recent);
    return true;
  }
}

module.exports = RateLimiter;
