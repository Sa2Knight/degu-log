/*
 * 月ごとの支出一覧画面
 */
degulog.controller('boughtMonthlyController' , ['$http' , function($http) {

  let boughtMonthly = this;

  /* [フィールド] 月ごとの支出額一覧 */
  boughtMonthly.list = [];

  /* [フィールド] 支出一覧読み込み中 */
  boughtMonthly.isLoading = true;

  /* [メソッド] 月の詳細ページへ移動する */
  boughtMonthly.showDetail = function(yearMonth) {
    location.href = '/#/bought/detail/' + yearMonth;
  };

  /* 初期化 */
  $http.get('/rest/bought/monthly').success(function(data) {
    boughtMonthly.list = data;
    boughtMonthly.isLoading = false;
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
