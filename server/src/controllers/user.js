import {
  getUserByUsername, getUsers, addFollow, removeFollow,
} from '../queries/user.js';
import getCookie from '../utils/cookie.js';

export const getUser = async (req, res) => {
  const { username } = req.params;

  try {
    if (!username) {
      return res.status(404).json({ message: 'Username is required.' });
    }

    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const { password, ...rest } = user[0]._doc;

    return res.status(200).json(rest);
  } catch (error) {
    console.error('Something went wrong while fetching user');
    console.error(error);

    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.error('Something went wrong while fetching users');
    console.error(error);

    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};

export const createNewFollow = async (req, res) => {
  const { username: toFollow } = req.params;
  const username = getCookie(req).find((cookie) => cookie.startsWith('username')).split('=')[1];

  console.log(toFollow, username);

  try {
    if (!toFollow || !username) {
      return res.status(400).json({ message: 'Please provide username and userto follow.' });
    }

    const user = await addFollow({ username, toFollow });

    return res.status(200).json(user);
  } catch (error) {
    console.error('Something went wrong while following');
    console.error(error);

    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};

export const removeNewFollow = async (req, res) => {
  const { username: toUnfollow } = req.params;
  const username = getCookie(req).find((cookie) => cookie.startsWith('username')).split('=')[1];

  try {
    if (!toUnfollow || !username) {
      return res.status(400).json({ message: 'Please provide username and user to unfollow.' });
    }

    const user = await removeFollow({ username, toUnfollow });

    return res.status(200).json(user);
  } catch (error) {
    console.error('Something went wrong while unfollowing');
    console.error(error);

    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};
