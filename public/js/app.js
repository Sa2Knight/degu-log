/*
  AngularJS側のコアファイル
*/

app = angular.module('degulog', ['ngRoute' , 'ngAnimate']);
app.config(function($routeProvider) {
  $routeProvider
  .when('/' , {
    templateUrl: 'views/top.html'
  })
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
    redirectTo: '/'
  });
});
