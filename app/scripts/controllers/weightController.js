/*
 * 体重記録一覧
 */
degulog.controller('weightHistoryController' , ['weightModel' , function(weightModel) {
  let weightHistory = this;
  weightHistory.remove = (_id) => weightModel.remove(_id),
  weightModel.load().then(() => weightHistory.list = weightModel.all());
}]);

/*
 * 体重の新規登録・編集
 */
degulog.controller('weightEditController' , ['$routeParams' , '$scope' ,  'util' , 'weightModel' , function($routeParams , $scope , util , weightModel) {
  let weightEdit = this;
  weightEdit.post = (function() {
    if ($routeParams._id) {
      return weightModel.get($routeParams._id);
    }
    return {date: util.formatDate(new Date() , 'YYYY/MM/DD') };
  })();
  weightEdit.success = false;
  weightEdit.submit = function() {
    if ($scope.weightForm.$inval_id) { return; }
    if (this.post._id) {
      weightModel.update(this.post);
    } else {
      weightModel.append(this.post);
      this.post.pazoo = '';
      this.post.may = '';
    }
    this.success = true;
    $scope.weightForm.$submitted = false;
  };
  weightEdit.headerText = $routeParams._id ? `【${weightEdit.post.date}】を編集` : '新規登録';
  $.datetimepicker.setLocale('ja');
  $('.date').datetimepicker({
    format : 'Y/m/d',
    timepickerScrollbar: false,
    scrollMonth: false,
    scrollInput: false,
    timepicker: false
  });
  $('.date').change(function() {
    $scope.$apply(() => $scope.weight.edit.post.date = $(this).val());
  });
}]);

/*
 * グラフ出力
 */
degulog.controller('weightGrafController' , ['$scope' , 'weightModel' , function($scope , weightModel) {
  let weightGraf = this;
  weightGraf.history = [];
  weightGraf.show = function() {
    let date = ['date'] , pazoo = ['パズー'] , may = ['メイ'];
    this.history.forEach(function(h) {
      date.push(h.date);
      pazoo.push(h.pazoo);
      may.push(h.may);
    });
    c3.generate({
      bindto: '#weight-graf',
      data: {
        x: 'date',
        xFormat: '%Y/%m/%d',
        columns: [date , pazoo , may]
      },
      axis: {
        x: {
          show: true,
          type: 'timeseries',
          tick: {
            format: '%y/%m/%d'
          }
        }
      }
    });
  };
  weightModel.load().then(function() {
    weightGraf.history = weightModel.all();
    weightGraf.show();
  });
}]);
