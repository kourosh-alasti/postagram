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
  // Grab post title content and tag from request body
  const { title, content, tag } = req.body;

  // Grab user username from stored cookie
  const username = getCookie(req)
    .find((cookie) => cookie.startsWith('username'))
    .split('=')[1];

  try {
    // if no username cookie, user is not logged in
    if (!username) {
      // throw 401 Code
      return res.status(401).json({
        error: {
          message: 'Unauthorized to create new post',
          isAuthorized: false,
        },
      });
    }

    // if not title or content
    if (!title || !content) {
      // throw 400 code
      return res.status(400).json({
        error: {
          message: 'Post Title or Content missing. Please try again!',
        },
      });
    }

    // Create new Post and push to Database
    await createPost({
      title,
      content,
      username,
      tags: !tag ? [''] : [tag],
    });

    // return 200 code
    return res.status(200).json({ message: 'Successfully created your post' });
  } catch (error) {
    logger.error('Error creating new post');

    // server side error throw 500 code
    return res.status(500).json({
      error: {
        message:
          'Something went wrong while creating your post. Please try again later',
      },
    });
  }
};

export const getFeedPosts = async (req, res) => {
  // grab username from cookie
  const username = getCookie(req)
    .find((cookie) => cookie.startsWith('username'))
    .split('=')[1];

  try {
    // if no username cookie
    if (!username) {
      // throw 401 code
      return res.status(401).json({
        error: {
          message: 'Unauthorized to create new post',
          isAuthorized: false,
        },
      });
    }

    // get feed posts for user
    const feedPosts = await getPostsForFeed({ username });

    // return posts and 200 code
    return res.status(200).json({ posts: feedPosts });
  } catch (error) {
    logger.error('Error occured while getting Feed');

    // server side error throw 500 code
    return res.status(500).json({
      error: {
        message:
          'Something went wrong during feed generation. Please try again later.',
      },
    });
  }
};

export const updateLikes = async (req, res) => {
  // grab post id and increment from request body
  const { id: postId, increment: toIncrement } = req.body;
  // grab username from cookie
  const username = getCookie(req)
    .find((cookie) => cookie.startsWith('username'))
    .split('=')[1];

  try {
    // if no username cookie
    if (!username) {
      //  throw 401 code
      return res.status(401).json({
        error: {
          message: 'Unauthorized to create new post',
          isAuthorized: false,
        },
      });
    }

    // if no post id
    if (!postId) {
      // throw 401 code
      return res.status(401).json({
        error: { message: 'A PostID is mandatory to like or dislike' },
      });
    }

    // like or unlike post
    if (toIncrement) {
      await updateLike({ id: postId, val: 1, username });
    } else {
      await updateLike({ id: postId, val: -1, username });
    }

    // return 200 code
    return res.status(200).json({ message: 'Updated like successfully' });
  } catch (error) {
    logger.error('Unexpected error occured while updated post like count');

    // server side error throw 500 code
    return res.status(500).json({
      error: {
        message:
          'Error took place while updating your like status. Please try again later',
      },
    });
  }
};

export const getPostsBySearch = async (req, res) => {
  // grab search string from query
  const { string } = req.query;

  try {
    //  if no search string
    if (!string) {
      // return no results and throw 200 code
      return res.status(200).json({ results: [] });
    }

    // search for posts using search string
    const results = await getPostsBySearchString({ searchString: string });

    // return results and throw 200 code
    return res.status(200).json({ results });
  } catch (error) {
    logger.error('Error occured while searching for posts');

    // server side error throw 500 code
    return res.status(500).json({
      error: { message: 'An error occured while searching for posts' },
    });
  }
};

export const getSelfPosts = async (req, res) => {
  // grab username from cookie
  const username = getCookie(req)
    .find((cookie) => cookie.startsWith('username'))
    .split('=')[1];

  try {
    // if no username cookie
    if (!username) {
      // throw 401 code
      return res.status(401).json({
        error: {
          message: 'Unauthorized to create new post',
          isAuthorized: false,
        },
      });
    }

    // get users posts
    const posts = await getPostsByUsername({ username });

    // return posts and throw 200 code
    return res.status(200).json({ posts });
  } catch (error) {
    logger.error('Unexpected error occured while trying to fetch your posts');

    // server side error throw 500 code
    return res.status(500).json({
      error: {
        message:
          'An unexpected error occured while tryingto fetch your posts. Please try again later.',
      },
    });
  }
};

export const getUserPostsByUsername = async (req, res) => {
  // grab username from params
  const { username } = req.params;

  try {
    //  if no username
    if (!username) {
      // throw 404 code
      return res.status(404).json({ error: { message: 'Must be a profile' } });
    }

    // get posts for username
    const posts = await getPostsByUsername({ username });

    //  return posts and throw 200 code
    return res.status(200).json({ posts });
  } catch (error) {
    logger.error('Unexpected error occured while trying to fetch your posts');

    // server side error throw 500 code
    return res.status(500).json({
      error: {
        message:
          'An unexpected error occured while tryingto fetch your posts. Please try again later.',
      },
    });
  }
};

export const deleteUserPostById = async (req, res) => {
  // grab post id
  const { id } = req.params;

  try {
    // if no post id
    if (!id) {
      // throw 404 code
      return res.status(404).json({ error: { message: 'Must be a valid ID' } });
    }

    //  delete post
    await deletePostById(id);

    //  return message and throw 200 code
    return res.status(200).json({ message: 'Successfully delete Post' });
  } catch (error) {
    logger.error('Unexpected error occured while trying to delete your post');

    // server side error throw 500 code
    return res.status(500).json({
      error: {
        message:
          'An unexpected error occured while trying to delete your post. Please try again later.',
      },
    });
  }
};
