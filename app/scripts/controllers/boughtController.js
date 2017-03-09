/*
 * 月ごとの支出一覧画面
 */
degulog.controller('boughtMonthlyController' , ['$http' , function($http) {

  let bought = this;
  angular.extend(bought, {

    /* [フィールド] 月ごとの支出額一覧 */
    list: [],

    /* [フィールド] 支出一覧読み込み中 */
    isLoading: true,

    /* [メソッド] 月の詳細ページへ移動する */
    showDetail(yearMonth) {
      location.href = '/#/bought/detail/' + yearMonth;
    },

    /* [メソッド] 月ごとの支出額一覧をダウンロード */
    download(callback) {
      $http.get('/rest/bought/monthly').success(function(data) {
        callback(data);
      });
    },

  });

  /* 初期化 */
  bought.download(function(data) {
    bought.list = data;
    bought.isLoading = false;
  });

}]);

/*
 * 月の支出一覧画面
 */
degulog.controller('boughtDetailController' , ['$http' , '$routeParams' , function($http , $routeParams) {
  let boughtDetail = this;
  boughtDetail.yearMonth = $routeParams.month;
  boughtDetail.list = [];
  $http.get('/rest/bought/detail/' + this.yearMonth).success(function(data) {
    boughtDetail.list = data;
  });
}]);

