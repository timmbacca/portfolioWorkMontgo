# Use the Node.js 16 image for building the React app
FROM node:16 as build

# Set the working directory
WORKDIR /app

# Copy package.json, package-lock.json, and tsconfig.json to install dependencies
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight web server (Nginx) to serve the production build
FROM nginx:stable-alpine

# Copy the build output from the previous step
COPY --from=build /app/build /usr/share/nginx/html

# Add the custom Nginx configuration to handle React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the web server
EXPOSE 80

# Start the web server
CMD ["nginx", "-g", "daemon off;"]
