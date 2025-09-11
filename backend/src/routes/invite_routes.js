const express = require("express");
const { sendInvite } = require("../controllers/invite_controllers");
const { verifyToken } = require("../middleware/verify");

const inviteRoutes = (app) => {
  const router = express.Router();

  router.post("/:projectId", verifyToken, sendInvite);

  app.use("/api/invites", router);
};

module.exports = { inviteRoutes };
