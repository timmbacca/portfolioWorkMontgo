# Use a lighter-weight base image
FROM node:18-slim AS base

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Use a minimal production image
FROM node:18-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy the built code and dependencies from the base stage
COPY --from=base /usr/src/app/dist ./dist
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=base /usr/src/app/package*.json ./

# Install postgresql-client
RUN apt-get update && apt-get install -y postgresql-client && which psql

# Copy the SQL initialization script into the container
COPY ./db/init_tasks_table.sql /usr/src/app/db/init_tasks_table.sql

# Download wait-for-it.sh
ADD https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

# Install pg-connection-string
RUN npm install pg-connection-string

# Expose the port the app runs on
EXPOSE 4000

# Define the command to start the application and initialize the database
CMD ["node", "dist/index.js"]
