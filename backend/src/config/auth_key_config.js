require("dotenv").config();

const secretKey = {
  key: process.env.JWT_SECRET_KEY,
};

module.exports = { secretKey };
