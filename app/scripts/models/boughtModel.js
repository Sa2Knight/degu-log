/*
  [モデル] 購入履歴
*/
degulog.factory('boughtModel' , ['$http' , function($http) {
  let list = [];
  return {
    /* load: 購入記録の一覧をサーバから取得する */
    load() {
      return $http.get('/rest/bought/get').success(function(data) {
        list = data;
      });
    },
    /* all: 購入記録を全て取得する */
    all() {
      return list;
    },
  };
}]);
