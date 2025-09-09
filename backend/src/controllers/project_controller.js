const Project = require("../models/project_model");

const createProject = async (req, res) => {
  try {
    const { title, description, owner, collaborators } = req.body;

    const project = new Project({
      title,
      description,
      owner,
      collaborators,
    });

    res.status(201).json({ message: "Project successfully created!", project });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteOneProject = async (req, res) => {
  try {
    const userId = req.params.id;

    await Project.findByIdAndDelete(userId);

    res.status(200).json({ message: "Project successfully deleted!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteAllProjects = async (req, res) => {
  try {
    await Project.deleteMany();

    res.status(200).json({ message: "Successfully deleted all projects!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getOneProject = async (req, res) => {
  try {
    const userId = req.params.id;
    const project = await Project.findById(userId);

    if (project) {
      res.status(200).json({ project });
    } else {
      res.status(404).json({ message: "Project not found!" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createProject,
  deleteOneProject,
  deleteAllProjects,
  getOneProject,
};
