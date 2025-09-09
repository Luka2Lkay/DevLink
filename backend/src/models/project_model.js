const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const projectSchema = new mongoose.Schema({
  title: { type: String, require: true, unique: false },
  description: { type: String, require: true, unique: false },
  owner: { type: mongoose.Types.ObjectId, ref: "User", require: true },
  collaborators: [
    { type: mongoose.Types.ObjectId, ref: "User", require: false },
  ],
});

projectSchema.plugin(uniqueValidator);

projectSchema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;

  return object;
});

module.exports = mongoose.model("Project", projectSchema);