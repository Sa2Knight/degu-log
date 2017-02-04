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
  weights: [
    { id: 'hogehoge13', date: '2017/02/04', pazoo: 218, may: 227 },
    { id: 'hogehoge12', date: '2017/01/27', pazoo: 190, may: 193 },
    { id: 'hogehoge1',  date: '2017/01/21', pazoo: 213, may: 219 },
    { id: 'hogehoge2',  date: '2017/01/13', pazoo: 208, may: 206 },
    { id: 'hogehoge3',  date: '2017/01/06', pazoo: 214, may: 220 },
    { id: 'hogehoge4',  date: '2016/12/22', pazoo: 208, may: 228 },
    { id: 'hogehoge5',  date: '2016/12/10', pazoo: 207, may: 219 },
    { id: 'hogehoge6',  date: '2016/12/04', pazoo: 210, may: 220 },
    { id: 'hogehoge7',  date: '2016/11/19', pazoo: 209, may: 222 },
    { id: 'hogehoge8',  date: '2016/10/14', pazoo: 216, may: 204 },
    { id: 'hogehoge9',  date: '2016/10/08', pazoo: 224, may: 198 },
    { id: 'hogehoge10', date: '2016/09/28', pazoo: 216, may: 201 },
    { id: 'hogehoge11', date: '2016/09/23', pazoo: 217, may: 207 },
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

/* 体重一覧を取得 */
app.get('/rest/weight/get' , function(req , res) {
  res.contentType('application/json');
  res.send(JSON.stringify(dummy.weights));
});

/* ブログ一覧を更新 */
app.post('/rest/weight/post' , function(req , res) {
  dummy.weights = req.body;
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
