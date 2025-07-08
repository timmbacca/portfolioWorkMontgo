# Use the Node.js 18 image for building the React app
FROM node:18-slim as build

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

# Use a minimal image for serving
FROM node:18-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy the built React app from the build stage
COPY --from=build /app/build ./build

# Install serve globally
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 8080

# Start the server
CMD ["serve", "-s", "build", "-l", "8080"]