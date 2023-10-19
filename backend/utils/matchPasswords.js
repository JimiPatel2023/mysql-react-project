const bcrypt = require("bcrypt");

const matchPasswords = async (enteredPassword, actualPassword) => {
  const isMatched = await bcrypt.compare(enteredPassword, actualPassword);
  return isMatched;
};

module.exports = matchPasswords;
