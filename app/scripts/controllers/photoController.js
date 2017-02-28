/*
 * 写真の新規作成/編集画面
 */
degulog.controller('photoEditController' , ['photoModel' , 'util' , function(photoModel) {
  let photo = this;

  /* [フィールド] タグ */
  photo.tags = "";

  /* [フィールド] 添付ファイル */
  photo.file = "";

  /* [メソッド] 投稿 */
  photo.submit = function() {
    let photoInfo = {
      tags: photo.tags,
      file: photo.file,
    };
    photoModel.upload(photoInfo);
  };

  /* 画面初期化 */
  $(function() {
    $('.dummy-file').change(function() {
      $('.file').val($(this).val().replace("C:\\fakepath\\", ""));
    });
  });
}]);
