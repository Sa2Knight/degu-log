/*
  AngularJS側のコアファイル
*/

degulog = angular.module('degulog', ['ngRoute' , 'ngAnimate']);

/* ルーティング */
degulog.config(function($routeProvider) {
  /* ブログ */
  $routeProvider
  .when('/blog' , {
    redirectTo: '/blog/list'
  })
  .when('/blog/new' , {
    templateUrl: 'views/blog/new.html',
    controller: 'blogController as blog'
  })
  .when('/blog/list' , {
    templateUrl: 'views/blog/list.html',
    controller: 'blogController as blog'
  })
  .when('/blog/calendar' , {
    templateUrl: 'views/blog/calendar.html',
    controller: 'blogController as blog'
  })
  /* 体重 */
  .when('/weight' , {
    redirectTo: 'weight/list'
  })
  .when('/weight/new' , {
    templateUrl: 'views/weight/new.html',
    controller: 'weightController as weight'
  })
  .when('/weight/list' , {
    templateUrl: 'views/weight/list.html',
    controller: 'weightController as weight'
  })
  .when('/weight/graf' , {
    templateUrl: 'views/weight/graf.html',
    controller: 'weightController as weight'
  })
  /* 購入履歴 */
  .when('/bought' , {
    redirectTo: 'bought/list'
  })
  .when('/bought/new' , {
    templateUrl: 'views/bought/new.html'
  })
  .when('/bought/list' , {
    templateUrl: 'views/bought/list.html'
  })
  .when('/bought/graf' , {
    templateUrl: 'views/bought/graf.html'
  })
  /* 写真 */
  .when('/photos' , {
    redirectTo: 'photos/list'
  })
  .when('/photos/new' , {
    templateUrl: 'views/photos/new.html'
  })
  .when('/photos/list' , {
    templateUrl: 'views/photos/list.html'
  })
  .when('/photos/tag' , {
    templateUrl: 'views/photos/tag.html'
  })
  /* その他 */
  .otherwise({
    redirectTo: '/blog/list'
  })
});

/* 汎用メソッド */
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

