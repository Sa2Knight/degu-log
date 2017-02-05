var db;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://0.0.0.0:27017/degulog';

MongoClient.connect(url, function(err, mongodb) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db = mongodb;
});

var collection = function(name) {
  return db.collection(name);
}

module.exports = collection;
