const Invite = require("../models/invite_model");
const Project = require("../models/project_model");
const User = require("../models/user_model");

const sendInvite = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { toUserId } = req.body;
    const { user } = req;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }

    if (project.owner.toString() !== user.userId) {
      return res.status(401).json({ message: "You don't own this project." });
    }

    const toUser = await User.findById(toUserId);

    if (!toUser) {
      return res.status(404).json({ message: "User to invite not found!" });
    }

    if (
      project.owner === toUserId ||
      project.collaborators.includes(toUserId)
    ) {
      return res.status(400).json({
        message: "The user owns the project or is already a collaborator!",
      });
    }

    const existingInvite = await Invite.findOne({
      toUser: toUserId,
      projectId,
      status: "pending",
    });

    if (existingInvite) {
      return res
        .status(409)
        .json({ message: "Invite for this user already sent!" });
    }

    const newInvite = new Invite({
      fromUser: user.userId,
      toUser: toUserId,
      projectId,
    });

    await newInvite.save();

    res.status(200).json({ message: "Invite sent!", newInvite });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteAllInvites = async (req, res) => {};

module.exports = { sendInvite };
