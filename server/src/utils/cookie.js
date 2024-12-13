const getCookie = (req) => {
  // grab all cookies
  const { cookie } = req.headers;

  // if no cookies []
  if (!cookie) return [];

  // return cookie array
  return cookie.split('; ');
};

export default getCookie;
