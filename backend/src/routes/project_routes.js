const express = require("express");
const {
  createProject,
  deleteOneProject,
  deleteAllProjects,
  getOneProject,
  getAllProjects
} = require("../controllers/project_controller");

const projectRoutes = (app) => {
  const router = express.Router();

  router.post("/add-project", createProject);
  router.delete("/delete-project/:id", deleteOneProject);
  router.delete("/delete-all-projects", deleteAllProjects);
  router.get("/get-project/:id", getOneProject);
  router.get("/get-all-projects", getAllProjects)

  app.use("/api/projects", router);
};

module.exports = { projectRoutes };
