# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app



COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . .


RUN chown -R node:node /app


USER node

EXPOSE 5000

CMD ["node", "server.js"]
