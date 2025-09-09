const Project = require("../models/project_model");

const createProject = async (req, req) => {
  try {

    const {title, description, owner, collaborators} = req.body;

    const project = Project.save({
        title,
        description,
        owner,
        collaborators
    })

    res.status(201).json({message:"Project successfully created!", project})

  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { createProject };
