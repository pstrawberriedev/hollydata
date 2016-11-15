var mongoose = require('mongoose');
var dbName = 'testdb';

console.log('Connecting to database...');
mongoose.connect('mongodb://localhost/' + dbName);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to database:'));
db.once('open', function() {
  console.log('Connected to database: ' + dbName);
});
