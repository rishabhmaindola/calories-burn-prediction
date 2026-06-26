import rateLimit from "express-rate-limit";

export const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: process.env.NODE_ENV === "production" ? 50 : 10,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        error: "Too many requests, please try again later.",
    },
});