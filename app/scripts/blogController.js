degulog.controller('blogController' , ['$scope' , '$routeParams' , 'blog' , 'util' , function($scope , $routeParams , blogModel , util) {

  let blog = this;

  /*
   * 投稿一覧
   */
  blog.posts = {
    list: blogModel.all(),
    remove: (id) => blogModel.remove(id),
  }

  /*
   * ブログ新規投稿・編集
   */
  blog.edit = {
    post: (function() {
      if ($routeParams.id) {
        return blogModel.get($routeParams.id);
      } else {
        return {datetime: util.formatDate(new Date() , 'YYYY/MM/DD hh:mm')}
      }
    })(),
    success: false,
    submit: function() {
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
    },
  };
  blog.edit.headerText = $routeParams.id ? `【${blog.edit.post.title}】を編集` : '新規投稿',

  /*
   * カレンダー
   */
  blog.calendar = {
    year: 2017,
    month: 1,
    show: function() {
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
    next: function() {
      this.month++;
      if (this.month > 12) {
        this.year++;
        this.month = 1;
      }
      this.show();
    },
    prev: function() {
      this.month--;
      if (this.month <= 0) {
        this.year--;
        this.month = 12;
      }
      this.show();
    },
    today: function() {
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
  })();

}]);
