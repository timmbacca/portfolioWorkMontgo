// src/tasks/taskController.ts

import { Request, Response } from 'express';
import { pool } from '../db';
import { ResultSetHeader } from 'mysql2';  // Import ResultSetHeader


// Get all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const [tasks] = await pool.query(`SELECT * FROM tasks`);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tasks' });
  }
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
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
    riskLevel
  } = req.body;

  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO tasks (title, description, priority, status, assigned_to, start_date, due_date, estimated_time, time_spent, tags, progress, comments, is_recurring, risk_level)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, priority, status, assignedTo, startDate, dueDate, estimatedTime, timeSpent, tags, progress, comments, isRecurring, riskLevel]
    );

    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ message: 'Error adding task' });
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
    riskLevel
  } = req.body;
  const { id } = req.params;

  try {
    await pool.query(
      `UPDATE tasks SET title = ?, description = ?, priority = ?, status = ?, assigned_to = ?, start_date = ?, due_date = ?, estimated_time = ?, time_spent = ?, tags = ?, progress = ?, comments = ?, is_recurring = ?, risk_level = ? WHERE id = ?`,
      [title, description, priority, status, assignedTo, startDate, dueDate, estimatedTime, timeSpent, tags, progress, comments, isRecurring, riskLevel, id]
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