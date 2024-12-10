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
  const { username } = req.params;

  try {
    if (!username) {
      return res
        .status(404)
        .json({ error: { message: 'Username is required.' } });
    }

    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ error: { message: 'User not found.' } });
    }

    const { password, ...rest } = user;

    return res.status(200).json({ user: rest });
  } catch (error) {
    logger.error('Something went wrong while fetching user');

    return res.status(500).json({
      error: { message: 'Something went wrong. Please try again later.' },
    });
  }
};

export const getSelf = async (req, res) => {
  const username = getCookie(req)
    .find((cookie) => cookie.startsWith('username'))
    .split('=')[1];

  try {
    if (!username) {
      return res.status(404).json({
        error: { message: 'Username is required.', isAuthenticated: false },
      });
    }

    const result = await getUserByUsername(username);
    const { password, ...user } = result._doc;

    return res.status(200).json({ user });
  } catch (error) {
    logger.error('Unexpected error while trying to fetch your information');
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
    const users = await getUsers();

    return res.status(200).json({ users });
  } catch (error) {
    logger.error('Something went wrong while fetching users');

    return res.status(500).json({
      error: { message: 'Something went wrong. Please try again later.' },
    });
  }
};

export const getMyFollowing = async (req, res) => {
  const username = getCookie(req)
    .find((cookie) => cookie.startsWith('username'))
    .split('=')[1];

  try {
    if (!username) {
      return res.status(404).json({
        error: { message: 'Username is required.', isAuthenticated: false },
      });
    }

    const fetchedFollowing = await getFollowing({ username });

    if (fetchedFollowing.length === 0) {
      return res.status(204).json({ following: [] });
    }

    const following = await Promise.all(
      fetchedFollowing.map(async (user) => ({
        followingSince: user.followingSince,
        username: user.username,
      })),
    );

    return res.status(200).json({ following });
  } catch (error) {
    logger.error('Something went wrong while fetching following');
    return res.status(500).json({
      error: { message: 'Something went wrong. Please try again later.' },
    });
  }
};

export const createNewFollow = async (req, res) => {
  const { username: toFollow } = req.params;
  const username = getCookie(req)
    .find((cookie) => cookie.startsWith('username'))
    .split('=')[1];

  try {
    if (!toFollow || !username) {
      return res.status(400).json({
        error: { message: 'Please provide username and userto follow.' },
      });
    }

    const followExists = await checkIfFollowing({ username, toFollow });

    if (followExists) {
      return res
        .status(400)
        .json({ error: { message: 'User is already following.' } });
    }

    const user = await addFollow({ username, toFollow });
    logger.log('Successfully Followed');

    return res.status(200).json(user);
  } catch (error) {
    logger.error('Something went wrong while following');

    return res.status(500).json({
      error: { message: 'Something went wrong. Please try again later.' },
    });
  }
};

export const removeNewFollow = async (req, res) => {
  const { username: toUnfollow } = req.params;
  const username = getCookie(req)
    .find((cookie) => cookie.startsWith('username'))
    .split('=')[1];

  try {
    if (!toUnfollow || !username) {
      return res.status(400).json({
        error: { message: 'Please provide username and user to unfollow.' },
      });
    }

    const user = await removeFollow({ username, toUnfollow });

    return res.status(200).json(user);
  } catch (error) {
    logger.error('Something went wrong while unfollowing');

    return res.status(500).json({
      error: { message: 'Something went wrong. Please try again later.' },
    });
  }
};
