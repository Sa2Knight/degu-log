/*
  AngularJS側のコアファイル
*/

degulog = angular.module('degulog', ['ngRoute' , 'ngAnimate']);
degulog.config(function($routeProvider) {
  /* ブログ */
  $routeProvider
  .when('/blog' , {
    redirectTo: '/blog/list'
  })
  .when('/blog/new' , {
    templateUrl: 'views/blog/new.html'
  })
  .when('/blog/list' , {
    templateUrl: 'views/blog/list.html'
  })
  .when('/blog/calendar' , {
    templateUrl: 'views/blog/calendar.html'
  })
  .when('/blog/category' , {
    templateUrl: 'views/blog/category.html'
  })
  /* 体重 */
  .when('/weight' , {
    redirectTo: 'weight/list'
  })
  .when('/weight/new' , {
    templateUrl: 'views/weight/new.html'
  })
  .when('/weight/list' , {
    templateUrl: 'views/weight/list.html'
  })
  .when('/weight/graf' , {
    templateUrl: 'views/weight/graf.html'
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
