/*
  [モデル] 写真集
*/
degulog.factory('photoModel' , ['$http' , function($http) {
  return {
    /* [メソッド] 写真をアップロードする */
    upload(photo) {
      const formData = new FormData();
      formData.append('file', photo.file);
      formData.append('tags', photo.tags);
      formData.append('title', photo.title);
      const config = {
        headers: {
          'Content-Type': undefined,
        },
      };
      $http.post('/rest/photo/put', formData, {
        headers: {'Content-Type': undefined} ,
        transformRequest: null
      });
    },
    /* [メソッド] 写真一覧を取得する */
    all(callback) {
      $http.get('/rest/photo/get').success(function(data) {
        callback(data);
      });
    },
  };
}]);
