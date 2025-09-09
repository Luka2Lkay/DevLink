const User = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/auth_key_config");

const signUp = async (req, res) => {
  const { name, email, password, confirmPassword, githubUsername } = req.body;

  const hash = bcrypt.hashSync(password, 10);
  const hash2 = bcrypt.hashSync(confirmPassword, 10);

  const checkEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g.test(email);

  const githubUrl = `https://api.github.com/users/${githubUsername}`;

  try {
    const user = new User({
      name,
      email,
      password: hash,
      confirmPassword: hash2,
      githubUsername: githubUrl,
    });

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords don't match!");
    }

    if (password === confirmPassword && checkEmail && githubUsername) {
      registeredUser = await user.save();
      res
        .status(201)
        .json({ message: "Registered sucessfully!", user: registeredUser });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});

    res.status(200).json({ message: "Successfully deleted all users!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await User.findByIdAndDelete(userId);

    if (deleteUser) {
      res.status(200).json({ message: "The user is successfully deleted!" });
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  deleteAllUsers,
  deleteOneUser,
  getAllUsers,
  getOneUser,
};
