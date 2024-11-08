import { Router } from 'express';
import { signin, signup } from '../controllers/auth.js';

const router = Router();

router.get('/sign-in', signin);
router.post('/sign-up', signup);

export default router;
