/*
  [モデル] 購入履歴
*/
degulog.factory('boughtModel' , ['$http' , function($http) {
  let monthlyPaid = [];
  let details = [];
  return {
    /* loadMonthlyPaid: 月ごとの支出額一覧をサーバから取得 */
    loadMonthlyPaid() {
      return $http.get('/rest/bought/monthly').success(function(data) {
        monthlyPaid = data;
      });
    },
    /* loadMonthDetails: 指定した月の支出一覧をサーバから取得 */
    loadMonthDetails(yearMonth) {
      return $http.get('/rest/bought/detail/' + yearMonth).success(function(data) {
        details = data;
      });
    },
    /* getMonthlyPaid: 月ごとの支出額一覧を取得 */
    getMonthlyPaid() {
      return monthlyPaid;
    },
    /* getDetails: 月の支出詳細一覧を取得 */
    getDetails() {
      return details;
    },
  };
}]);
