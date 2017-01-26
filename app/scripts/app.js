/*
  AngularJS側のコアモジュール
*/
degulog = angular.module('degulog', ['ngRoute' , 'ngAnimate']);

/*
  [ルーティング] SPAルーティング
*/
degulog.config(function($routeProvider) {
  /* ブログ */
  $routeProvider
  .when('/blog' , {
    redirectTo: '/blog/posts'
  })
  .when('/blog/create' , {
    templateUrl: 'views/blog/edit.html',
    controller: 'blogController as blog'
  })
  .when('/blog/create/:id' , {
    templateUrl: 'views/blog/edit.html',
    controller: 'blogController as blog'
  })
  .when('/blog/posts' , {
    templateUrl: 'views/blog/posts.html',
    controller: 'blogController as blog'
  })
  .when('/blog/calendar' , {
    templateUrl: 'views/blog/calendar.html',
    controller: 'blogController as blog'
  })
  /* 体重 */
  .when('/weight' , {
    redirectTo: 'weight/history'
  })
  .when('/weight/create' , {
    templateUrl: 'views/weight/edit.html',
    controller: 'weightController as weight'
  })
  .when('/weight/create/:id' , {
    templateUrl: 'views/weight/edit.html',
    controller: 'weightController as weight'
  })
  .when('/weight/history' , {
    templateUrl: 'views/weight/history.html',
    controller: 'weightController as weight'
  })
  .when('/weight/graf' , {
    templateUrl: 'views/weight/graf.html',
    controller: 'weightController as weight'
  })
  /* 購入履歴 */
  .when('/bought' , {
    redirectTo: 'bought/history'
  })
  .when('/bought/create' , {
    templateUrl: 'views/bought/edit.html'
  })
  .when('/bought/history' , {
    templateUrl: 'views/bought/history.html'
  })
  .when('/bought/graf' , {
    templateUrl: 'views/bought/graf.html'
  })
  /* 写真 */
  .when('/photo' , {
    redirectTo: 'photo/collection'
  })
  .when('/photo/create' , {
    templateUrl: 'views/photo/edit.html'
  })
  .when('/photo/collection' , {
    templateUrl: 'views/photo/collection.html'
  })
  .when('/photo/tag' , {
    templateUrl: 'views/photo/tag.html'
  })
  /* その他 */
  .otherwise({
    redirectTo: '/blog/posts'
  })
});

/*
  [モデル] 飼育日記モデル
*/
degulog.factory('blog' , [function() {
  let list = [
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
  ];
  return {
    all: () => list,
    get: (id) => list.find((e) => e.id === id),
    getByMonth: function(year , month) {
      let reg = new RegExp(`^${year}/0?${month}/[0-9]{2} [0-9]{2}:[0-9]{2}$`);
      return list.filter((e) => e.datetime.match(reg));
    },
    append(newPost) {
      list.push({
        id:       new Date().getTime().toString(),
        datetime: newPost.datetime,
        title:    newPost.title,
        body:     newPost.body
      });
    },
    update(updatedPost) {
      let targetIndex = list.findIndex((e) => e.id === updatedPost.id);
      list[targetIndex] = {
        id:       updatedPost.id,
        datetime: updatedPost.datetime,
        title:    updatedPost.title,
        body:     updatedPost.body
      };
    },
    remove(id) {
      let targetIndex = list.findIndex((e) => e.id === id);
      list.splice(targetIndex , 1);
    },
  };
}]);

/*
  [モデル] 体重
*/
degulog.factory('weight' , [function() {
  let history = [
      { id: 'hogehoge1', date: '2017/01/21', pazoo: 213, may: 219 },
      { id: 'hogehoge2', date: '2017/01/13', pazoo: 208, may: 206 },
      { id: 'hogehoge3', date: '2017/01/06', pazoo: 214, may: 220 },
      { id: 'hogehoge4', date: '2016/12/22', pazoo: 208, may: 228 },
      { id: 'hogehoge5', date: '2016/12/10', pazoo: 207, may: 219 },
      { id: 'hogehoge6', date: '2016/12/04', pazoo: 210, may: 220 },
      { id: 'hogehoge7', date: '2016/11/19', pazoo: 209, may: 222 },
      { id: 'hogehoge8', date: '2016/10/14', pazoo: 216, may: 204 },
      { id: 'hogehoge9', date: '2016/10/08', pazoo: 224, may: 198 },
      { id: 'hogehoge10', date: '2016/09/28', pazoo: 216, may: 201 },
      { id: 'hogehoge11', date: '2016/09/23', pazoo: 217, may: 207 },
  ]
  return {
    all: () => history,
    get: (id) => history.find((h) => h.id === id),
    append(newWeight) {
      history.push({
        id: new Date().getTime().toString(),
        date:   newWeight.date,
        pazoo:  newWeight.pazoo,
        may:    newWeight.may,
      });
    },
    update(newWeight) {
      let targetIndex = history.findIndex((e) => e.id === newWeight.id);
      history[targetIndex] = {
        id:     newWeight.id,
        date:   newWeight.date,
        pazoo:  newWeight.pazoo,
        may:    newWeight.may,
      };
    },
    remove(id) {
      let targetIndex = history.findIndex((h) => h.id === id);
      history.splice(targetIndex , 1);
    },
  };
}]);

/*
  [Util] 汎用メソッド
*/
degulog.factory('util' , [function() {
  return {
    /* 時刻を特定のフォーマットに変換する */
    formatDate: function(date , format) {
      if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
      format = format.replace(/YYYY/g, date.getFullYear());
      format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
      format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
      format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
      format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
      format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
      if (format.match(/S/g)) {
        var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
        var length = format.match(/S/g).length;
        for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
      }
      return format;
    },
  };
}]);

