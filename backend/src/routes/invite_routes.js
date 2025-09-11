const express = require("express");
const { sendInvite, deleteAllInvites, deleteOneInvite } = require("../controllers/invite_controllers");
const { verifyToken } = require("../middleware/verify");

const inviteRoutes = (app) => {
  const router = express.Router();

  router.post("/:projectId", verifyToken, sendInvite);
  router.delete("/delete-invite/:id", deleteOneInvite);
  router.delete("/delete-all-invites", deleteAllInvites);

  app.use("/api/invites", router);
};

module.exports = { inviteRoutes };
