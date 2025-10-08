const { param, body } = require("express-validator");

const validateCreateProject = [
  body("title").notEmpty().withMessage("title is required!"),
  body("description").notEmpty().withMessage("description is required!"),
  body("githubRepoUrl").notEmpty().withMessage("githubRepoUrl is required!"),
  body("owner").notEmpty().withMessage("owner is required!"),
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

const validateSignIn = [
  body("email").notEmpty().withMessage("email is required!"),
  body("password").notEmpty().withMessage("password is required!"),
];

const validateSendInvite = [
  param("id").notEmpty().withMessage("id is required!"),
  body("toUserId").notEmpty().withMessage("toUserId is required!"),
];

module.exports = {
  validateCreateProject,
  validateSignIn,
  validateSignup,
  validateSendInvite,
};
