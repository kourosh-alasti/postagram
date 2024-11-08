import * as bcrypt from 'bcrypt';

import { createUser, getUserByUsername } from '../queries/user.js';
import { generateToken } from '../utils/jwt.js';

export const signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({ username, password: hashedPassword });
    // console.debug(newUser);

    const token = generateToken(newUser.username);

    return res.status(200).cookie('postagramToken', token, { signed: true }).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Something went wrong during signup');
    console.error(error);

    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};

export const signin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password.' });
  }

  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user[0].password;

    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      return res.status(404).json({ message: 'Invalid username or password.' });
    }

    const token = generateToken(username);
    return res.status(200).cookie('postagramToken', token).cookie('username', username).json({ message: 'User signed in successfully' });
  } catch (error) {
    console.error('Something went wrong during signin');
    console.error(error);

    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};
