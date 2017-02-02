/*
  NodeJS/express側のコアファイル
*/

// 当面のダミーデータ
var dummy = {
  blogs: [
    { id: 'fugafuga01', datetime: '2016/12/03 15:41', title: 'ダミータイトル11', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'fugafuga02', datetime: '2016/12/03 15:41', title: 'ダミータイトル12', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'fugafuga03', datetime: '2016/12/07 15:41', title: 'ダミータイトル13', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'fugafuga04', datetime: '2016/12/08 15:41', title: 'ダミータイトル14', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'fugafuga05', datetime: '2016/12/11 15:41', title: 'ダミータイトル15', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'fugafuga06', datetime: '2016/12/15 15:41', title: 'ダミータイトル16', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'fugafuga07', datetime: '2016/12/20 15:41', title: 'ダミータイトル17', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'fugafuga08', datetime: '2016/12/22 15:41', title: 'ダミータイトル18', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'fugafuga09', datetime: '2016/12/27 15:41', title: 'ダミータイトル19', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'fugafuga10', datetime: '2016/12/27 15:41', title: 'ダミータイトル20', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge01', datetime: '2016/12/29 15:41', title: 'ダミータイトル01', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge02', datetime: '2017/01/02 15:41', title: 'ダミータイトル02', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge03', datetime: '2017/01/05 15:41', title: 'ダミータイトル03', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge04', datetime: '2017/01/07 15:41', title: 'ダミータイトル04', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge05', datetime: '2017/01/12 15:41', title: 'ダミータイトル05', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge06', datetime: '2017/01/17 15:41', title: 'ダミータイトル06', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge07', datetime: '2017/01/21 15:41', title: 'ダミータイトル07', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge08', datetime: '2017/01/26 15:41', title: 'ダミータイトル08', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge09', datetime: '2017/01/27 15:41', title: 'ダミータイトル09', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge10', datetime: '2017/01/31 15:41', title: 'ダミータイトル10', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
  ],
};

var express = require('express');
var ObjectID = require('mongodb').ObjectID;
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
  res.contentType('application/json');
  res.send(JSON.stringify(dummy.blogs));
});

/* ブログ一覧を更新 */
app.post('/rest/blog/post' , function(req , res) {
  dummy.blogs = req.body;
  res.send('success');
});

/* 静的ファイル */
app.use('/styles', express.static('app/styles'));
app.use('/scripts', express.static('app/scripts'));
app.use('/images' , express.static('app/images'));
app.use('/views' , express.static('app/views'));
app.use('/fonts' , express.static('app/fonts'));

/* サーバー起動 */
var server = app.listen(8086);
