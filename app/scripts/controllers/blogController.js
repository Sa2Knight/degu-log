/*
  飼育日記: 記事一覧ページ
*/
degulog.controller('blogListController' , ['$http' , function($http) {

  let blogList = this;
  angular.extend(blogList, {

    /* [フィールド] 記事一覧 */
    list: [],

    /* [メソッド] 記事一覧をサーバからダウンロード */
    download() {
      $http.get('/rest/blog/list').success((list) => this.list = list);
    },

    /* [メソッド] 記事を削除 */
    remove(_id) {
      $http({
        method: 'POST',
        url: '/rest/blog/remove',
        data: {_id: _id},
      }).success(function() {
        let targetIndex = blogList.list.findIndex((b) => b._id === _id);
        blogList.list.splice(targetIndex, 1);
      });
    },

  });

  /* 初期化 */
  blogList.download();

}]);

/*
 * 飼育日記: 記事新規登録
 */
degulog.controller('blogCreateController' , ['$scope' , 'util' , '$http' , function($scope , util , $http) {

  let blog = this;
  angular.extend(blog, {

    /* [フィールド] 編集ステータス */
    success: false,

    /* [フィールド] 編集中の記事 */
    post: {datetime: util.formatDate(new Date() , 'YYYY/MM/DD hh:mm')},

    /* [フィールド] ヘッダータイトル */
    headerText: '新規投稿',

    /* [メソッド] 記事を送信 */
    submit() {
      if ($scope.postForm.$invalid) {
        this.success = false;
        return;
      }
      this.upload();
      this.success = true;
      $scope.postForm.$submitted = false;
    },

    /* [メソッド] 登録した記事をサーバにアップロードする */
    upload() {
      $http({
        method: 'POST',
        url: '/rest/blog/put',
        data: blog.post,
      }).success(() => {
        this.post.title = '';
        this.post.body = '';
      });
    }
  });

  /* 初期化 */
  $.datetimepicker.setLocale('ja');
  $('.datetime').datetimepicker({
    format : 'Y/m/d H:i',
    timepickerScrollbar: false,
    scrollMonth: false,
    scrollTime: false,
    scrollInput: false,
  });
  $('.datetime').change(function() {
    $scope.$apply(() => blog.post.datetime = $(this).val());
  });
}]);

/*
 * 飼育日記: 記事編集
 * extend blogCreateController
 */
degulog.controller('blogEditController' , ['$scope' , '$routeParams' , '$http' , '$controller' , function($scope , $routeParams , $http, $controller) {

  let blog = this;
  angular.extend(blog, $controller('blogCreateController', {$scope: $scope}));
  angular.extend(blog, {

    /* [メソッド] 既存の記事をサーバから取得 */
    download(_id) {
      $http.get('/rest/blog/get/' + _id).success(function(post) {
        blog.post = post;
      });
    },

    /* [メソッド] 登録した記事をサーバにアップロードする */
    upload() {
      $http({
        method: 'POST',
        url: '/rest/blog/post',
        data: blog.post
      });
    }
  });

  /* 初期化 */
  blog.download($routeParams._id);
  $.datetimepicker.setLocale('ja');
  $('.datetime').datetimepicker({
    format : 'Y/m/d H:i',
    timepickerScrollbar: false,
    scrollMonth: false,
    scrollTime: false,
    scrollInput: false,
  });
  $('.datetime').change(function() {
    $scope.$apply(() => blog.post.datetime = $(this).val());
  });
}]);

/*
 * 飼育日記: カレンダーページ
 */
degulog.controller('blogCalendarController' , ['$http', function($http) {

  let blogCalendar = this;
  angular.extend(blogCalendar, {

    /* [フィールド] 年月 */
    year: 1980,
    month: 1,

    /* [フィールド] 記事一覧 */
    posts: [],

    /* [メソッド] カレンダーを表示 */
    show() {
      let events = [];
      let yearMonthRegexp = new RegExp(`^${this.year}/0?${this.month}/[0-9]{2} [0-9]{2}:[0-9]{2}$`);
      let dayRegexp = new RegExp('^[0-9]{4}/[0-9]{2}/([0-9]{2}) [0-9]{2}:[0-9]{2}$');
      let monthPosts = this.posts.filter((e) => e.datetime.match(yearMonthRegexp));
      monthPosts.forEach(function(post) {
        let day = Number(post.datetime.match(dayRegexp)[1]);
        events.push({
          day: day,
          text: post.title,
          onclick: () => location.href = `/#/blog/create/${post._id}`
        });
      });
      $('#mini-calendar').html('').miniCalendar({
        year: this.year,
        month: this.month,
        events: events,
      });
    },

    /* [メソッド] 翌月へ切り替え */
    next() {
      this.month++;
      if (this.month > 12) {
        this.year++;
        this.month = 1;
      }
      this.show();
    },

    /* [メソッド] 前月へ切り替え */
    prev() {
      this.month--;
      if (this.month <= 0) {
        this.year--;
        this.month = 12;
      }
      this.show();
    },

    /* [メソッド] 本日へ切り替え */
    today() {
      let today = new Date();
      this.year = today.getFullYear();
      this.month = today.getMonth() + 1;
      this.show();
    },

  });

  /* 初期化 */
  $http.get('/rest/blog/list').success((posts) => {
    this.posts = posts;
    this.today();
  });
}]);
