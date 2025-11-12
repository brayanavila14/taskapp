import { rateLimit } from "express-rate-limit";

const windowMinutes = Number(process.env.RATE_LIMIT_WINDOW ?? 15);
const maxRequests = Number(process.env.RATE_LIMIT_MAX ?? 100);

export const generalLimiter = rateLimit({
  windowMs: windowMinutes * 60 * 1000,
  max: maxRequests,
  standardHeaders: true,
  legacyHeaders: false,
});
