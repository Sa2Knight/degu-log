/*
 * 写真の一覧
 */
degulog.controller('photoCollectionController', ['$http' , function($http) {
  let photo = this;

  /* [フィールド] 写真の一覧 */
  photo.collections = [];

  /* [フィールド] タイトル検索ワード */
  photo.searchTitleWord = "";

  /* [フィールド] タグ検索ワード */
  photo.searchTagsWord = "";

  /* [メソッド] 写真一覧の取得 */
  photo.search = function() {
    $http({
      url: '/rest/photo/list',
      method: 'POST',
      data: {
        title: photo.searchTitleWord,
        tags: photo.searchTagsWord
      },
    }).success((data) => photo.collections = data);
  };

  /* [メソッド] 写真の編集画面に移動 */
  photo.moveToEditPage = function(fileName) {
    location.href = "/#/photo/create/" + fileName;
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
  photo.search();

}]);

/*
 * 写真の新規作成
 */
degulog.controller('photoCreateController' , ['$http' , '$scope' , function($http, $scope) {
  let photo = this;

  /* [フィールド] 投稿成功 */
  photo.success = false;

  /* [フィールド] タグ */
  photo.tags = "";

  /* [フィールド] 添付ファイル */
  photo.file = "";

  /* [フィールド] ファイル名 */
  photo.filename = "";

  /* [メソッド] アップロード */
  photo.submit = function() {
    if ($scope.photoForm.$invalid || ! photo.file) {
      this.success = false;
      return;
    }
    let formData = new FormData();
    formData.append('file', photo.file);
    formData.append('tags', photo.tags);
    formData.append('title', photo.title);
    $http.post('/rest/photo/put', formData, {
      headers: {'Content-Type': undefined} ,
      transformRequest: null
    }).then(function() {
      photo.reset();
    });
  };

  /* フォームを初期化 */
  photo.reset = function() {
    photo.success = true;
    photo.title = "";
    photo.filename = "";
    photo.tags = "";
    photo.file = null;
    $scope.photoForm.$submitted = false;
  };

  /* 画面初期化 */
  photo.init = function() {
    $('.dummy-file').change(function() {
      $('.file').val($(this).val().replace("C:\\fakepath\\", ""));
    });
  };
  photo.init();
}]);

/**
 * 写真の編集
 * extend photoCreateController
 */
degulog.controller('photoEditController' , ['$http', '$scope' , '$controller' , '$routeParams' , function($http, $scope, $controller, $routeParams) {

  // 親コントローラを継承
  let photo = this;
  angular.extend(photo, $controller('photoCreateController', {$scope: $scope}));

  // 該当の写真データを取得
  $http.get('/rest/photo/get/' + $routeParams.fileName).success(function(data) {
    photo.fileName = data.fileName;
    photo.title = data.title;
    photo.tags = data.tags.join(',');
  });

  /* [メソッド(override)] アップロード */
  photo.submit = function() {
    if ($scope.photoForm.$invalid) {
      this.success = false;
      return;
    }
    let formData = new FormData();
    formData.append('tags', photo.tags);
    formData.append('title', photo.title);
    $http({
      url: '/rest/photo/post',
      method: 'POST',
      data: {
        fileName: photo.fileName,
        title: photo.title,
        tags: photo.tags,
      }
    }).success(function(data) {
      photo.success = true;
      $scope.photoForm.$submitted = false;
    });
  };

}]);
