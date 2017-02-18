var Zaim = require('zaim');

var zaim = new Zaim({
  consumerKey: 'be9f148fda047e7bb899cb7fea5282175bfeac97',
  consumerSecret: '2bdc243d85f9afeeef5d0cbc30dba4e1dc563734',
  accessToken: 'OgW7qKLqi07NTigTFicuiJbV7fLRUpiJxhn1wg83oeHnIKJiQp7zLfYbekkubA2zDd5wcXWRk6kTFI',
  accessTokenSecret: 'KbEIZLRQEhagUIwrPWZCJplgbTNmo7b0yppFhXKdwoO26sx16uDxEf4ANhfNklISpo1g',
});


zaim.getMoney({
  start_date: '2016-01-01',
  end_date: '2016-12-31',
  genre_id: '10203',
} , function(data , err) {
  console.log(data.money);
});
