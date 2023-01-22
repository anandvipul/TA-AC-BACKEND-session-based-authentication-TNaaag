var express = require('express');
var router = express.Router();
let User = require("../models/users");
const users = require('../models/users');

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render("register");
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/register", (req, res, next) => {
  users.create(req.body, (err, doc) =>{
    err ? next(err) : console.log(doc);
  });
  res.redirect("/users/login");
});


module.exports = router;
