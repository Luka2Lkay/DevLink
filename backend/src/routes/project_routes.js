const express = require("express");
const { createProject } = require("../controllers/project_controller");

const projectRoutes = (app) => {
  const router = express.Router();

  router.post("/add-project", createProject);

  app.use("/api/projects", router);
};

module.exports = { projectRoutes };
