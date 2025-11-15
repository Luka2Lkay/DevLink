const express = require("express");
const {
  sendInvite,
  deleteAllInvites,
  deleteOneInvite,
  inviteResponse,
  sentInvitesByUser,
  inviteResponse,
  receivedInvitesByUser,
} = require("../controllers/invite_controllers");
const { verifyToken } = require("../middleware/verify");

const inviteRoutes = (app) => {
  const router = express.Router();

  router.post("/send-invite/:id", verifyToken, sendInvite);
  router.delete("/delete-invite/:id", verifyToken, deleteOneInvite);
  router.delete("/delete-all-invites", deleteAllInvites);
  router.patch("/:id", verifyToken, inviteResponse);
  router.get("/sent-invites", verifyToken, sentInvitesByUser);
  router.get("/received-invites", verifyToken, receivedInvitesByUser);
  router.post("/invite-response/:id", verifyToken, inviteResponse);

  app.use("/api/invites", router);
};

module.exports = { inviteRoutes };
