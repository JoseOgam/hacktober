const mongoose = require("mongoose");
var validator = require("validator");
var bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("password cannot contain the word password");
      }
    },
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
RegisterSchema.pre("save", async function (next) {
  var user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

RegisterSchema.statics.findByCredentials = async (email, password) => {
  var user = await RegisterUser.findOne({ email })
  if (!user) {
    throw new Error("unable to login")
  }

  var isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error("wrong password")
  }

  return user
}

var RegisterUser = mongoose.model("RegisterUser", RegisterSchema);

module.exports = RegisterUser;
