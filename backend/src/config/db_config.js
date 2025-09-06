require("dotenv").config();

const db = {
    mongoDbUrl: process.env.CONNECTION_STRING
};

module.exports = {db};