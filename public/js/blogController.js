degulog.controller('blogController' , ['$scope' , '$routeParams', 'util' , function($scope , $routeParams , util) {

  let blog = this;

  /* [データ] 新規投稿オブジェクト*/
  blog.newPost = {
    datetime: util.formatDate(new Date() , 'YYYY/MM/DD hh:mm'),
  };

  /* [メソッド] 新規投稿を登録する */
  blog.createNewPost = function() {
    if ($scope.newPostForm.$valid) {
      alert('POSTしました');
    }
  };

  /* 記事一覧 */
  blog.list = {
    posts: [
      {
        id: 'hogehoge1',
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        id: 'hogehoge2',
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        id: 'hogehoge3',
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        id: 'hogehoge4',
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        id: 'hogehoge5',
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        id: 'hogehoge6',
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        id: 'hogehoge7',
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        id: 'hogehoge7',
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        id: 'hogehoge8',
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        id: 'hogehoge9',
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        id: 'hogehoge10',
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
    ] ,
  };

  /* カレンダー */
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

  /* UI生成 */
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
      $scope.$apply(() => $scope.blog.newPost.datetime = $(this).val());
    });
    // カレンダーUI
    blog.calendar.show();
  })();

}]);
