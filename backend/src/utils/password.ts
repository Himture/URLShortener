const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

export const hashPassword = async (password: String) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
};