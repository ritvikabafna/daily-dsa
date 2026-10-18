class RateLimiter {
  constructor({ windowMs, maxRequests }) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.clients = new Map();

    // Auto-cleanup stale entries every minute to avoid memory leaks
    if (typeof setInterval !== "undefined") {
      const interval = setInterval(() => {
        const now = Date.now();
        for (const [key, record] of this.clients.entries()) {
          if (now > record.resetTime) {
            this.clients.delete(key);
          }
        }
      }, 60000);
      if (interval.unref) interval.unref();
    }
  }

  check(key) {
    const now = Date.now();
    let record = this.clients.get(key);

    if (!record || now > record.resetTime) {
      record = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      this.clients.set(key, record);
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetInSeconds: Math.ceil(this.windowMs / 1000),
      };
    }

    if (record.count >= this.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetInSeconds: Math.max(1, Math.ceil((record.resetTime - now) / 1000)),
      };
    }

    record.count += 1;
    return {
      allowed: true,
      remaining: this.maxRequests - record.count,
      resetInSeconds: Math.max(1, Math.ceil((record.resetTime - now) / 1000)),
    };
  }
}

// 1. Login rate limiter: Max 5 attempts per 60 seconds per IP
export const loginLimiter = new RateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 5,
});

// 2. Signup rate limiter: Max 5 signups per 15 minutes per IP
export const signupLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 5,
});

// 3. Execute rate limiter: Max 15 code executions per 60 seconds per IP
export const executeLimiter = new RateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 15,
});

export function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}
