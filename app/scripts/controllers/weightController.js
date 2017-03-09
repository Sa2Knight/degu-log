/*
 * 体重記録一覧
 */
degulog.controller('weightHistoryController' , ['$http' , function($http) {

  let weightHistory = this;
  angular.extend(weightHistory , {

    /* [フィールド] 体重記録一覧 */
    list: [],

    /* [メソッド] 体重記録一覧をサーバからダウンロード */
    download() {
      $http.get('/rest/weight/list').then((result) => {
        weightHistory.list = result.data;
      });
    },

    /* [メソッド] 指定した体重記録を削除する */
    remove(_id) {
      $http({
        method: 'POST',
        url: '/rest/weight/remove',
        data: {_id: _id},
        headers: {'Content-Type': 'application/json; charset=utf-8'},
      }).success(function() {
        let targetIndex = weightHistory.list.findIndex((h) => h._id === _id);
        weightHistory.list.splice(targetIndex, 1);
      });
    },
  });

  /* 初期化 */
  weightHistory.download();

}]);

/*
 * 体重の新規登録
 */
degulog.controller('weightCreateController' , ['$scope' ,  'util' , '$http' , function($scope , util , $http) {

  let weight = this;
  angular.extend(weight, {

    /* [フィールド] 編集中の体重記録 */
    post: {
      date: util.formatDate(new Date() , 'YYYY/MM/DD')
    },

    /* [フィールド] 投稿に成功したか */
    success: false,

    /* [フィールド] ヘッダーテキスト */
    headerText: '新規登録',

    /* [メソッド] 投稿する */
    submit() {
      if ($scope.weightForm.$invalid) {
        this.success = false;
        return;
      }
      this.upload();
      this.success = true;
      $scope.weightForm.$submitted = false;
    },

    /* [メソッド] サーバに登録データをアップロード */
    upload() {
      $http({
        method: 'POST',
        url: '/rest/weight/put',
        data: weight.post,
        headers: {'Content-Type': 'application/json; charset=utf-8'}
      }).then(function() {
        weight.post.pazoo = '';
        weight.post.may = '';
      });
    },
  });

}]);

/*
 * 体重の編集
 * extend weightCreateController
 */
degulog.controller('weightEditController' , ['$routeParams' , '$scope'  , '$http', '$controller' , function($routeParams , $scope ,$http , $controller) {

  /* 親コントローラを継承 */
  let weight = this;
  angular.extend(weight, $controller('weightCreateController', {$scope: $scope}));

  angular.extend(weight, {

    /* [メソッド] 対象の体重記録をダウンロード */
    download(_id) {
      $http.get('/rest/weight/get/' + _id).success(function(result) {
        weight.post = result;
        weight.headerText = `【${weight.post.date}】を編集`;
      });
    },

    /* [メソッド(override)] サーバに登録データをアップロード */
    upload() {
      $http({
        method: 'POST',
        url: '/rest/weight/post',
        data: weight.post
      }).success(function() {
        weight.headerText = `【${weight.post.date}】を編集`;
      });
    },
  });

  /* 初期化 */
  weight.download($routeParams._id);

}]);

/*
 * グラフ出力
 */
degulog.controller('weightGrafController' , ['$http' , function($http) {

  let weightGraf = this;
  angular.extend(weightGraf, {

    /* [フィールド] 体重記録一覧 */
    history: [],

    /* [メソッド] グラフを生成 */
    show() {
      let date = ['date'] , pazoo = ['パズー'] , may = ['メイ'];
      this.history.forEach(function(h) {
        date.push(h.date);
        pazoo.push(h.pazoo);
        may.push(h.may);
      });
      c3.generate({
        bindto: '#weight-graf',
        data: {
          x: 'date',
          xFormat: '%Y/%m/%d',
          columns: [date , pazoo , may]
        },
        axis: {
          x: {
            show: true,
            type: 'timeseries',
            tick: {
              format: '%y/%m/%d'
            }
          }
        }
      });
    },
  });

  /* 初期化 */
  $http.get('/rest/weight/list').success(function(result) {
    weightGraf.history = result;
    weightGraf.show();
  });
}]);
