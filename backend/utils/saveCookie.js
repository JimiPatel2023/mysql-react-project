const saveCookie = (token, res) => {
  res.cookie("token", token, {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    domain: "td-frontend-beta.vercel.app",
  });
};

module.exports = saveCookie;
