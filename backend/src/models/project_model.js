const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const projectSchema = new mongoose.Schema({
  title: { type: String, require: true, unique: false },
  description: { type: String, required: true, unique: false },
  owner: { types: mongoose.Types.ObjectId, ref: "User" },
  collaborators: [{ types: mongoose.Types.ObjectId, ref: "User" }],
});

projectSchema.plugin(uniqueValidator);

projectSchema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;

  return object;
});

module.exports = mongoose.Model("Project", projectSchema);
