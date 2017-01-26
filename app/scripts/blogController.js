degulog.controller('blogController' , ['$scope' , '$routeParams', 'util' , function($scope , $routeParams , util) {

  let blog = this;

  /*
   * ブログ新規投稿・編集
   */
  blog.edit = {
    post: {datetime: util.formatDate(new Date() , 'YYYY/MM/DD hh:mm')},
    submit: function() {
      if ($scope.postForm.$valid) {
        alert('POSTしました');
      }
    },
  };

  /*
   * 投稿一覧
   */
  blog.posts = {
    list: [
      { id: 'hogehoge1', datetime: '2017/01/07 15:41', title: 'ダミータイトル1', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
      { id: 'hogehoge2', datetime: '2017/01/07 15:41', title: 'ダミータイトル2', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
      { id: 'hogehoge3', datetime: '2017/01/07 15:41', title: 'ダミータイトル3', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
      { id: 'hogehoge4', datetime: '2017/01/07 15:41', title: 'ダミータイトル4', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
      { id: 'hogehoge5', datetime: '2017/01/07 15:41', title: 'ダミータイトル5', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
      { id: 'hogehoge6', datetime: '2017/01/07 15:41', title: 'ダミータイトル6', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
      { id: 'hogehoge7', datetime: '2017/01/07 15:41', title: 'ダミータイトル7', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
      { id: 'hogehoge8', datetime: '2017/01/07 15:41', title: 'ダミータイトル8', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
      { id: 'hogehoge9', datetime: '2017/01/07 15:41', title: 'ダミータイトル9', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
      { id: 'hogehoge10', datetime: '2017/01/07 15:41', title: 'ダミータイトル10', body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'},
    ],
  }

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
