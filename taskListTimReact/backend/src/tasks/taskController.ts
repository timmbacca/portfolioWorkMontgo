import { Request, Response } from 'express';
import { pool } from '../db';
import { RowDataPacket, ResultSetHeader } from 'mysql2'; // Import necessary types

// Get all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const [tasks] = await pool.query<RowDataPacket[]>(`SELECT * FROM tasks`);
    res.json(tasks);
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
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS taskCount FROM tasks`
    );
    const taskCount = (rows[0] as { taskCount: number }).taskCount;

    if (taskCount >= 100) {
      res.status(400).json({ message: 'Task limit of 100 reached.' });
      return;
    }

    // Insert new task
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO tasks (title, description, priority, status, assigned_to, start_date, due_date, estimated_time, time_spent, tags, progress, comments, is_recurring, risk_level)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
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
      ]
    );

    // Use the insertId from ResultSetHeader
    res.status(201).json({ id: result.insertId, ...req.body });
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
    await pool.query(
      `UPDATE tasks SET title = ?, description = ?, priority = ?, status = ?, assigned_to = ?, start_date = ?, due_date = ?, estimated_time = ?, time_spent = ?, tags = ?, progress = ?, comments = ?, is_recurring = ?, risk_level = ? WHERE id = ?`,
      [
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
      ]
    );
    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM tasks WHERE id = ?`, [id]);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};
