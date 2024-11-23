# Use the Node.js 16 base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install dependencies (including devDependencies)
RUN npm install

# Install TypeScript globally (optional but useful for debugging)
RUN npm install -g typescript

# Copy the rest of the application code into the working directory
COPY . .

# Compile TypeScript into JavaScript
RUN npm run build

# Update apt-get and install the default MySQL client
RUN apt-get update && apt-get install -y default-mysql-client

# Copy the SQL initialization script into the container
COPY ./db/init_tasks_table.sql /app/db/init_tasks_table.sql

# Expose the backend port
EXPOSE 4000

# Define the command to start the application and initialize the database
CMD ["sh", "-c", "node dist/index.js && mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME < /app/db/init_tasks_table.sql"]
