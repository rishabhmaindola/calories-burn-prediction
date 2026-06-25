import express from 'express';
import dotenv from 'dotenv'
import { dirname, join } from 'path';
import { fileURLToPath } from "url";
import { globalRateLimiter } from './lib/ratelimiter.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(globalRateLimiter)
app.use(express.json())
app.use(express.static(join("client/dist")));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, "client/dist", "index.html"));
})

export default app;