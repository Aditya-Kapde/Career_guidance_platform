/**
 * Basic in-memory rate limiter to prevent API abuse (Denial of Wallet).
 * Tracks requests by IP address.
 */

const rateLimits = new Map();

// 50 requests per hour per IP (generous for MVP, strict enough to prevent bot swarms)
const MAX_REQUESTS = 50; 
const WINDOW_MS = 60 * 60 * 1000; 

export const apiRateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  
  if (!rateLimits.has(ip)) {
    rateLimits.set(ip, {
      count: 1,
      startTime: Date.now()
    });
    return next();
  }

  const record = rateLimits.get(ip);
  const now = Date.now();

  // Reset window if time passed
  if (now - record.startTime > WINDOW_MS) {
    record.count = 1;
    record.startTime = now;
    return next();
  }

  // Increment and check
  record.count += 1;
  if (record.count > MAX_REQUESTS) {
    return res.status(429).json({ 
      error: "Too many assessment requests generated from this IP. Please try again in an hour." 
    });
  }

  next();
};

// Cleanup interval to avoid memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimits.entries()) {
    if (now - record.startTime > WINDOW_MS) {
      rateLimits.delete(ip);
    }
  }
}, WINDOW_MS);
