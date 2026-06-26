# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install backend dependencies
COPY package.json ./
RUN npm install

# Install frontend dependencies
COPY client/package.json ./client/
RUN cd client && npm install

# Copy project
COPY . .

# Build Vite + Server
RUN npm run build

# ---------- Production Stage ----------
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Install backend production dependencies
COPY package.json ./
RUN npm install --omit=dev

# Copy built application
COPY --from=builder /app .

EXPOSE 5000

CMD ["npm", "start"]