const Invite = require("../models/invite_model");
const Project = require("../models/project_model");

const sendInvite = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { toUser } = req.body;
    const { user } = req;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }

    if (project.owner !== user.id) {
      return res.status(401).json({ message: "Unauthorised!" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { sendInvite };
