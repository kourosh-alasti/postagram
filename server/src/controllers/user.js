/* eslint-disable no-underscore-dangle */
import {
  getUserByUsername,
  getUsers,
  addFollow,
  removeFollow,
  getFollowing,
  checkIfFollowing,
} from '../queries/user.js';
import getCookie from '../utils/cookie.js';
import logger from '../utils/logger.js';

export const getUser = async (req, res) => {
  // grab username from params
  const { username } = req.params;

  try {
    //  if no username
    if (!username) {
      // throw 404 code
      return res
        .status(404)
        .json({ error: { message: 'Username is required.' } });
    }

    // get user
    const user = await getUserByUsername(username);

    // if no user
    if (!user) {
      // throw 404 code
      return res.status(404).json({ error: { message: 'User not found.' } });
    }

    // destructure password and return user
    const { password, ...rest } = user;

    // return user and throw 200 code
    return res.status(200).json({ user: rest });
  } catch (error) {
    logger.error('Something went wrong while fetching user');

    // server side error throw 500 code
    return res.status(500).json({
      error: { message: 'Something went wrong. Please try again later.' },
    });
  }
};

export const getSelf = async (req, res) => {
  // grab username from cookie
  const username = getCookie(req)
    .find((cookie) => cookie.startsWith('username'))
    .split('=')[1];

  try {
    //  if no username
    if (!username) {
      //  throw 404 code
      return res.status(404).json({
        error: { message: 'Username is required.', isAuthenticated: false },
      });
    }

    // get user by username
    const result = await getUserByUsername(username);
    // destructure password
    const { password, ...user } = result._doc;

    // return user and throw 200 code
    return res.status(200).json({ user });
  } catch (error) {
    logger.error('Unexpected error while trying to fetch your information');

    // server side error throw 500 code
    return res.status(500).json({
      error: {
        message:
          'Error occured while fetching your data. Please try again later',
      },
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // get all users
    const users = await getUsers();

    // return all users and throw 200 code
    return res.status(200).json({ users });
  } catch (error) {
    logger.error('Something went wrong while fetching users');

    // server side error throw 500 code
    return res.status(500).json({
      error: { message: 'Something went wrong. Please try again later.' },
    });
  }
};

export const getMyFollowing = async (req, res) => {
  // grab username from cookie
  const username = getCookie(req)
    .find((cookie) => cookie.startsWith('username'))
    .split('=')[1];

  try {
    //  if no username
    if (!username) {
      //  throw 404 code
      return res.status(404).json({
        error: { message: 'Username is required.', isAuthenticated: false },
      });
    }

    // get all users that user is following
    const fetchedFollowing = await getFollowing({ username });

    // if no following
    if (fetchedFollowing.length === 0) {
      // return empty array and throw 204 code
      return res.status(204).json({ following: [] });
    }

    // destructure followingSince and username
    const following = await Promise.all(
      fetchedFollowing.map(async (user) => ({
        followingSince: user.followingSince,
        username: user.username,
      })),
    );

    // return following and throw 200 code
    return res.status(200).json({ following: [...following] });
  } catch (error) {
    logger.error('Something went wrong while fetching following');

    // server side error throw 500 code
    return res.status(500).json({
      error: { message: 'Something went wrong. Please try again later.' },
    });
  }
};

export const createNewFollow = async (req, res) => {
  // grab username to follow from params
  const { username: toFollow } = req.params;
  // grab username from cookie
  const username = getCookie(req)
    .find((cookie) => cookie.startsWith('username'))
    .split('=')[1];

  try {
    //  if no username or user to follow
    if (!toFollow || !username) {
      //  throw 400 code
      return res.status(400).json({
        error: { message: 'Please provide username and userto follow.' },
      });
    }

    // check if user is already following
    const followExists = await checkIfFollowing({ username, toFollow });

    // if user is already following
    if (followExists) {
      //  throw 401 code
      return res
        .status(401)
        .json({ error: { message: 'User is already following.' } });
    }

    // add user to following
    const user = await addFollow({ username, toFollow });

    // return user and throw 200 code
    return res.status(200).json(user);
  } catch (error) {
    logger.error('Something went wrong while following');

    // server side error throw 500 code
    return res.status(500).json({
      error: { message: 'Something went wrong. Please try again later.' },
    });
  }
};

export const removeNewFollow = async (req, res) => {
  // grab username to unfollow from params
  const { username: toUnfollow } = req.params;
  // grab username from cookie
  const username = getCookie(req)
    .find((cookie) => cookie.startsWith('username'))
    .split('=')[1];

  try {
    // if no username or user to unfollow
    if (!toUnfollow || !username) {
      // throw 400 code
      return res.status(400).json({
        error: { message: 'Please provide username and user to unfollow.' },
      });
    }

    // remove user from following
    const user = await removeFollow({ username, toUnfollow });

    // return user and throw 200 code
    return res.status(200).json(user);
  } catch (error) {
    logger.error('Something went wrong while unfollowing');

    // server side error throw 500 code
    return res.status(500).json({
      error: { message: 'Something went wrong. Please try again later.' },
    });
  }
};
