import { Router } from 'express';
import { signin, signup, getToken } from '../controllers/auth.js';
import validateUser from '../middlewares/validateUser.js';
import loggerMiddleware from '../middlewares/logger.js';

const router = Router();

// api/auth/sign-in
router.post('/sign-in', loggerMiddleware, signin);
// api/auth/sign-up
router.post('/sign-up', loggerMiddleware, signup);
// api/auth/token
router.get('/token', validateUser, getToken);

export default router;
