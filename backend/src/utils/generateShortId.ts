const { nanoid } = require('nanoid');

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const generateShortId = () => {
  return nanoid(6, ALPHABET);
};

module.exports = generateShortId;