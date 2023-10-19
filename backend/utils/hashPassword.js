const bcrypt = require("bcrypt");

const hashPassword = async (psw) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(psw, salt);
  return hashedPassword;
};

module.exports = hashPassword;
