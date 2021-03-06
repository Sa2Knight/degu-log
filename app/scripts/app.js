/*
  AngularJS側のコアモジュール
*/
const degulog = angular.module('degulog', ['ngRoute']);

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
    controller: 'blogCreateController as blog'
  })
  .when('/blog/edit/:_id' , {
    templateUrl: 'views/blog/edit.html',
    controller: 'blogEditController as blog'
  })
  .when('/blog/posts' , {
    templateUrl: 'views/blog/posts.html',
    controller: 'blogListController as blogList'
  })
  .when('/blog/calendar' , {
    templateUrl: 'views/blog/calendar.html',
    controller: 'blogCalendarController as blogCalendar'
  })
  /* 体重 */
  .when('/weight' , {
    redirectTo: 'weight/history'
  })
  .when('/weight/create' , {
    templateUrl: 'views/weight/edit.html',
    controller: 'weightCreateController as weight'
  })
  .when('/weight/edit/:_id' , {
    templateUrl: 'views/weight/edit.html',
    controller: 'weightEditController as weight'
  })
  .when('/weight/history' , {
    templateUrl: 'views/weight/history.html',
    controller: 'weightHistoryController as weightHistory'
  })
  .when('/weight/graf' , {
    templateUrl: 'views/weight/graf.html',
    controller: 'weightGrafController as weightGraf'
  })
  /* 購入履歴 */
  .when('/bought' , {
    redirectTo: 'bought/monthly'
  })
  .when('/bought/monthly' , {
    templateUrl: 'views/bought/monthly.html',
    controller: 'boughtMonthlyController as bought',
  })
  .when('/bought/detail/:month' , {
    templateUrl: 'views/bought/detail.html',
    controller: 'boughtDetailController as boughtDetail',
  })
  /* 写真 */
  .when('/photo' , {
    redirectTo: 'photo/collection'
  })
  .when('/photo/create' , {
    templateUrl: 'views/photo/edit.html',
    controller: 'photoCreateController as photo',
  })
  .when('/photo/create/:fileName' , {
    templateUrl: 'views/photo/edit.html',
    controller: 'photoEditController as photo',
  })
  .when('/photo/collection' , {
    templateUrl: 'views/photo/collection.html',
    controller: 'photoCollectionController as photo',
  })
  /* その他 */
  .otherwise({
    redirectTo: '/blog/posts'
  });
});
