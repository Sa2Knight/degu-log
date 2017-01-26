/*
  NodeJS/express側のコアファイル
*/

var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var collection = require('./mongo');
var app = express();

app.set('views', __dirname + '/');
app.set('view engine', 'ejs');

/* トップページ */
app.get('/', function (req, res) {
  res.render('index');
});

/* 静的ファイル */
app.use('/styles', express.static('app/styles'));
app.use('/scripts', express.static('app/scripts'));
app.use('/images' , express.static('app/images'))
app.use('/views' , express.static('app/views'));
app.use('/fonts' , express.static('app/fonts'));

/* サーバー起動 */
var server = app.listen(8086, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
