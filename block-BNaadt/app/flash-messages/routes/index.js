var express = require('express');
var router = express.Router();
let User = require("../models/users");

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Express' , message: req.flash("message")});
});

router.get("/login", (req, res, next) => {
  res.render("login", {message: req.flash("message")});
});

router.get("/register", (req, res, next) => {
  res.render("register");
});

router.post("/register", (req, res, next) => {

  User.create(req.body, (err, doc) => {
    if (err) {
      console("hello");
      next(err);
    } else {
      console.log("Registered a new user");
      console.log(doc);
      req.flash("message", "Successfully Registered, Proceed to Login");
      res.redirect("/login");
    }
  })
});

router.post("/login", (req, res, next) => {
  User.findOne({email: req.body.email}, (err, doc) => {
    doc.verifyPassword(req.body.password, (err, message) => {
      if (!message) {
        req.flash("message", "Email/Password Incorrect")
        res.redirect("/login");
      } else {
        req.session.id = req.body.email;
        req.flash("message", "Successfullly Logged In");
        res.render("loggedInState", {message: req.flash("message")});
      }
    })
  });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/login");
});

module.exports = router;
