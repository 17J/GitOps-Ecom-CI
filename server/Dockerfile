# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app

# 1. 
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# 2. 
COPY --from=build --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --chown=appuser:appgroup . .

# 3. 
RUN chown -R appuser:appgroup /app

# 4. 
USER appuser

EXPOSE 5000

CMD ["node", "server.js"]
