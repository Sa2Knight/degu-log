var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var collection = require('./mongo');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/* トップページ */
app.get('/', function (req, res) {
  res.render('index');
});

/* サーバー起動 */
var server = app.listen(8086, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
