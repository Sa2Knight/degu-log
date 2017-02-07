/*
  [モデル] 体重
*/
degulog.factory('weightModel' , ['$http' , function($http) {
  let history = [];
  return {
    /* load: 体重記録の一覧をサーバから取得する */
    load() {
      return $http.get('/rest/weight/get').success(function(data, status, headers, config) {
        history = data;
      });
    },
    /* upload: 体重記録の一覧をサーバにアップロードする */
    upload() {
      $http({
        url: "/rest/weight/post",
        method: "POST",
        data: history,
        headers: {'Content-Type': 'application/json; charset=utf-8'}
      });
    },
    /* all: 体重記録を全て取得する */
    all: () => history,
    /* get: 指定したIDの体重記録を取得 */
    get: (_id) => history.find((h) => h._id === _id),
    /* append: 体重記録を新規登録 */
    append(newWeight) {
      history.unshift({
        date:   newWeight.date,
        pazoo:  newWeight.pazoo,
        may:    newWeight.may,
      });
      this.upload();
    },
    /* update: 既存の体重記録を編集 */
    update(newWeight) {
      let targetIndex = history.findIndex((e) => e._id === newWeight._id);
      history[targetIndex] = {
        _id:     newWeight._id,
        date:   newWeight.date,
        pazoo:  newWeight.pazoo,
        may:    newWeight.may,
      };
      this.upload();
    },
    /* remove: 既存の体重記録を削除 */
    remove(_id) {
      let targetIndex = history.findIndex((h) => h._id === _id);
      history.splice(targetIndex , 1);
      this.upload();
    },
  };
}]);
