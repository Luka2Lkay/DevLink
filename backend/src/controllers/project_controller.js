const Project = require("../models/project_model");
const { validationResult } = require("express-validator");
const User = require("../models/user_model");
const Invite = require("../models/invite_model");

const createProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, githubRepoUrl, owner, collaborators } =
      req.body;

    const project = new Project({
      title,
      description,
      githubRepoUrl,
      owner,
      collaborators,
    });

    project.save();
    res.status(201).json({ message: "Project successfully created!", project });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteOneProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { user } = req;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }

    if (!project.owner.toString() !== user.userId) {
      return res
        .status(401)
        .json({ message: "You are not authorised to delete this project!" });
    }

    await Project.findByIdAndDelete(projectId);

    res.status(200).json({ message: "Project successfully deleted!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteAllProjects = async (req, res) => {
  try {
    await Project.deleteMany();
    await Invite.deleteMany();

    res.status(200).json({ message: "Successfully deleted all projects!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOneProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);

    if (project) {
      res.status(200).json({ project });
    } else {
      res.status(404).json({ message: "Project not found!" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { user } = req;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }

    if (project.owner.toString() !== user.userId) {
      return res
        .status(401)
        .json({ message: "You are not authorised to edit this project!" });
    }

    await Project.findByIdAndUpdate(projectId, req.body);

    res.status(200).json({ message: "Project successfully updated!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const projectsByUserId = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const projects = await Project.find();

    const userProjects = projects.filter((project) => {
      if (project.owner == userId) {
        return project;
      }
    });
    res.status(200).json({ userProjects });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createProject,
  deleteOneProject,
  deleteAllProjects,
  getOneProject,
  getAllProjects,
  updateProject,
  projectsByUserId,
};
