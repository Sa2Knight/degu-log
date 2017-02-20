/*
  [モデル] 購入履歴
*/
degulog.factory('boughtModel' , ['$http' , function($http) {
  let monthlyPaid = [];
  return {
    /* loadMonthlyPaid: 月ごとの支出額一覧をサーバから取得 */
    loadMonthlyPaid() {
      return $http.get('/rest/bought/monthly').success(function(data) {
        monthlyPaid = data;
      });
    },
    /* monthlyPaid: 月ごとの支出額一覧を取得 */
    monthlyPaid() {
      return monthlyPaid;
    },
  };
}]);
