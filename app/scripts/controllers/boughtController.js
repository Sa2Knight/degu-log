/*
 * 月ごとの支出一覧画面
 */
degulog.controller('boughtMonthlyController' , ['boughtModel' , function(boughtModel) {

  let boughtMonthly = this;

  // 支出額一覧 画面表示にサーバからロード
  boughtMonthly.list = [];

  // 月詳細ページへ移動
  boughtMonthly.showDetail = function(yearMonth) {
    location.href = '/#/bought/detail/' + yearMonth;
  };

  // 画面表示時に支出額一覧をサーバから取得
  boughtModel.loadMonthlyPaid().then(() => boughtMonthly.list = boughtModel.getMonthlyPaid());

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
