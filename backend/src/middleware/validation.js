const { body } = require("express-validator");

const validateCreateProject = [
  body("title").notEmpty().withMessage("Title is required!"),
  body("description").notEmpty().withMessage("Description is required!"),
  body("owner").notEmpty().withMessage("Owner is required!"),
];

const validateSignup = [
  body("name").notEmpty().withMessage("name is required!"),
  body("email").notEmpty().withMessage("email is required!"),
  body("password").notEmpty().withMessage("password is required!"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("confirmPassword is required!"),
  body("githubUsername").notEmpty().withMessage("githubUsername is required!"),
];

module.exports = { validateCreateProject, validateSignup };
