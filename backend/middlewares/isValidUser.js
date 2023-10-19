const { connection } = require("../db");

const isValidUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(400).json({
      error: true,
      message: "User is not Logged in",
    });
  const jwt = require("jsonwebtoken");
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  connection.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
    if (err || !result[0])
      return res.status(400).json({
        error: true,
        message: "User is not Logged in",
      });
    req.id = result[0].id;
    next();
  });
};

module.exports = isValidUser;
