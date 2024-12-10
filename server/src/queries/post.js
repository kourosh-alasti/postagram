import Post from '../models/post.js';
import User from '../models/user.js';
import logger from '../utils/logger.js';

export const createPost = async ({ title, content, username, tags }) => {
  try {
    const newPost = await Post.create({
      title,
      content,
      username,
      tags,
    });

    await User.findOneAndUpdate({ username }, { $inc: { posts: 1 } });

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPostsByUsername = async ({
  username,
  limit = 10,
  offset = 0,
}) => {
  try {
    const fetchedPosts = await Post.find({ username })
      .skip(offset)
      .limit(limit);

    return fetchedPosts;
  } catch (error) {
    logger.error('Error finding posts by username');
    throw new Error(error);
  }
};

export const getPostsByTag = async ({ tag, limit = 10, offset = 0 }) => {
  try {
    const fetchedPosts = await Post.find({ tags: { $in: [tag] } })
      .skip(offset)
      .limit(limit);

    return fetchedPosts;
  } catch (error) {
    logger.error('Error finding posts by Tag');
    throw new Error(error);
  }
};

export const getPostsForFeed = async ({ username, limit = 10, offset = 0 }) => {
  try {
    const user = await User.findOne({ username });

    const { following } = user;

    const userFollows = following.map((u) => {
      const { username: uname } = u;

      return uname;
    });

    const fetchedPosts = await Post.find({
      username: { $in: userFollows },
    })
      .skip(offset)
      .limit(limit);

    return fetchedPosts;
  } catch (error) {
    logger.error('Error occured finding Posts for feed');
    throw new Error(error);
  }
};

export const updateLike = async ({ id, val, username }) => {
  try {
    const action =
      val > 0
        ? { $addToSet: { likes: { username } } }
        : { $pull: { likes: { username } } };

    const updated = await Post.findOneAndUpdate({ _id: id }, action, {
      new: true,
    });

    return updated;
  } catch (error) {
    logger.error('Error occured while updating likes');
    throw new Error(error);
  }
};

export const getPostsBySearchString = async ({ searchString }) => {
  try {
    const results = await Post.find({
      $or: [
        { title: { $regex: searchString, $options: 'i' } },
        { content: { $regex: searchString, $options: 'i' } },
        { tags: { $regex: searchString, $options: 'i' } },
      ],
    });

    return results;
  } catch (error) {
    logger.error('Error occurred while searching for posts.');
    throw new Error(error);
  }
};

export const deletePostById = async (id) => {
  try {
    const { username } = await Post.findByIdAndDelete(id);

    await User.findOneAndUpdate(
      { username },
      { $inc: { posts: -1 } },
      { new: true },
    );
  } catch (error) {
    logger.error(`Error occured while deleting post: ${id}`);
    throw new Error(error);
  }
};

export const deleteAllPosts = async () => {
  try {
    const res = await Post.deleteMany({});
    return res;
  } catch (error) {
    logger.error('Error while deleting all posts');
    throw new Error(error);
  }
};
