const express = require("express");
const {
  createProject,
  deleteOneProject,
  deleteAllProjects,
} = require("../controllers/project_controller");

const projectRoutes = (app) => {
  const router = express.Router();

  router.post("/add-project", createProject);
  router.delete("/delete-project/:id", deleteOneProject);
  router.delete("/delete-all-projects", deleteAllProjects);

  app.use("/api/projects", router);
};

module.exports = { projectRoutes };
