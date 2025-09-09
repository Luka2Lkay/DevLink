const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  name: { type: String, require: true, unique: false },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  confirmPassword: { type: String, require: true },
  githubUsername: { type: String, require: true, unique: true },
});

userSchema.plugin(uniqueValidator);

userSchema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;

  return object;
});

module.exports = mongoose.model("User", userSchema);