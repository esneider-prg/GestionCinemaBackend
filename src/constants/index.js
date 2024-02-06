const ORIGIN = "*";
const PORT = process.env.PORT;

const MONGO_URI =
  process.env.MONGO_URI;
const MONGO_OPTIONS = {};

<<<<<<< HEAD
const JWT_SECRET = process.env.JWT_SECRET || "3002105781Lds";
=======
const JWT_SECRET = process.env.JWT_SECRET;
>>>>>>> 05c4ee0dc934af792294a8edc82c952496cef2d6

module.exports = {
  ORIGIN,
  PORT,
  MONGO_URI,
  MONGO_OPTIONS,
  JWT_SECRET,
};
