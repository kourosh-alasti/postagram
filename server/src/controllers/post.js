import {
  createPost,
  getPostsForFeed,
  updateLike,
  getPostsBySearchString,
  getPostsByUsername,
  deletePostById,
} from '../queries/post.js';
import getCookie from '../utils/cookie.js';
import logger from '../utils/logger.js';

export const createNewPost = async (req, res) => {
  const { title, content, tag } = req.body;
  const username = getCookie(req)
    .find((cookie) => cookie.startsWith('username'))
    .split('=')[1];

  try {
    if (!username) {
      return res.status(401).json({
        error: {
          message: 'Unauthorized to create new post',
          isAuthorized: false,
        },
      });
    }

    if (!title || !content) {
      return res.status(404).json({
        error: {
          message: 'Post Title or Content missing. Please try again!',
        },
      });
    }

    await createPost({
      title,
      content,
      username,
      tags: !tag ? [''] : [tag],
    });

    return res.status(200).json({ message: 'Successfully created your post' });
  } catch (error) {
    logger.error('Error creating new post');
    return res.status(500).json({
      error: {
        message:
          'Something went wrong while creating your post. Please try again later',
      },
    });
  }
};

// export const updateNewPost = async (req, res) => {};

export const getFeedPosts = async (req, res) => {
  const username = getCookie(req)
    .find((cookie) => cookie.startsWith('username'))
    .split('=')[1];

  try {
    if (!username) {
      return res.status(401).json({
        error: {
          message: 'Unauthorized to create new post',
          isAuthorized: false,
        },
      });
    }

    const feedPosts = await getPostsForFeed({ username });

    return res.status(200).json({ posts: feedPosts });
  } catch (error) {
    logger.error('Error occured while getting Feed');
    return res.status(500).json({
      error: {
        message:
          'Something went wrong during feed generation. Please try again later.',
      },
    });
  }
};

export const updateLikes = async (req, res) => {
  const { id: postId, increment: toIncrement } = req.body;
  const username = getCookie(req)
    .find((cookie) => cookie.startsWith('username'))
    .split('=')[1];

  try {
    if (!username) {
      return res.status(401).json({
        error: {
          message: 'Unauthorized to create new post',
          isAuthorized: false,
        },
      });
    }

    if (!postId) {
      return res.status(404).json({
        error: { message: 'A PostID is mandatory to like or dislike' },
      });
    }

    if (toIncrement) {
      await updateLike({ id: postId, val: 1, username });
    } else {
      await updateLike({ id: postId, val: -1, username });
    }

    return res.status(200).json({ message: 'Updated like successfully' });
  } catch (error) {
    logger.error('Unexpected error occured while updated post like count');
    return res.status(500).json({
      error: {
        message:
          'Error took place while updating your like status. Please try again later',
      },
    });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { string } = req.query;

  try {
    if (!string) {
      return res.status(200).json({ results: [] });
    }

    const results = await getPostsBySearchString({ searchString: string });

    return res.status(200).json({ results });
  } catch (error) {
    logger.error('Error occured while searching for posts');
    return res.status(500).json({
      error: { message: 'An error occured while searching for posts' },
    });
  }
};

export const getSelfPosts = async (req, res) => {
  const username = getCookie(req)
    .find((cookie) => cookie.startsWith('username'))
    .split('=')[1];

  try {
    if (!username) {
      return res.status(401).json({
        error: {
          message: 'Unauthorized to create new post',
          isAuthorized: false,
        },
      });
    }

    const posts = await getPostsByUsername({ username });

    return res.status(200).json({ posts });
  } catch (error) {
    logger.error('Unexpected error occured while trying to fetch your posts');
    return res.status(500).json({
      error: {
        message:
          'An unexpected error occured while tryingto fetch your posts. Please try again later.',
      },
    });
  }
};

export const getUserPostsByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    if (!username) {
      return res.status(404).json({ error: { message: 'Must be a profile' } });
    }

    const posts = await getPostsByUsername({ username });

    return res.status(200).json({ posts });
  } catch (error) {
    logger.error('Unexpected error occured while trying to fetch your posts');
    return res.status(500).json({
      error: {
        message:
          'An unexpected error occured while tryingto fetch your posts. Please try again later.',
      },
    });
  }
};

export const deleteUserPostById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(404).json({ error: { message: 'Must be a valid ID' } });
    }

    await deletePostById(id);

    return res.status(200).json({ message: 'Successfully delete Post' });
  } catch (error) {
    logger.error('Unexpected error occured while trying to delete your post');
    return res.status(500).json({
      error: {
        message:
          'An unexpected error occured while trying to delete your post. Please try again later.',
      },
    });
  }
};
