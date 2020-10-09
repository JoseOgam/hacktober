const mongoose = require("mongoose");
var validator = require("validator");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken")

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
  tokens: [{
    token: {
      type: String,
      required:true
    }
  }]
});
RegisterSchema.pre("save", async function (next) {
  var user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

RegisterSchema.methods.generateToken = async function () {
  var user = this;
  var token = jwt.sign({ _id: user._id.toString() }, "Auth system")
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token

}

RegisterSchema.statics.findByCredentials = async function (email, password) {
  var user = await  RegisterUser.findOne({ email })
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
