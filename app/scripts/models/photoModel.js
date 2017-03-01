/*
  [モデル] 写真集
*/
degulog.factory('photoModel' , ['$http' , function($http) {
  return {
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
  };
}]);
