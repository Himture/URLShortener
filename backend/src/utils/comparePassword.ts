
const bcrypt = require('bcrypt');

const comparePassword = async (password:String, hashedPassword:String) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

module.exports = comparePassword;