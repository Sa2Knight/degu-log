/*
  NodeJS/express側のコアファイル
*/
var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var collection = require('./mongo');
var zaim = require('./zaim');
var bodyParser = require('body-parser');
var multer  = require('multer');
var app = express();

app.set('views', __dirname + '/');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multer({ dest: './uploads/'}).any());

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
  collection('blog').remove();
  collection('blog').insert(req.body);
  res.send('success');
});

/* ブログを新規登録 */
app.post('/rest/blog/put' , function(req , res) {
  var blog = req.body;
  collection('blog').insert(blog);
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

/* 月ごとの総支出額一覧を取得 */
app.get('/rest/bought/monthly' , function(req , res) {
  zaim.getMonthlyTotalPaid(function(monthlyPaid) {
    res.send(monthlyPaid);
  });
});

/* 指定した月の支出一覧を取得 */
app.get('/rest/bought/detail/:month' , function(req , res) {
  var yearMonth = req.params.month.split('-');
  zaim.getHistoriesByMonth(yearMonth[0] , yearMonth[1] , function(details) {
    res.send(details);
  });
});

/* 写真を新規アップロード */
app.post('/rest/photo/put' , function(req, res) {
  collection('photo').insert({
    fileName: req.files[0].filename,
    title: req.body.title,
    tags: req.body.tags.split(','),
  });
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
