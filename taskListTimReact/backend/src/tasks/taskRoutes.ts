import { Router } from 'express';
import { getAllTasks, createTask, updateTask, deleteTask } from './taskController';

const router = Router();

router.get('/', getAllTasks); // Maps to GET /tasks
router.post('/', createTask); // Maps to POST /tasks
router.put('/:id', updateTask); // Maps to PUT /tasks/:id
router.delete('/:id', deleteTask); // Maps to DELETE /tasks/:id

export default router;
