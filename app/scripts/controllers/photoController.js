/*
 * 写真の一覧
 */
degulog.controller('photoCollectionController', ['$http' , function($http) {

  let photo = this;
  angular.extend(photo, {

    /* [フィールド] 写真の一覧 */
    collections: [],

    /* [フィールド] タイトル検索ワード */
    searchTitleWord: "",

    /* [フィールド] タグ検索ワード */
    searchTagsWord:  "",

    /* [フィールド] 総写真枚数 */
    count:  0,

    /* [フィールド] 現在ページ番号 */
    page:  1,

    /* [フィールド] 総ページ数 */
    pageNum:  1,

    /* [フィールド] ページャオブジェクト */
    pager:  [],

    /* [メソッド] 写真一覧の取得 */
    search() {
      $http({
        url: '/rest/photo/list',
        method: 'POST',
        data: {
          title: photo.searchTitleWord,
          tags: photo.searchTagsWord,
          page: photo.page,
        },
      }).success(function(data) {
        photo.count = data.count;
        photo.page = data.page;
        photo.pageNum = data.pageNum;
        photo.collections = data.photo;
        photo.createPager();
      });
    },

    /* [メソッド] ページングを行う */
    paging(page) {
      if (page !== photo.page) {
        photo.page = page;
        photo.search();
      }
    },

    /* [メソッド] ページャの生成 */
    createPager() {
      photo.pager = [];
      for (let i = 1; i <= photo.pageNum; i++) {
        photo.pager.push({
          label: String(i),
          page: i,
          active: photo.page === i ? 'active' : ''
        });
      }
    },

    /* [メソッド] 写真の編集画面に移動 */
    moveToEditPage(fileName) {
      location.href = "/#/photo/create/" + fileName;
    },

    /* [メソッド] 写真の削除 */
    remove(fileName) {
      let targetIndex = photo.collections.findIndex((p) => p.fileName === fileName);
      $http({
        url: "/rest/photo/remove",
        method: "POST",
        data: {fileName: fileName},
      }).then(() => photo.collections.splice(targetIndex, 1));
    },

  });

  /* 初期化 */
  photo.search();

}]);

/*
 * 写真の新規作成
 */
degulog.controller('photoCreateController' , ['$http' , '$scope' , function($http, $scope) {

  let photo = this;
  angular.extend(photo, {

    /* [フィールド] 投稿成功 */
    success: false,

    /* [フィールド] タグ */
    tags: "",

    /* [フィールド] 添付ファイル */
    file: "",

    /* [フィールド] ファイル名 */
    filename: "",

    /* [メソッド] アップロード */
    submit() {
      this.success = false;
      if ($scope.photoForm.$invalid || ! photo.file) {
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
    },

    /* フォームを初期化 */
    reset() {
      photo.success = true;
      photo.title = "";
      photo.filename = "";
      photo.tags = "";
      photo.file = null;
      $('input[ng-model="photo.filename"]').val('');
      $scope.photoForm.$submitted = false;
    },

    /* 画面初期化 */
    init() {
      $('.dummy-file').change(function() {
        $('.file').val($(this).val().replace("C:\\fakepath\\", ""));
      });
    },
  });
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
  angular.extend(photo, {

    /* [メソッド] 特定の写真情報をダウンロード */
    download(fileName) {
      $http.get('/rest/photo/get/' + fileName).success(function(data) {
        photo.fileName = data.fileName;
        photo.title = data.title;
        photo.tags = data.tags.join(',');
      });
    },

    /* [メソッド(override)] アップロード */
    submit() {
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
      }).success(function() {
        photo.success = true;
        $scope.photoForm.$submitted = false;
      });
    },

  });

  photo.download($routeParams.fileName);

}]);
