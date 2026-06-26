# ---------- Build Stage ----------
FROM node:20-bookworm-slim AS builder

WORKDIR /app

COPY package.json ./
RUN npm install

COPY client/package.json ./client/
RUN cd client && npm install

COPY . .

RUN npm run build

# ---------- Production Stage ----------
FROM node:20-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production

COPY package.json ./
RUN npm install --omit=dev

COPY --from=builder /app .

EXPOSE 5000

CMD ["npm", "start"]