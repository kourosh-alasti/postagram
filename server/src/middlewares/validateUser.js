import getCookie from '../utils/cookie.js';
import { verifyToken } from '../utils/jwt.js';

const validateUser = async (req, res, next) => {
  const cookies = getCookie(req);

  if (cookies.length === 0) {
    return res.status(401).json({
      message: 'You are not authorized to access this resource.',
      isAuthenticated: false,
    });
  }

  // find token
  const fullToken = cookies.find(
    (cookie) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      cookie.startsWith('postagramToken'),
    // eslint-disable-next-line function-paren-newline
  );

  // if no token
  if (!fullToken) {
    // throw 401 code
    return res.status(401).json({
      message: 'You are not authorized to access this resource.',
      isAuthenticated: false,
    });
  }

  // grab token
  const token = fullToken.split('=')[1];

  // verify token
  const verified = verifyToken({ token });

  // if token expired
  if (verified === undefined) {
    // throw 401 code
    return res.status(401).json({
      message: 'Token expired, please login again',
      isAuthenticated: false,
    });
  }

  return next();
};

export default validateUser;
