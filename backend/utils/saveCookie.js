const saveCookie = (token, res, days = 5) => {
  res.cookie("token", token, {
    expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

module.exports = saveCookie;
