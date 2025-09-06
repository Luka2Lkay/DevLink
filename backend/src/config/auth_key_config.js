require("dotenv").config();

const secretKey = {
  key: process.env.SECRET_KEY,
};

module.exports = { secretKey };
