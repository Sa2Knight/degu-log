degulog.controller('blogController' , ['$scope' , 'blog' , 'util' , function($scope , blogModel , util) {

  let blog = this;

  /*
   * 投稿一覧
   */
  blog.posts = {
    list: blogModel.get(),
    remove: (id) => blogModel.remove(id),
  }

  /*
   * ブログ新規投稿・編集
   */
  blog.edit = {
    post: {datetime: util.formatDate(new Date() , 'YYYY/MM/DD hh:mm')},
    success: false,
    submit: function() {
      if ($scope.postForm.$valid) {
        blogModel.append(this.post);
        this.post.title = '';
        this.post.body = '';
        this.success = true;
        $scope.postForm.$submitted = false;
      } else {
        this.success = false;
      }
    },
  };

  /*
   * カレンダー
   */
  blog.calendar = {
    year: 2017,
    month: 1,
    events: [],
    show: function() {
      $('#mini-calendar').html('').miniCalendar({
        year: this.year,
        month: this.month,
        events: this.events,
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
      $apply(() => blog.edit.post.datetime = $(this).val());
    });
    // カレンダーUI
    blog.calendar.show();
  })();

}]);
