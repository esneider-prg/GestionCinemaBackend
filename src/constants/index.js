const ORIGIN = "*";
const PORT = process.env.PORT || 8080;

const MONGO_URI =
  process.env.MONGO_URI || "mongodb+srv://esneiders2112:3002105781Lds@cluster0.n1cxpfs.mongodb.net/?retryWrites=true&w=majority";
const MONGO_OPTIONS = {};

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  ORIGIN,
  PORT,
  MONGO_URI,
  MONGO_OPTIONS,
  JWT_SECRET,
};



