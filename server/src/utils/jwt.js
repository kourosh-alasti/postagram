import 'dotenv/config';

import jwt from 'jsonwebtoken';

import logger from './logger.js';

const JWT_SECRET = process.env.JWT_SECRET || undefined;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '8h';

// If no JWT secret end server
if (JWT_SECRET === undefined) {
  logger.error('JWT Secret is not defined');
  process.exit(1);
}

export const generateToken = ({ username }) => {
  // create token from username
  const token = jwt.sign({ data: username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });

  // return token
  return token;
};

export const verifyToken = ({ token }) => {
  // verifiy token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      logger.error('Failed to verify JWT Token');
      return undefined;
    }
    return decoded;
  });
};
