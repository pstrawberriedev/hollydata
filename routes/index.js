var express = require('express');
var router = express.Router();

// Set up global object
var global = {
  
  title:"Scratch",
  desc: "A node express quickstart"
  
};

/* GET home */
router.get('/', function(req, res) {
	
  
  res.render('home', { 
    page: 'Home',
    global: global
  });
  
  
});

/* GET page */
router.get('/page', function(req, res) {
	
  
  res.render('content/page', { 
    page: 'Home',
    global: global
  });
  
  
});

module.exports = router;