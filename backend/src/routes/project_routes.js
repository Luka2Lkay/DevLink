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
  router.delete("/delete-project/:id", verifyToken, deleteOneProject);
  router.delete("/delete-all-projects", verifyToken, deleteAllProjects);
  router.get("/get-project/:id", verifyToken, getOneProject);
  router.get("/get-all-projects", verifyToken, getAllProjects);
  router.put("/update-project/:id", verifyToken, updateProject);
  router.get("/projects-by-user/:id", verifyToken, projectsByUserId);

  app.use("/api/projects", router);
};

module.exports = { projectRoutes };
