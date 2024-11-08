import { Router } from 'express';
import {
  createNewPost,
  getFeedPosts,
  getPostsBySearch,
  getSelfPosts,
  getUserPostsByUsername,
  updateLikes,
} from '../controllers/post.js';
import validateUser from '../middlewares/validateUser.js';

const router = Router();

router.post('/', validateUser, createNewPost);
router.get('/', validateUser, getFeedPosts);
router.put('/', validateUser, updateLikes);
router.get('/self', validateUser, getSelfPosts);
router.get('/search', validateUser, getPostsBySearch);
router.get('/u/:username', validateUser, getUserPostsByUsername);
// router.get('/tags/:tag');
// router.get('/:postId');
// router.put('/:postId');
// router.delete('/:postId');

export default router;
