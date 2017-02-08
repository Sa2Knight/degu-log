degulog.controller('blogController' , ['$scope' , '$routeParams' , 'blogModel' , 'util' , function($scope , $routeParams , blogModel , util) {

  let blog = this;

  /*
   * 投稿一覧
   */
  blog.posts = {
    remove: (_id) => blogModel.remove(_id),
  }

  /*
   * ブログ新規投稿・編集
   */
  blog.edit = {
    post: (function() {
      if ($routeParams._id) {
        return blogModel.get($routeParams._id);
      } else {
        return {datetime: util.formatDate(new Date() , 'YYYY/MM/DD hh:mm')}
      }
    })(),
    success: false,
    submit() {
      if ($scope.postForm.$invalid) {
        this.success = false;
        return;
      }
      if (this.post._id) {
        blogModel.update(this.post);
      } else {
        blogModel.append(this.post);
        this.post.title = '';
        this.post.body = '';
      }
      this.success = true;
      $scope.postForm.$submitted = false;
    },
  };
  blog.edit.headerText = $routeParams._id ? `【${blog.edit.post.title}】を編集` : '新規投稿',

  /*
   * カレンダー
   */
  blog.calendar = {
    year: 2017,
    month: 1,
    show() {
      let events = [];
      let posts = blogModel.getByMonth(this.year , this.month);
      let reg = new RegExp('^[0-9]{4}/[0-9]{2}/([0-9]{2}) [0-9]{2}:[0-9]{2}$');
      posts.forEach(function(post) {
        let day = Number(post.datetime.match(reg)[1]);
        events.push({
          day: day,
          text: post.title
        });
      });
      $('#mini-calendar').html('').miniCalendar({
        year: this.year,
        month: this.month,
        events: events,
      });
    },
    next() {
      this.month++;
      if (this.month > 12) {
        this.year++;
        this.month = 1;
      }
      this.show();
    },
    prev() {
      this.month--;
      if (this.month <= 0) {
        this.year--;
        this.month = 12;
      }
      this.show();
    },
    today() {
      let today = new Date();
      this.year = today.getFullYear();
      this.month = today.getMonth() + 1;
      this.show();
    }
  };

  /*
   * Init
   */
  (function() {
    // ファイル添付UI
    $('.dummy-file').change(function() {
      $('.file').val($(this).val().replace("C:\\fakepath\\", ""));
    });
    // 日付時刻用datetimepicker
    $.datetimepicker.setLocale('ja');
    $('.datetime').datetimepicker({
      format : 'Y/m/d H:i',
      timepickerScrollbar: false,
      scrollMonth: false,
      scrollTime: false,
      scrollInput: false,
    });
    $('.datetime').change(function() {
      $scope.$apply(() => blog.edit.post.datetime = $(this).val());
    });
    // カレンダーUI
    blog.calendar.show();
    // 記事一覧を取得
    if (! blog.posts.list) {
      blogModel.load().then(() => blog.posts.list = blogModel.all());
    }
  })();

}]);
