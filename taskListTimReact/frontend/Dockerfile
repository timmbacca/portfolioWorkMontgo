# Use the Node.js 16 image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /taskListTimReact

# Copy package.json and package-lock.json for dependency installation
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the TypeScript code into JavaScript
RUN npm run build

# Expose the port the frontend will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
