const saveCookie = (token, res) => {
  res.cookie("token", token, {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

module.exports = saveCookie;
