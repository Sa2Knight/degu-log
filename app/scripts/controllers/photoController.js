/*
 * 写真の一覧
 */
degulog.controller('photoCollectionController', ['photoModel' , function(photoModel) {
  let photo = this;

  /* [フィールド] 写真の一覧 */
  photo.collections = [];

  /* 画面初期化 */
  (function() {
    photoModel.all((data) => photo.collections = data);
  })();
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
