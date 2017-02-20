var Zaim = require('zaim');

var zaim = new Zaim({
  consumerKey: 'be9f148fda047e7bb899cb7fea5282175bfeac97',
  consumerSecret: '2bdc243d85f9afeeef5d0cbc30dba4e1dc563734',
  accessToken: 'OgW7qKLqi07NTigTFicuiJbV7fLRUpiJxhn1wg83oeHnIKJiQp7zLfYbekkubA2zDd5wcXWRk6kTFI',
  accessTokenSecret: 'KbEIZLRQEhagUIwrPWZCJplgbTNmo7b0yppFhXKdwoO26sx16uDxEf4ANhfNklISpo1g',
});

/* ペット関連費のジャンルID */
var genre_id = '10203';

/* APIを呼び出し、支払履歴を取得 */
var getMoney = function(params , callback) {
  params = params || {};
  params.genre_id = genre_id;
  zaim.getMoney(params, callback);
};

/* 日時文字列から年と月を正数で戻す */
/* dateString: YYYY-MM-DD 形式の文字列 */
var dateStringToYearMonth = function(dateString) {
  var reg = /^(([0-9]{4})-([0-9]{2}))-[0-9]{2}$/;
  var matched = dateString.match(reg);
  return {
    yearMonth: matched[1],
    year: Number(matched[2]),
    month: Number(matched[3]),
  };
};

/* 支出履歴を全て取得する */
zaim.getAllHistories = function(callback) {
  getMoney({} , function(data) {
    callback(data.money);
  });
};

/* 指定した年月の支出履歴を全て取得する */
zaim.getHistoriesByMonth = function(year , month , callback) {
  var yearMonth = year + '-' + month;
  var params = {
    start_date: yearMonth + '-01',
    end_date: yearMonth + '-31',
  };
  getMoney(params, function(data , err) {
    callback(data.money);
  });
};

/* 月ごとの支出総額を取得 */
zaim.getMonthlyTotalPaid = function(callback) {
  this.getAllHistories(function(money) {
    var monthlyTotalPaid = {};
    money.forEach(function(h) {
      var yearMonth = dateStringToYearMonth(h.date).yearMonth;
      if (! monthlyTotalPaid[yearMonth]) {
        monthlyTotalPaid[yearMonth] = 0;
      }
      monthlyTotalPaid[yearMonth] += h.amount;
    });
    callback(monthlyTotalPaid);
  });
};

module.exports = zaim;
