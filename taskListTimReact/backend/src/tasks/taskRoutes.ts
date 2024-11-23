import { Router } from 'express';
import { getAllTasks, createTask, updateTask, deleteTask } from './taskController';

const router = Router();

router.get('/tasks', getAllTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;
