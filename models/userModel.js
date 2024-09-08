const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  email: {
    type: String,

    required: [true, "email is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  address: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  notification: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
  activationToken: {
    type: String,
    default: "",
  },
  forgetToken: {
    type: String,
    default: "",
  },
});
// userSchema.index({ token: 1 }, { expireAfterSeconds: 300 });
const usermodel = mongoose.model("user", userSchema);

module.exports = usermodel;
