const saveCookie = (token, res, days = 5) => {
  res.cookie("token", token, {
    httpOnly: false,
    expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
    sameSite: "None",
    secure,
  });
};

module.exports = saveCookie;
