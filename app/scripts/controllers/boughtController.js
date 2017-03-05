/*
 * 月ごとの支出一覧画面
 */
degulog.controller('boughtMonthlyController' , ['boughtModel' , function(boughtModel) {

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
  boughtModel.loadMonthlyPaid().then(function() {
    boughtMonthly.list = boughtModel.getMonthlyPaid();
    boughtMonthly.isLoading = false;
  });

}]);

/*
 * 月の支出一覧画面
 */
degulog.controller('boughtDetailController' , ['boughtModel' , '$routeParams' , function(boughtModel , $routeParams) {
  let boughtDetail = this;
  boughtDetail.yearMonth = $routeParams.month;
  boughtDetail.list = [];
  boughtModel.loadMonthDetails(boughtDetail.yearMonth).then(function() {
    boughtDetail.list = boughtModel.getDetails();
  });
}]);
