const loggerMiddleware = async (req, res, next) => {
  next();
};

export default loggerMiddleware;
