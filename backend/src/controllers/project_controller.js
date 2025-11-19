const Project = require("../models/project_model");
const { validationResult } = require("express-validator");
const User = require("../models/user_model");
const Invite = require("../models/invite_model");
const axios = require("axios");
require("dotenv").config();

const createProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, githubRepoUrl, owner, collaborators } =
      req.body;


      const githubUrlRegex =/^git@github\.com:[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\.git$/

      const isValidGithubUrl = githubUrlRegex.test(githubRepoUrl);

      if (!isValidGithubUrl) {
        return res.status(400).json({ message: "Invalid GitHub repository URL format. Please use the SSH format." });
      }
      
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

    if (project.owner.toString() !== user.userId) {
      return res
        .status(401)
        .json({ message: "You are not authorised to delete this project!" });
    }

    await Project.findByIdAndDelete(projectId);

    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteAllProjects = async (req, res) => {
  try {
    await Project.deleteMany();
    await Invite.deleteMany();

    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOneProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId)
      .populate("owner", "name")
      .populate("collaborators", "name githubUsername");

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
    const projects = await Project.find()
      .populate("owner", "name")
      .populate("collaborators", "name githubUsername");

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

    res.status(204).send();
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

const githubRepoCommits = async (req, res) => {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const githubHeaders = {
      Authorization: `token ${githubToken}`,
    };
    const projectId = req.params.id;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }

    const splitUrl = project.githubRepoUrl.split("/");
    const owner = splitUrl[0].split(":")[1];
    const repo = splitUrl[splitUrl.length - 1].replace(".git", "");

    const repoUrl = `https://api.github.com/repos/${owner}/${repo}`;
    const repoResponse = await axios.get(repoUrl, {
      headers: githubHeaders,
    });

    if (repoResponse.data.private === true) {
      return res
        .status(403)
        .json({ message: "Repository is private. Commits cannot be fetched." });
    }

    const commitsResponse = await axios.get(`${repoUrl}/commits`, {
      headers: githubHeaders,
    });

    const commits = commitsResponse.data.map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      url: commit.html_url,
    }));

    res.status(200).json(commits);
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
  githubRepoCommits,
};
