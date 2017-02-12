/*
  [モデル] 飼育日記モデル
*/
degulog.factory('blogModel' , ['$http' , function($http) {
  let list = [];
  return {
    /* load: ブログ一覧をサーバから取得 */
    load() {
      return $http.get('/rest/blog/get').success(function(data) {
        list = data;
      });
    },
    /* upload: ブログ一覧をサーバにアップロード */
    upload() {
      $http({
        url: "/rest/blog/post",
        method: "POST",
        data: list,
        headers: {'Content-Type': 'application/json; charset=utf-8'}
      });
    },
    /* put: 新規ブログをサーバにアップロード */
    put(newPost) {
      $http({
        url: '/rest/blog/put',
        method: 'POST',
        data: JSON.stringify(newPost),
        headers: {'Content-Type': 'application/json; charset=utf-8'}
      });
    },
    /* all: 全てのブログを取得 */
    all: () => list,
    /* get: 指定したブログを取得 */
    get: (_id) => list.find((e) => e._id === _id),
    /* getByMonth: 指定した年月のブログ一覧を取得 */
    getByMonth: function(year , month) {
      let reg = new RegExp(`^${year}/0?${month}/[0-9]{2} [0-9]{2}:[0-9]{2}$`);
      return list.filter((e) => e.datetime.match(reg));
    },
    /* append: ブログを新規登録 */
    append(newPost) {
      list.unshift({
        datetime: newPost.datetime,
        title:    newPost.title,
        body:     newPost.body
      });
      this.put(newPost);
    },
    /* update: 既存のブログを編集 */
    update(updatedPost) {
      let targetIndex = list.findIndex((e) => e._id === updatedPost._id);
      list[targetIndex] = {
        _id:       updatedPost._id,
        datetime: updatedPost.datetime,
        title:    updatedPost.title,
        body:     updatedPost.body
      };
      this.upload();
    },
    /* remove: 既存のブログを削除 */
    remove(_id) {
      let targetIndex = list.findIndex((e) => e._id === _id);
      list.splice(targetIndex , 1);
      this.upload();
    },
  };
}]);
