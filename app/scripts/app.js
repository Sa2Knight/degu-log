/*
  AngularJS側のコアモジュール
*/
let degulog = angular.module('degulog', ['ngRoute']);

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
degulog.factory('blog' , ['$http' , function($http) {
  let list = [];
  return {
    all: () => list,
    get: (id) => list.find((e) => e.id === id),
    getByMonth: function(year , month) {
      let reg = new RegExp(`^${year}/0?${month}/[0-9]{2} [0-9]{2}:[0-9]{2}$`);
      return list.filter((e) => e.datetime.match(reg));
    },
    load() {
      return $http.get('/rest/blog/get').success(function(data, status, headers, config) {
        list = data;
      });
    },
    upload() {
      console.log(list);
      $http({
        url: "/rest/blog/post",
        method: "POST",
        data: list,
        headers: {'Content-Type': 'application/json; charset=utf-8'}
      });
    },
    append(newPost) {
      list.unshift({
        id:       new Date().getTime().toString(),
        datetime: newPost.datetime,
        title:    newPost.title,
        body:     newPost.body
      });
      this.upload();
    },
    update(updatedPost) {
      let targetIndex = list.findIndex((e) => e.id === updatedPost.id);
      list[targetIndex] = {
        id:       updatedPost.id,
        datetime: updatedPost.datetime,
        title:    updatedPost.title,
        body:     updatedPost.body
      };
      this.upload();
    },
    remove(id) {
      let targetIndex = list.findIndex((e) => e.id === id);
      list.splice(targetIndex , 1);
      this.upload();
    },
  };
}]);

/*
  [モデル] 体重
*/
degulog.factory('weight' , [function() {
  let history = [];
  return {
    all: () => history,
    get: (id) => history.find((h) => h.id === id),
    append(newWeight) {
      history.unshift({
        id: new Date().getTime().toString(),
        date:   newWeight.date,
        pazoo:  newWeight.pazoo,
        may:    newWeight.may,
      });
    },
    load() {
      return $http.get('/rest/weight/get').success(function(data, status, headers, config) {
        history = data;
      });
    },
    upload() {
      console.log(list);
      $http({
        url: "/rest/weight/post",
        method: "POST",
        data: history,
        headers: {'Content-Type': 'application/json; charset=utf-8'}
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
      this.upload();
    },
    remove(id) {
      let targetIndex = history.findIndex((h) => h.id === id);
      history.splice(targetIndex , 1);
      this.upload();
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

