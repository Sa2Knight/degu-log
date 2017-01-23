degulog.controller('blogController' , ['$scope' , '$routeParams', 'util' , function($scope , $routeParams , util) {

  let blog = this;

  /* 新規投稿 */
  blog.newPost = {
    datetime: util.formatDate(new Date() , 'YYYY/MM/DD hh:mm'),
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
  })();

}]);
