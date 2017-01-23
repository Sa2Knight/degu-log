/*
  AngularJS側のコアファイル
*/

degulog = angular.module('degulog', ['ngRoute' , 'ngAnimate']);
degulog.config(function($routeProvider) {
  $routeProvider
  .when('/blog' , {
    templateUrl: 'views/blog.html'
  })
  .when('/weight' , {
    templateUrl: 'views/weight.html'
  })
  .when('/bought' , {
    templateUrl: 'views/bought.html'
  })
  .when('/photos' , {
    templateUrl: 'views/photos.html'
  })
  .otherwise({
    redirectTo: '/blog'
  })
});
