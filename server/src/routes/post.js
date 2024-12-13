import { Router } from 'express';
import {
  createNewPost,
  getFeedPosts,
  getPostsBySearch,
  getSelfPosts,
  getUserPostsByUsername,
  updateLikes,
  deleteUserPostById,
} from '../controllers/post.js';
import validateUser from '../middlewares/validateUser.js';

const router = Router();

// api/post/
router.put('/', validateUser, updateLikes);
router.get('/', validateUser, getFeedPosts);
router.post('/', validateUser, createNewPost);
// api/post/self
router.get('/self', validateUser, getSelfPosts);
// api/post/search
router.get('/search', validateUser, getPostsBySearch);
// api/post/u/:username
router.get('/u/:username', validateUser, getUserPostsByUsername);
// api/post/:id
router.delete('/:id', validateUser, deleteUserPostById);

export default router;
