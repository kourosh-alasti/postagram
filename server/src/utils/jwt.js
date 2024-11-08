import 'dotenv/config';

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || undefined;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '8h';

if (JWT_SECRET === undefined) {
  throw Error('JWT Secret is not defined');
}

export const generateToken = ({ username }) => {
  const token = jwt.sign({ data: username }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  return token;
};

export const verifyToken = ({ token }) => jwt.verify(token, JWT_SECRET, (err, decoded) => {
  if (err) {
    console.log(err);
    return undefined;
  }

  return decoded;
});
