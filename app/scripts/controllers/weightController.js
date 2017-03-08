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

    /* [メソッド] 体重記録一覧をサーバにアップロードする */
    upload() {
      $http({
        url: "/rest/weight/post",
        method: "POST",
        data: weightHistory.list,
        headers: {'Content-Type': 'application/json; charset=utf-8'},
      });
    },

    /* [メソッド] 指定した体重記録を削除する */
    remove() {
      // Todo:記事の削除
    },
  });

  /* 初期化 */
  weightHistory.download();

}]);

/*
 * 体重の新規登録・編集
 */
degulog.controller('weightEditController' , ['$routeParams' , '$scope' ,  'util' , '$http' , function($routeParams , $scope , util , $http) {

  let weightEdit = this;
  angular.extend(weightEdit, {

    /* [フィールド] 編集中の体重記録 */
    post: {
      date: util.formatDate(new Date() , 'YYYY/MM/DD')
    },

    /* [フィールド] 投稿に成功したか */
    success: false,

    /* [フィールド] ヘッダーテキスト */
    headerText: '新規登録',

    /* [メソッド] 対象の体重記録をダウンロード */
    download(_id) {
      $http.get('/rest/weight/list').success(function(weights) {
        let targetIndex = weights.findIndex((h) => h._id === _id);
        weightEdit.post = weights[targetIndex];
        weightEdit.headerText = `【${weightEdit.post.date}】を編集`;
      });
    },

    /* [メソッド] 投稿する */
    submit() {
      if ($scope.weightForm.$invalid) {
        this.success = false;
        return;
      }
      if (this.post._id) {
        // Todo 記事更新
      } else {
        $http({
          method: 'POST',
          url: '/rest/weight/put',
          data: weightEdit.post,
          headers: {'Content-Type': 'application/json; charset=utf-8'}
        }).then(function() {
          weightEdit.post.pazoo = '';
          weightEdit.post.may = '';
        });
      }
      this.success = true;
      $scope.weightForm.$submitted = false;
    },
  });

  /* 初期化 */
  $.datetimepicker.setLocale('ja');
  $('.date').datetimepicker({
    format : 'Y/m/d',
    timepickerScrollbar: false,
    scrollMonth: false,
    scrollInput: false,
    timepicker: false
  });
  $('.date').change(function() {
    $scope.$apply(() => $scope.weight.edit.post.date = $(this).val());
  });
  if ($routeParams._id) {
    weightEdit.download($routeParams._id);
  }
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
