var express = require("express");
var RegisterUser = require("../models/registerModel");

var router = new express.Router();

// register user endpoint

router.post("/register", async (req, res) => {
  var registerUser = await new RegisterUser(req.body);
  try {
    await registerUser.save();
    res.status(201).send(registerUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
