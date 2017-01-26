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
    { id: 'hogehoge01', datetime: '2017/01/07 15:41', title: 'ダミータイトル01', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge02', datetime: '2017/01/07 15:41', title: 'ダミータイトル02', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge03', datetime: '2017/01/07 15:41', title: 'ダミータイトル03', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge04', datetime: '2017/01/07 15:41', title: 'ダミータイトル04', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge05', datetime: '2017/01/07 15:41', title: 'ダミータイトル05', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge06', datetime: '2017/01/07 15:41', title: 'ダミータイトル06', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge07', datetime: '2017/01/07 15:41', title: 'ダミータイトル07', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge08', datetime: '2017/01/07 15:41', title: 'ダミータイトル08', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge09', datetime: '2017/01/07 15:41', title: 'ダミータイトル09', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    { id: 'hogehoge10', datetime: '2017/01/07 15:41', title: 'ダミータイトル10', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
  ];
  return {
    get: () => list,
    append: function(newPost) {
      list.push({
        id:       new Date().getTime().toString(),
        datetime: newPost.datetime,
        title:    newPost.title,
        body:     newPost.body
      });
    },
    remove: function(id) {
      let targetIndex = list.findIndex((e) => e.id === id);
      list.splice(targetIndex , 1);
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

