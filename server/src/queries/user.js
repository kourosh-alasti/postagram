import User from '../models/user.js';

export const createUser = async ({ username, password }) => {
  try {
    const newUser = await User.create({ username, password });

    return newUser;
  } catch (error) {
    console.error('Error occured while creating new user');
    console.error(error);
    throw new Error(error);
  }
};

export const getUserByUsername = async (username) => {
  try {
    const fetchedUser = await User.findOne({ username });
    return fetchedUser;
  } catch (error) {
    console.error('Error while getting user');
    console.error(error);
    throw Error(error);
  }
};

export const getUsers = async (limitBy = 10, offsetBy = 0) => {
  try {
    const users = await User.find().limit(limitBy).skip(offsetBy);

    return users;
  } catch (error) {
    console.error('Error while getting users');
    console.error(error);
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
    console.error(`Error while following ${toFollow}`);
    console.error(error);
    throw new Error(error);
  }
};

export const getFollowing = async ({ username }) => {
  try {
    const fetchedUser = await User.findOne({ username });

    const { following } = fetchedUser;

    return following;
  } catch (error) {
    console.error('Error while getting following');
    console.error(error);
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
    console.error(`Error while unfollowing ${toUnfollow}`);
    console.error(error);
    throw new Error(error);
  }
};

export const deleteAllUsers = async () => {
  try {
    await User.deleteMany({});
  } catch (error) {
    console.error('Error Deleting Users');
    console.error(error);
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
    console.error('Error while checking if user is following');
    console.error(error);
    throw new Error(error);
  }
};
