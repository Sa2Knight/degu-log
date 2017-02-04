'use strict';

degulog.controller('blogController', ['$scope', '$routeParams', 'blog', 'util', function ($scope, $routeParams, blogModel, util) {

  var blog = this;

  /*
   * 投稿一覧
   */
  blog.posts = {
    remove: function remove(id) {
      return blogModel.remove(id);
    }
  };

  /*
   * ブログ新規投稿・編集
   */
  blog.edit = {
    post: function () {
      if ($routeParams.id) {
        return blogModel.get($routeParams.id);
      } else {
        return { datetime: util.formatDate(new Date(), 'YYYY/MM/DD hh:mm') };
      }
    }(),
    success: false,
    submit: function submit() {
      if ($scope.postForm.$invalid) {
        this.success = false;
        return;
      }
      if (this.post.id) {
        blogModel.update(this.post);
      } else {
        blogModel.append(this.post);
        this.post.title = '';
        this.post.body = '';
      }
      this.success = true;
      $scope.postForm.$submitted = false;
    }
  };
  blog.edit.headerText = $routeParams.id ? '\u3010' + blog.edit.post.title + '\u3011\u3092\u7DE8\u96C6' : '新規投稿',

  /*
   * カレンダー
   */
  blog.calendar = {
    year: 2017,
    month: 1,
    show: function show() {
      var events = [];
      var posts = blogModel.getByMonth(this.year, this.month);
      var reg = new RegExp('^[0-9]{4}/[0-9]{2}/([0-9]{2}) [0-9]{2}:[0-9]{2}$');
      posts.forEach(function (post) {
        var day = Number(post.datetime.match(reg)[1]);
        events.push({
          day: day,
          text: post.title
        });
      });
      $('#mini-calendar').html('').miniCalendar({
        year: this.year,
        month: this.month,
        events: events
      });
    },
    next: function next() {
      this.month++;
      if (this.month > 12) {
        this.year++;
        this.month = 1;
      }
      this.show();
    },
    prev: function prev() {
      this.month--;
      if (this.month <= 0) {
        this.year--;
        this.month = 12;
      }
      this.show();
    },
    today: function today() {
      var today = new Date();
      this.year = today.getFullYear();
      this.month = today.getMonth() + 1;
      this.show();
    }
  };

  /*
   * Init
   */
  (function () {
    // ファイル添付UI
    $('.dummy-file').change(function () {
      $('.file').val($(this).val().replace("C:\\fakepath\\", ""));
    });
    // 日付時刻用datetimepicker
    $.datetimepicker.setLocale('ja');
    $('.datetime').datetimepicker({
      format: 'Y/m/d H:i',
      timepickerScrollbar: false,
      scrollMonth: false,
      scrollTime: false,
      scrollInput: false
    });
    $('.datetime').change(function () {
      var _this = this;

      $scope.$apply(function () {
        return blog.edit.post.datetime = $(_this).val();
      });
    });
    // カレンダーUI
    blog.calendar.show();
    // 記事一覧を取得
    if (!blog.posts.list) {
      blogModel.load().then(function () {
        return blog.posts.list = blogModel.all();
      });
    }
  })();
}]);