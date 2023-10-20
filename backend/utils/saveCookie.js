const saveCookie = (token, res) => {
  res.cookie("token", token, {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    httpOnly: false,
    secure: false,
    sameSite: "none",
  });
};

module.exports = saveCookie;
