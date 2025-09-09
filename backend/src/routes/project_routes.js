const express = require("express");
const {
  createProject,
  deleteOneProject,
  deleteAllProjects,
  getOneProject,
  getAllProjects,
  updateProject,
  projectsByUserId,
} = require("../controllers/project_controller");
const { verifyToken } = require("../middleware/verify");
const { validateCreateProject } = require("../middleware/validation");

const projectRoutes = (app) => {
  const router = express.Router();

  router.post(
    "/add-project",
    verifyToken,
    validateCreateProject,
    createProject
  );
  router.delete("/delete-project/:id", deleteOneProject);
  router.delete("/delete-all-projects", deleteAllProjects);
  router.get("/get-project/:id", getOneProject);
  router.get("/get-all-projects", getAllProjects);
  router.put("/update-project/:id", updateProject);
  router.get("/projects-by-user/:id", projectsByUserId);

  app.use("/api/projects", router);
};

module.exports = { projectRoutes };
