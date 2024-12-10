import * as bcrypt from 'bcrypt';

import { createUser, getUserByUsername } from '../queries/user.js';
import { generateToken } from '../utils/jwt.js';
import logger from '../utils/logger.js';

export const signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: { message: 'Please provide username and password.' } });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({ username, password: hashedPassword });

    const token = generateToken(newUser.username);

    return res
      .status(200)
      .cookie('postagramToken', token, {
        httpOnly: false,
        secure: true,
        sameSite: 'none',
        path: '/',
        domain: 'localhost',
      })
      .cookie('username', username)
      .json({ message: 'User created successfully' });
  } catch (error) {
    logger.error('Something went wrong during signup');

    return res.status(500).json({
      error: { message: 'Something went wrong. Please try again later.' },
    });
  }
};

export const signin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: { message: 'Please provide username and password.' } });
  }

  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;

    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      return res
        .status(404)
        .json({ error: { message: 'Invalid username or password.' } });
    }

    const token = generateToken(username);
    return res
      .status(200)
      .cookie('postagramToken', token, {
        httpOnly: false,
        secure: true,
        sameSite: 'none',
        path: '/',
        domain: 'localhost',
      })
      .cookie('username', username)
      .json({ message: 'User signed in successfully' });
  } catch (error) {
    logger.error('Something went wrong during signin');

    return res.status(500).json({
      error: { message: 'Something went wrong. Please try again later.' },
    });
  }
};

export const getToken = async (req, res) => {
  logger.log('Check if authenticated');
  return res.status(200).json({ isAuthenticated: true });
};
