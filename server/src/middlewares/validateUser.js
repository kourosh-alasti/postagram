import getCookie from '../utils/cookie.js';
import { verifyToken } from '../utils/jwt.js';

const validateUser = async (req, res, next) => {
  const cookies = getCookie(req);
  const fullToken = cookies.find((cookie) => cookie.startsWith('postagramToken'));

  if (!fullToken) {
    return res.status(401).json({ message: 'You are not authorized to access this resource.' });
  }

  const token = fullToken.split('=')[1];

  const verified = verifyToken({ token });

  if (verified === undefined) {
    return res.status(401).json({ message: 'Token expired, please login again' });
  }

  return next();
};

export default validateUser;
