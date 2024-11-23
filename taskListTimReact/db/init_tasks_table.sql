-- Create a database if it doesn't exist
CREATE DATABASE IF NOT EXISTS task_tracker;

-- Use the database
USE task_tracker;

-- Drop the table if it already exists
DROP TABLE IF EXISTS tasks;

-- Create the tasks table
CREATE TABLE tasks (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(50) DEFAULT 'Low',
    status VARCHAR(50) DEFAULT 'To Do',
    assigned_to VARCHAR(255),
    start_date DATE,
    due_date DATE,
    estimated_time INT,
    time_spent INT,
    tags VARCHAR(255),
    progress INT DEFAULT 0,
    comments TEXT,
    is_recurring TINYINT(1) DEFAULT 0,
    risk_level VARCHAR(50) DEFAULT 'Low',
    PRIMARY KEY (id)
);

-- Optional: Insert sample data (you can remove this if not needed)
INSERT INTO tasks (title, description, priority, status, assigned_to, start_date, due_date, estimated_time, time_spent, tags, progress, comments, is_recurring, risk_level) 
VALUES 
('Sample Task 1', 'This is a sample task.', 'High', 'In Progress', 'John Doe', '2024-01-01', '2024-01-10', 10, 2, 'sample,task', 50, 'Initial task for testing.', 0, 'Medium'),
('Sample Task 2', 'Another sample task.', 'Low', 'To Do', 'Jane Doe', NULL, NULL, NULL, NULL, 'example', 0, NULL, 1, 'Low');
