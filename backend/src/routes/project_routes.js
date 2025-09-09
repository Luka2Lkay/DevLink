const express = require("express");
const { createProject, deleteOneProject } = require("../controllers/project_controller");

const projectRoutes = (app) => {
  const router = express.Router();

  router.post("/add-project", createProject);
  router.post("/delete-project/:id", deleteOneProject);

  app.use("/api/projects", router);
};

module.exports = { projectRoutes };
