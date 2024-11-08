import { Router } from 'express';
import validateUser from '../middlewares/validateUser.js';
import {
  createNewFollow, getAllUsers, getUser, removeNewFollow,
} from '../controllers/user.js';

const router = Router();

router.get('/', validateUser, getAllUsers);
router.get('/:username', validateUser, getUser);
router.put('/follow/:username', validateUser, createNewFollow);
router.put('/unfollow/:username', validateUser, removeNewFollow);
// router.delete("/:username");
// router.delete("/");

export default router;
