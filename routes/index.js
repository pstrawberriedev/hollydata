var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Models
var Search = require('../models/search');


// Set up global object
var global = {
  
  title:"Holly Fun",
  desc: "A data exploration"
  
};

/* GET home */
router.get('/', function(req, res) {
	
  
  res.render('home', { 
    page: 'Home',
    global: global
  });
  
});

/* POST home */
router.post('/api/user', function(req, res) {

  console.log('Recieved post at /api/user : ' + req.body);
  
  var searchQuery = req.body.query;
  
  Search.find({ query: searchQuery }, function(err, search) {
    console.log(search);
    
    if (err) throw err;
    if (search.query === undefined) {
      console.log('not defined');
//        new Search(
//          {
//            query : searchQuery
//          }
//        )
//        .save(function(err, search) {
//          if(err) throw err;
//          console.log('Saved new query. Search object is now: ' + search);
//        });
      
    } else if (search.query === searchQuery) {
      console.log('would update');
//      Search({query : searchQuery})
//      .save(function(err) {
//        if(err) throw err;
//        console.log('Query found, updated query. Search object is now: ' + search);
//      });
      
    }
    
  });
  
  res.end();
  
});

/* GET wow */
router.get('/wow', function(req, res) {
	
  
  res.render('content/wow', { 
    page: 'WoW',
    global: global
  });
  
  
});

module.exports = router;