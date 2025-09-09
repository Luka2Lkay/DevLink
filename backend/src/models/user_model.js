const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  githubUsername: { type: String, required: true, unique: true },
});

userSchema.plugin(uniqueValidator);

userSchema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;

  return object;
});

module.exports = mongoose.model("User", userSchema);
