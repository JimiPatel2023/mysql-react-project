const jwt = require("jsonwebtoken");
const saveCookie = require("./saveCookie");

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5d" });
  saveCookie(token, res);
};

module.exports = generateToken;
