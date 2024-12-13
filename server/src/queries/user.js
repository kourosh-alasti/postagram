import User from '../models/user.js';
import logger from '../utils/logger.js';

export const createUser = async ({ username, password, salt }) => {
  try {
    // Crete new user with username, password and salt
    const newUser = await User.create({ username, password, salt });

    // return new user data
    return newUser;
  } catch (error) {
    logger.error('Error occured while creating new user');

    // throw error on create error
    throw new Error(error);
  }
};

export const getUserByUsername = async (username) => {
  try {
    // get user information with username
    const fetchedUser = await User.findOne({ username });

    //  return user
    return fetchedUser;
  } catch (error) {
    logger.error('Error while getting user');

    // throw error on fetch error
    throw Error(error);
  }
};

export const getUsers = async (limitBy = 10, offsetBy = 0) => {
  try {
    // get all users with limit and offset
    const users = await User.find().limit(limitBy).skip(offsetBy);

    // return users
    return users;
  } catch (error) {
    logger.error('Error while getting users');

    // error on fetch error
    throw Error(error);
  }
};

export const addFollow = async ({ username, toFollow }) => {
  try {
    // update user and increment following
    const fetchedUser = await User.updateOne(
      {
        username,
      },
      { $push: { following: { username: toFollow } } },
    );

    // return user
    return fetchedUser;
  } catch (error) {
    logger.error(`Error while following ${toFollow}`);

    // error on update error
    throw new Error(error);
  }
};

export const getFollowing = async ({ username }) => {
  try {
    // get user by username
    const fetchedUser = await User.findOne({ username });

    // grab a list of users that user is following
    const { following } = fetchedUser;

    return following;
  } catch (error) {
    logger.error('Error while getting following');

    // throw error on fetch
    throw new Error(error);
  }
};

export const removeFollow = async ({ username, toUnfollow }) => {
  try {
    // update user and decrement following
    const fetchedUser = await User.updateOne(
      { username },
      { $pull: { following: { username: toUnfollow } } },
    );

    // return user data
    return fetchedUser;
  } catch (error) {
    logger.error(`Error while unfollowing ${toUnfollow}`);

    // throw error on update
    throw new Error(error);
  }
};

export const checkIfFollowing = async ({ username, toFollow }) => {
  try {
    // get user info by username
    const fetchedUser = await User.findOne({ username });

    // grab all users that are followed
    const { following } = fetchedUser;

    // check if user is following
    if (
      following.find((followingUser) => followingUser.username === toFollow)
    ) {
      return true;
    }

    return false;
  } catch (error) {
    logger.error('Error while checking if user is following');

    // error on fetch error
    throw new Error(error);
  }
};
