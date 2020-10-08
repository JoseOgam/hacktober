const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

var RegisterUser = mongoose.model("RegisterUser", RegisterSchema);

module.exports = RegisterUser;
