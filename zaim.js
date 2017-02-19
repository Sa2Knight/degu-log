var Zaim = require('zaim');

var zaim = new Zaim({
  consumerKey: 'be9f148fda047e7bb899cb7fea5282175bfeac97',
  consumerSecret: '2bdc243d85f9afeeef5d0cbc30dba4e1dc563734',
  accessToken: 'OgW7qKLqi07NTigTFicuiJbV7fLRUpiJxhn1wg83oeHnIKJiQp7zLfYbekkubA2zDd5wcXWRk6kTFI',
  accessTokenSecret: 'KbEIZLRQEhagUIwrPWZCJplgbTNmo7b0yppFhXKdwoO26sx16uDxEf4ANhfNklISpo1g',
});

var genre_id = '10203'; // ペット関連費

/* 支出履歴を全て取得する */
zaim.getAllPurchased = function(callback) {
  this.getMoney({
    genre_id: genre_id,
  } , function(data) {
    callback(data.money);
  });
};

/* 指定した年月の支出履歴を全て取得する */
zaim.getMonthlyPurchased = function(year , month , callback) {
  var yearMonth = year + '-' + month;
  this.getMoney({
    genre_id: genre_id,
    start_date: yearMonth + '-01',
    end_date: yearMonth + '-31',
  } , function(data) {
    callback(data.money);
  });
}

module.exports = zaim;
