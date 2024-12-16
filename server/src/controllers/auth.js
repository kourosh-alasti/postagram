import * as passjen from 'passjen';

import { createUser, getUserByUsername } from '../queries/user.js';
import { generateToken } from '../utils/jwt.js';
import logger from '../utils/logger.js';

export const signup = async (req, res) => {
  // Pull Username and Password from Request Body
  const { username, password } = req.body;

  // If no username or password throw 400 code
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: { message: 'Please provide username and password.' } });
  }

  try {
    // Salt and Hash the password
    const { hashedPassword, salt } = await passjen.Hasher.hash(password, 10);

    // Create new User and push to database
    const newUser = await createUser({
      username,
      password: hashedPassword,
      salt,
    });

    // Generate JWT Token using username
    const token = generateToken(newUser.username);

    // Return 200 Code, store JWT in cookie for future auth
    // BUG:
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

    // If server side error throw 500 code
    return res.status(500).json({
      error: { message: 'Something went wrong. Please try again later.' },
    });
  }
};

export const signin = async (req, res) => {
  // Grab username and password from request body
  const { username, password } = req.body;

  // if no username or password throw 400 code
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: { message: 'Please provide username and password.' } });
  }

  try {
    // Check if user exists in Database
    const user = await getUserByUsername(username);

    // If not user throw 404 code
    if (!user) {
      return res
        .status(404)
        .json({ error: { message: 'User does not exist' } });
    }

    // Grab hashedpassword and Stored salt
    const { password: hashedPassword, salt } = user;

    // Check if password matches stored password
    const isValidPassword = await passjen.Hasher.compare({
      password,
      hashedPassword,
      salt,
      saltRounds: 10,
    });

    // If not valid throw 401 error
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ error: { message: 'Invalid username or password.' } });
    }

    // Generate JWT Token from username
    const token = generateToken(username);

    // Return 200 and store JWT in cookie for future auth
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

    // During server side error throw 500 code
    return res.status(500).json({
      error: { message: 'Something went wrong. Please try again later.' },
    });
  }
};

export const getToken = async (req, res) => {
  logger.log('Check if authenticated');
  return res.status(200).json({ isAuthenticated: true });
};
