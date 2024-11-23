# Use the Node.js 16 base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the working directory
COPY . .

# Ensure mysql-client is installed for database initialization
RUN apt-get update && apt-get install -y mysql-client

# Copy the SQL initialization script into the container
COPY ./db/init_tasks_table.sql /app/db/init_tasks_table.sql

# Expose the backend port
EXPOSE 4000

# Define the command to start the application and initialize the database
CMD ["sh", "-c", "npm start && mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME < /app/db/init_tasks_table.sql"]
