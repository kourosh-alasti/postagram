import { Router } from 'express';
import { signin, signup, getToken } from '../controllers/auth.js';
import validateUser from '../middlewares/validateUser.js';

const router = Router();

router.post('/sign-in', signin);
router.post('/sign-up', signup);
router.get('/token', validateUser, getToken);

export default router;
