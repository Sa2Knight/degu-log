/*
 * 購入記録一覧
 */
degulog.controller('boughtListController' , ['boughtModel' , function(boughtModel) {
  let boughtList = this;
  boughtList.list = [];
  boughtModel.load().then(() => boughtList.list = boughtModel.all());
}]);
