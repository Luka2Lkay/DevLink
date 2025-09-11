const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: false },
  description: { type: String, required: true, unique: false },
  githubRepoUrl: {type:String, required: true, unique:false},
  owner: { type: mongoose.Types.ObjectId, ref: "User", required: true, unique: false },
  collaborators: [
    { type: mongoose.Types.ObjectId, ref: "User", required: false, unique: false },
  ],
});

projectSchema.plugin(uniqueValidator);

projectSchema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;

  return object;
});

module.exports = mongoose.model("Project", projectSchema);