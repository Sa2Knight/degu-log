/*
  [Util] 汎用メソッド
*/
degulog.factory('util' , [function() {
  return {
    /* 時刻を特定のフォーマットに変換する */
    formatDate: function(date , format) {
      if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
      format = format.replace(/YYYY/g, date.getFullYear());
      format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
      format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
      format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
      format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
      format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
      if (format.match(/S/g)) {
        let milliSeconds = ('00' + date.getMilliseconds()).slice(-3).
            length = format.match(/S/g).length;
        for (let i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
      }
      return format;
    },
  };
}]);

/*
  [ディレクティブ] ファイルアップロード
*/
degulog.directive('fileModel', ['$parse', function($parse) {
  return function(scope, element, attrs) {
    const model = $parse(attrs.fileModel);
    element.bind('change', function() {
      scope.$apply(() => {
        model.assign(scope, element[0].files[0]);
      });
    });
  };
}]);

/*
  [ディレクティブ] datetimepicker
*/
degulog.directive('dateTimePicker', function() {
  return {
    restrict: 'E',
    require: 'ngModel',
    scope: {
      format: "@",
      time: "@",
    },
    replace: true,
    template: '<input type="text" class="form-control date-time-picker" required>',
    link(scope, element, attrs, controller) {
      if (scope.format === undefined) {
        scope.format = 'Y/m/d H:i';
      }
      scope.time = scope.time === 'true' ? true : false;
      $(element).datetimepicker({
        format: scope.format,
        timepickerScrollbar: false,
        timepicker: scope.time,
        scrollMonth: false,
        scrollTime: false,
        scrollInput: false,
        onChangeDateTime(dp, $input) {
          controller.$setViewValue($input.val());
        },
      });
    },
  };
});
