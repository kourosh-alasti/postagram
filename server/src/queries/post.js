import Post from '../models/post.js';
import User from '../models/user.js';

export const createPost = async ({
  title, content, username, tags,
}) => {
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
    console.error('Error Creating Post');
    console.error(error);
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
    console.error('Error finding posts by username');
    console.error(error);
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
    console.error('Error finding posts by Tag');
    console.error(error);
    throw new Error(error);
  }
};

export const getPostsForFeed = async ({ username, limit = 10, offset = 0 }) => {
  try {
    const user = await User.findOne({ username });
    const userFollows = await user.following;

    const fetchedPosts = await Post.find({
      username: { $in: userFollows.username },
    })
      .skip(offset)
      .limit(limit);

    return fetchedPosts;
  } catch (error) {
    console.error('Error occured finding Posts for feed');
    console.error(error);
    throw new Error(error);
  }
};

// TODO: Add Put Queries

export const deletePostById = async (id) => {
  try {
    const res = await Post.findByIdAndDelete(id);
    return res;
  } catch (error) {
    console.error(`Error occured while deleting post: ${id}`);
    console.error(error);
    throw new Error(error);
  }
};

export const deleteAllPosts = async () => {
  try {
    const res = await Post.deleteMany({});
    return res;
  } catch (error) {
    console.error('Error while deleting all posts');
    console.error(error);
    throw new Error(error);
  }
};
