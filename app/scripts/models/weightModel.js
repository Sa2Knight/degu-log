/*
  [モデル] 体重
*/
degulog.factory('weightModel' , ['$http' , function($http) {
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
