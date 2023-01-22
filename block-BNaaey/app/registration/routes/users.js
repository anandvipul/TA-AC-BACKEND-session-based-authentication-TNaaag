var express = require('express');
var router = express.Router();
let User = require("../models/users");


/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render("register");
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/register", (req, res, next) => {
  User.create(req.body, (err, doc) =>{
    err ? next(err) : console.log(doc);
  });
  res.redirect("/users/login");
});

router.post("/login", (req, res, next) => {
  var {email, password} = req.body;
  if (!email || !password) {
    return res.redirect("/users/login");
  }
  User.findOne({email: email}, (err, doc) => {
    if (err) return next(err);
    if (!doc) {
      return res.redirect("/users/login");
    }
    doc.verifyPassword(password, (err, result) => {
      if(err) return next(err);
      if (!result) {
        return res.redirect("/users/login");
      } else {
        console.log(req.session);
        req.session.userID = doc.email;
        console.log(req.session);
        res.send("Hello");
      }
    });
  });
  
});



module.exports = router;
