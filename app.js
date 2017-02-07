/*
  NodeJS/express側のコアファイル
*/

var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var collection = require('./mongo');
var bodyParser = require('body-parser');
var app = express();

app.set('views', __dirname + '/');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* トップページ */
app.get('/', function (req, res) {
  res.render('index');
});

/* ブログ一覧を取得 */
app.get('/rest/blog/get' , function(req , res) {
  collection('blog').find({}).toArray(function(err , docs) {
    res.send(docs);
  });
});

/* ブログ一覧を更新 */
app.post('/rest/blog/post' , function(req , res) {
  console.log(req.body);
  res.send('success');
});

/* 体重一覧を取得 */
app.get('/rest/weight/get' , function(req , res) {
  collection('weight').find({}).toArray(function(err , docs) {
    res.send(docs);
  });
});

/* 体重一覧を更新 */
app.post('/rest/weight/post' , function(req , res) {
  collection('weight').remove();
  collection('weight').insert(req.body);
  res.send('success');
});

/* 静的ファイル */
app.use('/styles', express.static('app/styles'));
app.use('/build', express.static('app/build'));
app.use('/images' , express.static('app/images'));
app.use('/views' , express.static('app/views'));
app.use('/fonts' , express.static('app/fonts'));

/* サーバー起動 */
var server = app.listen(8086);
