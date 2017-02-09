/*
  飼育日記: 記事一覧ページ
*/
degulog.controller('blogListController' , ['blogModel' , function(blogModel) {
  let blogList = this;
  blogList.remove = (_id) => blogModel.remove(_id),
  blogModel.load().then(() => blogList.list = blogModel.all());
}]);

/*
 * 飼育日記: 記事新規登録・編集ページ
 */
degulog.controller('blogEditController' , ['$scope' , '$routeParams' , 'util' , 'blogModel' , function($scope , $routeParams , util , blogModel) {
  let blogEdit = this;
  blogEdit.post = (function() {
    if ($routeParams._id) {
      return blogModel.get($routeParams._id);
    } else {
      return {datetime: util.formatDate(new Date() , 'YYYY/MM/DD hh:mm')}
    }
  })();
  blogEdit.success = false;
  blogEdit.submit = function() {
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
  };
  blogEdit.headerText = $routeParams._id ? `【${blogEdit.post.title}】を編集` : '新規投稿';
  $('.dummy-file').change(function() {
    $('.file').val($(this).val().replace("C:\\fakepath\\", ""));
  });
  $.datetimepicker.setLocale('ja');
  $('.datetime').datetimepicker({
    format : 'Y/m/d H:i',
    timepickerScrollbar: false,
    scrollMonth: false,
    scrollTime: false,
    scrollInput: false,
  });
  $('.datetime').change(function() {
    $scope.$apply(() => blogEdit.post.datetime = $(this).val());
  });
}]);

/*
 * 飼育日記: カレンダーページ
 */
degulog.controller('blogCalendarController' , ['blogModel' , function(blogModel) {
  let blogCalendar = this;
  blogCalendar.year = 2017,
  blogCalendar.month = 2,
  blogCalendar.show = function() {
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
  };
  blogCalendar.next = function() {
    this.month++;
    if (this.month > 12) {
      this.year++;
      this.month = 1;
    }
    this.show();
  };
  blogCalendar.prev = function() {
    this.month--;
    if (this.month <= 0) {
      this.year--;
      this.month = 12;
    }
    this.show();
  };
  blogCalendar.today = function() {
    let today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth() + 1;
    this.show();
  };
  blogModel.load().then(() => blogCalendar.show());
}]);
