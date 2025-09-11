const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const inviteSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    unique: false,
    required: true,
  },
  toUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    unique: false,
    required: true,
  },
  projectId: {
    type: mongoose.Types.ObjectId,
    ref: "Project",
    unique: false,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

inviteSchema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;

  return object;
});

inviteSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Invite", inviteSchema);
