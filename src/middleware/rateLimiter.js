const setRateLimit = require("express-rate-limit");
const { rateLimitKit } = require("../../toolkit/config/env");

// Rate limit middleware
const rateLimitMiddleware = setRateLimit({
  windowMs: rateLimitKit.windowMs,
  max: rateLimitKit.max,
  message: `You have exceeded your ${rateLimitKit.windowMs} requests per minute limit.`,
  headers: true,
});

module.exports = rateLimitMiddleware;
