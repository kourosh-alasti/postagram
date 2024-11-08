import { Router } from 'express';
import {
  createNewPost,
  getFeedPosts,
  getPostsBySearch,
  updateLikes,
} from '../controllers/post.js';
import validateUser from '../middlewares/validateUser.js';

const router = Router();

router.post('/', validateUser, createNewPost);
router.get('/', validateUser, getFeedPosts);
router.put('/', validateUser, updateLikes);
router.get('/search', validateUser, getPostsBySearch);
// router.get('/u/:username');
// router.get('/tags/:tag');
// router.get('/:postId');
// router.put('/:postId');
// router.delete('/:postId');

export default router;
