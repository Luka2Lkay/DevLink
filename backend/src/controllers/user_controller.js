const User = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/auth_key_config");
const { validationResult } = require("express-validator");
const validator = require("validator");

const signUp = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { name, email, password, confirmPassword, githubUsername } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords don't match!",
    });
  }

  const checkEmail = validator.isEmail(email);

  if (!checkEmail) {
    return res.status(400).json({
      message: "Please enter a valid email address!",
    });
  }

  const githubUrl = `https://api.github.com/users/${githubUsername}`;

  const hash = bcrypt.hashSync(password, 10);

  try {
    const user = new User({
      name,
      email,
      password: hash,
      githubUsername: githubUrl,
    });

    registeredUser = await user.save();
    res
      .status(201)
      .json({ message: "Registered sucessfully!", user: registeredUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, name: user.name, email: user.email },
      secretKey.key,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, userId: user.id, name: user.name, githubUsername: user.githubUsername });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany();

    res.status(200).json({ message: "Successfully deleted all users!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

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

    if (!deleteUser) {
      res.status(404).json({ message: "User not found!" });
    }

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
  deleteAllUsers,
  deleteOneUser,
  getAllUsers,
  getOneUser,
};
