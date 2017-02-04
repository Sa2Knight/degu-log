/*
  [モデル] 飼育日記モデル
*/
degulog.factory('blogModel' , ['$http' , function($http) {
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
