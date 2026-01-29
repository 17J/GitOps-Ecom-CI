# Stage 1: Build the React Frontend (using Vite.js)
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./


# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . ./

# Build the frontend
RUN npm run build

# Stage 2: Serve the built frontend
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

#  Create non-root user
RUN addgroup -g 1001 -S nginx && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx  -s /sbin/nologin -G nginx  -g nginx nginx 



# Copy the built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set Permission
RUN chown -R nginx:nginx  /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80
USER nginx 

# Start nginx
CMD ["nginx", "-g", "daemon off;"]