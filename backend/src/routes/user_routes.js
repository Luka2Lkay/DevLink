const express = require("express");
const {signUp} = require("../controllers/user_controller")

const userRoutes = (app) => {

const router = express.Router();

router.post("/add-user", signUp);

};

module.exports = {userRoutes};