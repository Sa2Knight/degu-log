/*
 * 購入記録一覧
 */
degulog.controller('boughtMonthlyController' , ['boughtModel' , function(boughtModel) {
  let boughtMonthly = this;
  boughtMonthly.list = [];
  boughtModel.loadMonthlyPaid().then(() => boughtMonthly.list = boughtModel.monthlyPaid());
}]);
