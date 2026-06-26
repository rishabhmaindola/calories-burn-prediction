# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Root dependencies
COPY package*.json ./
RUN npm ci

# Client dependencies
COPY client/package*.json ./client/
RUN cd client && npm ci

# Copy source
COPY . .

# Builds:
# 1. client/dist
# 2. dist/
RUN npm run build


# ---------- Production Stage ----------
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled application
COPY --from=builder /app .

EXPOSE 5000

CMD ["npm", "start"]