const getCookie = (req) => {
  const { cookie } = req.headers;

  return cookie.split('; ');
};

export default getCookie;
