# ---------- DEV dependencies (includes nodemon) ----------
FROM node:20-alpine AS dev
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]


# ---------- PROD dependencies (no devDependencies) ----------
FROM node:20-alpine AS prod-deps
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev


# ---------- PRODUCTION runtime ----------
FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production

COPY --from=prod-deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000
CMD ["npm", "start"]