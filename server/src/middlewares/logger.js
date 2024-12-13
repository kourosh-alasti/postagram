import logger from '../utils/logger.js';

const loggerMiddleware = async (req, res, next) => {
  // Log every request
  logger.info(`[${req.method}] Request sent to ${req.url}`);

  next();
};

export default loggerMiddleware;
