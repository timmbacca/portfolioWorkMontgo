-- Create a database
-- Note: PostgreSQL does not support `IF NOT EXISTS` for `CREATE DATABASE` in a SQL script
-- Create the database manually if needed: CREATE DATABASE task_tracker_tim;

-- Switch to the database (this step is for reference, not executable in PostgreSQL scripts)
-- \c task_tracker_tim

-- Drop the table if it already exists
DROP TABLE IF EXISTS tasks;

-- Create the tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY, -- SERIAL handles auto-increment in PostgreSQL
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
    is_recurring BOOLEAN DEFAULT FALSE, -- BOOLEAN replaces TINYINT(1) in PostgreSQL
    risk_level VARCHAR(50) DEFAULT 'Low'
);

-- Optional: Insert sample data (you can remove this if not needed)
INSERT INTO tasks (title, description, priority, status, assigned_to, start_date, due_date, estimated_time, time_spent, tags, progress, comments, is_recurring, risk_level) 
VALUES 
('Sample Task 1', 'This is a sample task.', 'High', 'In Progress', 'John Doe', '2024-01-01', '2024-01-10', 10, 2, 'sample,task', 50, 'Initial task for testing.', FALSE, 'Medium'),
('Sample Task 2', 'Another sample task.', 'Low', 'To Do', 'Jane Doe', NULL, NULL, NULL, NULL, 'example', 0, NULL, TRUE, 'Low');
