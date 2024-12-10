import User from '../models/user.js';
import logger from '../utils/logger.js';

export const createUser = async ({ username, password }) => {
  try {
    const newUser = await User.create({ username, password });

    return newUser;
  } catch (error) {
    logger.error('Error occured while creating new user');
    throw new Error(error);
  }
};

export const getUserByUsername = async (username) => {
  try {
    const fetchedUser = await User.findOne({ username });
    return fetchedUser;
  } catch (error) {
    logger.error('Error while getting user');
    throw Error(error);
  }
};

export const getUsers = async (limitBy = 10, offsetBy = 0) => {
  try {
    const users = await User.find().limit(limitBy).skip(offsetBy);

    return users;
  } catch (error) {
    logger.error('Error while getting users');
    throw Error(error);
  }
};

export const addFollow = async ({ username, toFollow }) => {
  try {
    const fetchedUser = await User.updateOne(
      {
        username,
      },
      { $push: { following: { username: toFollow } } },
    );

    return fetchedUser;
  } catch (error) {
    logger.error(`Error while following ${toFollow}`);
    throw new Error(error);
  }
};

export const getFollowing = async ({ username }) => {
  try {
    const fetchedUser = await User.findOne({ username });

    const { following } = fetchedUser;

    return following;
  } catch (error) {
    logger.error('Error while getting following');
    throw new Error(error);
  }
};

export const removeFollow = async ({ username, toUnfollow }) => {
  try {
    const fetchedUser = await User.updateOne(
      { username },
      { $pull: { following: { username: toUnfollow } } },
    );

    return fetchedUser;
  } catch (error) {
    logger.error(`Error while unfollowing ${toUnfollow}`);
    throw new Error(error);
  }
};

export const deleteAllUsers = async () => {
  try {
    await User.deleteMany({});
  } catch (error) {
    logger.error('Error Deleting Users');
    throw new Error(error);
  }
};

export const checkIfFollowing = async ({ username, toFollow }) => {
  try {
    const fetchedUser = await User.findOne({ username });
    const { following } = fetchedUser;

    if (
      following.find((followingUser) => followingUser.username === toFollow)
    ) {
      return true;
    }

    return false;
  } catch (error) {
    logger.error('Error while checking if user is following');
    throw new Error(error);
  }
};
