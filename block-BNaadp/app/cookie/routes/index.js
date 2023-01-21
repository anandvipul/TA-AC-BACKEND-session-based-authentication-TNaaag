var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  
  res.cookie("name", "Vipul");
  res.render('index', { title: 'Express' });
});

module.exports = router;
