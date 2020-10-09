var express = require("express");
var RegisterUser = require("../models/registerModel");

var router = new express.Router();

// register user endpoint

router.post("/register", async (req, res) => {
  var registerUser = await new RegisterUser(req.body);
  console.log(req.body)
  try {
    await registerUser.save();
    var token = await registerUser.generateToken()
    res.status(201).send({registerUser, token});
  } catch (e) {
    res.status(400).send(e);
    
  }
});

router.post("/login", async (req, res) => {
  try {
    var user = await RegisterUser.findByCredentials(req.body.email, req.body.password)
    var token = await user.generateToken()
    res.status(200).send({ user, token })

  } catch (e) {
    res.status(400).send(e.message)
  }

})
router.get("/users", async(req, res) => {
  try {
    var users = await RegisterUser.find({})
    res.status(200).send(users)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router;
