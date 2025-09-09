const express = require("express");
const {signUp, deleteAllUsers, deleteOneUser, getAllUsers, getOneUser, signIn} = require("../controllers/user_controller")

const userRoutes = (app) => {

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.delete("/delete-user/:id", deleteOneUser);
router.delete("/delete-all-users", deleteAllUsers);
router.get("/get-all-users", getAllUsers);
router.get("/get-user/:id", getOneUser);

app.use("/api/users", router);
};

module.exports = {userRoutes};