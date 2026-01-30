# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production



# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . ./

# Build the frontend

RUN npm run build

# Stage 2: Production
# Stage 2: Production
FROM nginx:alpine


# Copy build files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx user ko folders ka owner banao (Important for non-root)
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /usr/share/nginx/html


RUN chmod -R 755 /usr/share/nginx/html


EXPOSE 80

# Switch to existing nginx user
USER nginx

CMD ["nginx", "-g", "daemon off;"]

