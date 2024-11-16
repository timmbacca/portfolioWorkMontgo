// src/tasks/taskRoutes.ts
import { Router } from 'express';
import { getAllTasks, createTask, updateTask, deleteTask } from './taskController';

const router = Router();

router.get('/', getAllTasks);           // GET /tasks
router.post('/', createTask);            // POST /tasks
router.put('/:id', updateTask);          // PUT /tasks/:id
router.delete('/:id', deleteTask);       // DELETE /tasks/:id

export default router;
