const express = require("express");
const {sendInvite} = require("../controllers/invite_controllers");

const inviteRoutes = (app) => {
    const router = express.Router();

    router.post("/:projectId", sendInvite);



    app.use("/api/invites", router);
}

module.exports = {inviteRoutes};