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

  /* [データ] 記事一覧 */
  blog.list = {
    posts: [
      {
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
      {
        datetime: '2017/01/07 15:41',
        title: 'ダミータイトル',
        body: 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文'
      },
    ]
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
    $('#mini-calendar').html('').miniCalendar({
      year: 2017,
      month: 1,
      events: []
    });
  })();

}]);
