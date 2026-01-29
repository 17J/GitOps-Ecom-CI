# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app


# Copy package files
COPY package*.json ./
RUN npm ci --only=production


# Install dependencies from Nexus
RUN npm ci --only=production

# Copy source code
COPY . .

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Copy from build stage
COPY --from=build --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .

# Create non-root user
RUN addgroup -g 1001 appuser && \
    adduser -u 1001 -G appuser -s /bin/sh -D appuser && \
    chown -R appuser:appuser /usr/src/app

USER appuser
EXPOSE 5000

CMD ["node", "server.js"]

