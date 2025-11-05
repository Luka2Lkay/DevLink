const Invite = require("../models/invite_model");
const Project = require("../models/project_model");
const User = require("../models/user_model");

const { validationResult } = require("express-validator");

const sendInvite = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const projectId = req.params.id;
    const { email } = req.body;
    const { user } = req;

    const project = await Project.findById(projectId).populate("owner", "email");

    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }

    if (project.owner.email !== user.email) {
      return res.status(401).json({ message: "You don't own this project." });
    }

    const toUser = await User.findOne({ email })

    if (!toUser) {
      return res.status(404).json({ message: "User to invite not found!" });
    }

    if (
      project.owner._id === toUser.id ||
      project.collaborators.includes(toUser.id)
    ) {
      return res.status(400).json({
        message: "The user owns the project or is already a collaborator!",
      });
    }

    const existingInvite = await Invite.findOne({
      toUser: toUser.id,
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
      toUser: toUser.id,
      projectId,
    });

    await newInvite.save();

    res.status(201).json({ message: "Invite sent!", newInvite });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const inviteResponse = async (req, res) => {
  try {
    const inviteId = req.params.id;
    const { status } = req.body;
    const { user } = req;

    const invite = await Invite.findById(inviteId);

    if (!invite) {
      return res.status(404).json({ message: "Invite not found!" });
    }

    if (invite.toUser.toString() !== user.userId) {
      return res
        .status(401)
        .json({ message: "Not authorised to respond to this invite!" });
    }

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Status must be 'accepted' or 'rejected'",
      });
    }

    invite.status = status;
    await invite.save();

    if (status === "accepted") {
      const project = await Project.findById(invite.projectId);

      if (!project) {
        return res.status(404).json({
          message: "The project associated with this invite is not found!",
        });
      }

      if (!project.collaborators.includes(user.userId)) {
        project.collaborators.push(user.userId);
        await project.save();
      }
    }

    res.status(200).json({ message: "Responded to the invite!", invite });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteAllInvites = async (req, res) => {
  try {
    await Invite.deleteMany();

    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteOneInvite = async (req, res) => {
  try {
    const inviteId = req.params.id;

    await Invite.findByIdAndDelete(inviteId);

    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const sentInvitesByUser = async (req, res) => {
  try {
    const { user } = req;

    const invites = await Invite.find().populate(
      "toUser projectId",
      "name githubUsername title githubRepoUrl"
    );

    const sentInvites = invites.filter((invite) => {
      if (invite.fromUser.toString() === user.userId) {
        return invite;
      }
    });

    res.status(200).json({ ["sent Invites"]: sentInvites });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const receivedInvitesByUser = async (req, res) => {
  try {
    const { user } = req;

    const invites = await Invite.find().populate(
      "fromUser projectId",
      "name githubUsername title githubRepoUrl"
    );

    const receivedInvites = invites.filter((invite) => {
      if (invite.toUser.toString() === user.userId) {
        return invite;
      }
    });

    res.status(200).json({ ["received invites"]: receivedInvites });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  sendInvite,
  deleteAllInvites,
  deleteOneInvite,
  inviteResponse,
  sentInvitesByUser,
  receivedInvitesByUser,
};
