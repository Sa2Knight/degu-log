/*
  NodeJS/express側のコアファイル
*/
var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var collection = require('./mongo');
var zaim = require('./zaim');
var bodyParser = require('body-parser');
var multer  = require('multer');
var base64 = require('urlsafe-base64');
var fs = require('fs');
var app = express();

app.set('views', __dirname + '/');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(multer({ dest: './uploads/'}).any());

/* トップページ */
app.get('/', function (req, res) {
  res.render('index');
});

/* ブログ一覧を取得 */
app.get('/rest/blog/list' , function(req , res) {
  collection('blog').find({}).toArray(function(err , docs) {
    res.send(docs);
  });
});

/* ブログを新規登録 */
app.post('/rest/blog/put' , function(req , res) {
  var blog = req.body;
  collection('blog').insert(blog);
  res.send('success');
});

/* ブログを削除 */
app.post('/rest/blog/remove', function(req, res) {
  var query = {'_id': new ObjectID(req.body._id)};
  collection('blog').remove(query, function() {
    res.send('success');
  });
});

/* 体重一覧を取得 */
app.get('/rest/weight/list' , function(req , res) {
  collection('weight').find({}).toArray(function(err , docs) {
    res.send(docs);
  });
});

/* 体重記録を新規登録 */
app.post('/rest/weight/put', function(req, res) {
  collection('weight').insert({
    date: req.body.date,
    pazoo: req.body.pazoo,
    may: req.body.may
  });
  res.send('success');
});

/* 体重記録を削除 */
app.post('/rest/weight/remove', function(req, res) {
  var targetID = new ObjectID(req.body._id);
  collection('weight').remove({"_id": new ObjectID(targetID)} , function() {
    res.send('success');
  });
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

/* テスト */
app.post('/test' , function(req, res) {
  var base64File = req.body.file;
  console.log(req.body.meta);
  var image = base64.decode(base64File);
  fs.writeFile('/vagrant/result.jpg', image, function() {
    res.send('success');
  });
});

/* 静的ファイル */
app.use('/styles', express.static('app/styles'));
app.use('/build', express.static('app/build'));
app.use('/images' , express.static('app/images'));
app.use('/views' , express.static('app/views'));
app.use('/fonts' , express.static('app/fonts'));

/* サーバー起動 */
var server = app.listen(8086);
