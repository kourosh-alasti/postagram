const getCookie = (req) => {
  const { cookie } = req.headers;

  if(!cookie) return [];

  return cookie.split('; ');
};

export default getCookie;
