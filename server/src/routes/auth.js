import { Router } from 'express';
import { signin, signup, getToken } from '../controllers/auth.js';
import validateUser from '../middlewares/validateUser.js';
import loggerMiddleware from '../middlewares/logger.js';

const router = Router();

router.post('/sign-in', loggerMiddleware, signin);
router.post('/sign-up', loggerMiddleware, signup);
router.get('/token', validateUser, getToken);

export default router;
