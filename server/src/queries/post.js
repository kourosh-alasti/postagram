import Post from '../models/post.js';
import User from '../models/user.js';
import logger from '../utils/logger.js';

export const createPost = async ({ title, content, username, tags }) => {
  try {
    // create new post
    const newPost = await Post.create({
      title,
      content,
      username,
      tags,
    });

    // update user post count
    await User.findOneAndUpdate({ username }, { $inc: { posts: 1 } });

    // return new post
    return newPost;
  } catch (error) {
    // server side error throw error
    throw new Error(error);
  }
};

export const getPostsByUsername = async ({
  username,
  limit = 10,
  offset = 0,
}) => {
  try {
    // find posts by username
    const fetchedPosts = await Post.find({ username })
      .skip(offset)
      .limit(limit);

    // return posts
    return fetchedPosts;
  } catch (error) {
    logger.error('Error finding posts by username');

    //  server side error throw error
    throw new Error(error);
  }
};

export const getPostsByTag = async ({ tag, limit = 10, offset = 0 }) => {
  try {
    // find posts by tag
    const fetchedPosts = await Post.find({ tags: { $in: [tag] } })
      .skip(offset)
      .limit(limit);

    // return posts
    return fetchedPosts;
  } catch (error) {
    logger.error('Error finding posts by Tag');

    // server side error throw error
    throw new Error(error);
  }
};

export const getPostsForFeed = async ({ username, limit = 10, offset = 0 }) => {
  try {
    // find posts for feed
    const user = await User.findOne({ username });

    // destructure following
    const { following } = user;

    // get usernames of users that user follows
    const userFollows = following.map((u) => {
      const { username: uname } = u;

      return uname;
    });

    // find posts
    const fetchedPosts = await Post.find({
      username: { $in: userFollows },
    })
      .skip(offset)
      .limit(limit);

    // return posts
    return fetchedPosts;
  } catch (error) {
    logger.error('Error occured finding Posts for feed');

    // server side error throw error
    throw new Error(error);
  }
};

export const updateLike = async ({ id, val, username }) => {
  try {
    // update like
    const action =
      val > 0
        ? { $addToSet: { likes: { username } } }
        : { $pull: { likes: { username } } };

    // update post
    const updated = await Post.findOneAndUpdate({ _id: id }, action, {
      new: true,
    });

    // return updated
    return updated;
  } catch (error) {
    logger.error('Error occured while updating likes');

    // server side error throw error
    throw new Error(error);
  }
};

export const getPostsBySearchString = async ({ searchString }) => {
  try {
    // search for posts
    const results = await Post.find({
      $or: [
        { title: { $regex: searchString, $options: 'i' } },
        { content: { $regex: searchString, $options: 'i' } },
        { tags: { $regex: searchString, $options: 'i' } },
      ],
    });

    // return results
    return results;
  } catch (error) {
    logger.error('Error occurred while searching for posts.');

    // server side error throw error
    throw new Error(error);
  }
};

export const deletePostById = async (id) => {
  try {
    // delete post
    const { username } = await Post.findByIdAndDelete(id);

    // update user post count
    await User.findOneAndUpdate(
      { username },
      { $inc: { posts: -1 } },
      { new: true },
    );
  } catch (error) {
    logger.error(`Error occured while deleting post: ${id}`);

    //  server side error throw error
    throw new Error(error);
  }
};
