FROM node:18-alpine
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 appuser && \
    adduser -u 1001 -G appuser -s /bin/sh -D appuser && \
    chown -R appuser:appuser /usr/src/app

USER appuser
EXPOSE 5000

CMD ["node", "server.js"]
