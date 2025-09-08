const User = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/auth_key_config");

const signUp = async (req, res) => {
  const { name, email, password, confirmPassword, githubUsername } = req.body;

  return res.status(200).send("hey")
  const hash = bcrypt.hashSync(password, 10);
  const hash2 = bcrypt.hashSync(confirmPassword, 10);

  const checkEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g.test(email);

  try {
    const user = new User({
      name,
      email,
      password: hash,
      confirmPassword: hash2,
      githubUsername,
    });

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords don't match!");
    }

    if (password === confirmPassword && checkEmail) {
      registeredUser = await user.save();
      res
        .status(201)
        .json({ message: "Registered sucessfully!", user: registeredUser });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { signUp };