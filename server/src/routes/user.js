import { Router } from 'express';
import validateUser from '../middlewares/validateUser.js';
import {
  createNewFollow,
  getAllUsers,
  getUser,
  removeNewFollow,
  getMyFollowing,
} from '../controllers/user.js';

const router = Router();

router.get('/', validateUser, getAllUsers);
router.get('/following', validateUser, getMyFollowing);
router.put('/follow/:username', validateUser, createNewFollow);
router.put('/unfollow/:username', validateUser, removeNewFollow);
router.get('/:username', validateUser, getUser);
// router.delete("/:username");
// router.delete("/");

export default router;
