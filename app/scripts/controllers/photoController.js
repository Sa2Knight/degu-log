/*
 * 写真の一覧
 */
degulog.controller('photoCollectionController', ['$http' , function($http) {
  let photo = this;

  /* [フィールド] 写真の一覧 */
  photo.collections = [];

  /* [メソッド] 写真一覧の取得 */
  photo.getAll = function() {
    $http.get('/rest/photo/get').success((data) => photo.collections = data);
  };

  /* [メソッド] 写真の削除 */
  photo.remove = function(fileName) {
    let targetIndex = photo.collections.findIndex((p) => p.fileName === fileName);
    $http({
      url: "/rest/photo/remove",
      method: "POST",
      data: {fileName: fileName},
    }).then(() => photo.collections.splice(targetIndex, 1));
  };

  /* 初期化 */
  photo.getAll();

}]);

/*
 * 写真の新規作成/編集画面
 */
degulog.controller('photoEditController' , ['photoModel' , '$scope' , function(photoModel, $scope) {
  let photo = this;

  /* [フィールド] 投稿成功 */
  photo.success = false;

  /* [フィールド] タグ */
  photo.tags = "";

  /* [フィールド] 添付ファイル */
  photo.file = "";

  /* [フィールド] ファイル名 */
  photo.filename = "";

  /* [メソッド] 投稿 */
  photo.submit = function() {
    if ($scope.photoForm.$invalid || ! photo.file) {
      this.success = false;
      return;
    }
    let photoInfo = {
      tags: photo.tags,
      file: photo.file,
      title: photo.title,
    };
    photoModel.upload(photoInfo);
    this.success = true;
    photo.title = "";
    photo.filename = "";
    photo.tags = "";
    photo.file = null;
    $scope.postForm.$submitted = false;
  };

  /* 画面初期化 */
  $(function() {
    $('.dummy-file').change(function() {
      $('.file').val($(this).val().replace("C:\\fakepath\\", ""));
    });
  });
}]);
