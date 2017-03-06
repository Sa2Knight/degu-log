/*
  NodeJS/express側のコアファイル
*/
var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var collection = require('./mongo');
var zaim = require('./zaim');
var bodyParser = require('body-parser');
var multer  = require('multer');
var fs = require('fs');
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

/* 写真を更新 */
app.post('/rest/photo/post', function(req, res) {
  let whereQuery = {fileName: req.body.fileName};
  let setQuery = {'$set': {}};
  let title = req.body.title;
  let tags = req.body.tags;
  if (title && title !== "") {
    setQuery.$set.title = title;
  }
  if (tags && tags !== "") {
    setQuery.$set.tags = tags.split(',');
  }
  collection('photo').update(whereQuery, setQuery, function() {
    res.send('success');
  });
});

/* 写真を取得 */
app.get('/rest/photo/get/:fileName' , function(req, res) {
  let query = {fileName: req.params.fileName};
  collection('photo').findOne(query, function(err, doc) {
    res.send(doc);
  });
});

/* 写真一覧を取得 */
app.post('/rest/photo/list', function(req, res) {
  let title = req.body.title;
  let tags = req.body.tags;
  let query = {};
  if (title !== "") {
    let reg = new RegExp(title);
    query.title = reg;
  }
  if (tags !== "") {
    let tagsArray = tags.split(',');
    query.tags = { '$all': tagsArray };
  }
  collection('photo').find(query).toArray(function(err, docs) {
    res.send(docs);
  });
});

/* 画像ファイルを削除 */
app.post('/rest/photo/remove', function(req, res) {
  collection('photo').remove({fileName: req.body.fileName});
  fs.unlink('uploads/' + req.body.fileName, function() {
    res.send('success');
  });
});

/* 画像ファイルを取得 */
app.get('/rest/photo/ref/:id', function(req, res) {
  if (req.params.id.match(/^\w+$/) !== null) {
    var buf = fs.readFileSync('uploads/' + req.params.id);
    res.send(buf, { 'Content-Type': 'image/jpeg' }, 200);
  } else {
    res.status(404).send('Not found picture');
  }
});

/* 静的ファイル */
app.use('/styles', express.static('app/styles'));
app.use('/build', express.static('app/build'));
app.use('/images' , express.static('app/images'));
app.use('/views' , express.static('app/views'));
app.use('/fonts' , express.static('app/fonts'));

/* サーバー起動 */
var server = app.listen(8086);
