/*
  User Model
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var searchSchema = new Schema({
  query: String,
  created_at: Date,
  updated_at: Date
});

// Create model with user schema
var Search = mongoose.model('Search', searchSchema);

// Populate Dates
searchSchema.pre('save', function(next) {
  // get the current date
  var currentDate = Math.floor(Date.now() /1000);
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// Export
module.exports = Search;