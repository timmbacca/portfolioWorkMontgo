import { Request, Response } from 'express';
import { pool } from '../db'; // Ensure your pool is configured for PostgreSQL

// Get all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM tasks`);
    res.json(result.rows); // Use `rows` from the query result
  } catch (err) {
    const error = err as Error; // Explicitly cast err to Error
    console.error('Error retrieving tasks:', error.message, error.stack);
    res.status(500).json({ message: 'Error retrieving tasks' });
  }
};

// Create a new task
export const createTask = async (req: Request, res: Response): Promise<void> => {
  const {
    title,
    description,
    priority,
    status,
    assignedTo,
    startDate,
    dueDate,
    estimatedTime,
    timeSpent,
    tags,
    progress,
    comments,
    isRecurring,
    riskLevel,
  } = req.body;

  try {
    // Check if task limit has been reached
    const result = await pool.query(`SELECT COUNT(*) AS taskCount FROM tasks`);
    const taskCount = result.rows[0].taskcount;

    if (taskCount >= 100) {
      res.status(400).json({ message: 'Task limit of 100 reached.' });
      return;
    }

    // Insert new task
    const insertQuery = `
      INSERT INTO tasks 
      (title, description, priority, status, assigned_to, start_date, due_date, estimated_time, time_spent, tags, progress, comments, is_recurring, risk_level)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING id
    `;
    const values = [
      title,
      description,
      priority,
      status,
      assignedTo,
      startDate,
      dueDate,
      estimatedTime,
      timeSpent,
      tags,
      progress,
      comments,
      isRecurring,
      riskLevel,
    ];

    const insertResult = await pool.query(insertQuery, values);
    res.status(201).json({ id: insertResult.rows[0].id, ...req.body });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Error creating task' });
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response) => {
  const {
    title,
    description,
    priority,
    status,
    assignedTo,
    startDate,
    dueDate,
    estimatedTime,
    timeSpent,
    tags,
    progress,
    comments,
    isRecurring,
    riskLevel,
  } = req.body;
  const { id } = req.params;

  try {
    const updateQuery = `
      UPDATE tasks 
      SET 
        title = $1, 
        description = $2, 
        priority = $3, 
        status = $4, 
        assigned_to = $5, 
        start_date = $6, 
        due_date = $7, 
        estimated_time = $8, 
        time_spent = $9, 
        tags = $10, 
        progress = $11, 
        comments = $12, 
        is_recurring = $13, 
        risk_level = $14 
      WHERE id = $15
    `;
    const values = [
      title,
      description,
      priority,
      status,
      assignedTo,
      startDate,
      dueDate,
      estimatedTime,
      timeSpent,
      tags,
      progress,
      comments,
      isRecurring,
      riskLevel,
      id,
    ];

    await pool.query(updateQuery, values);
    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Error updating task' });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleteQuery = `DELETE FROM tasks WHERE id = $1`;
    await pool.query(deleteQuery, [id]);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task' });
  }
};
