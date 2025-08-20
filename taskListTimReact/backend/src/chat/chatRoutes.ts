import { Router } from 'express';
import { handleChatMessage } from './chatController';

const router = Router();

router.post('/', handleChatMessage);

export default router;
