const { body } = require("express-validator");

const validateCreateProject = [
  body("title").notEmpty().withMessage("Title is required!"),
  body("description").notEmpty().withMessage("Description is required!"),
  body("owner").notEmpty().withMessage("Owner is required!"),
];

module.exports = { validateCreateProject };
