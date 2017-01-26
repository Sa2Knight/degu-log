degulog.controller('weightController' , ['$scope' , '$routeParams', 'weight', 'util' , function($scope , $routeParams , weightModel , util) {

  let weight = this;
  weight.graf = {};

  /*
   * 体重記録一覧
   */
  weight.history = {
    list: weightModel.all(),
    remove: (id) => weightModel.remove(id),
  };

  /*
   * 体重の新規登録・編集
   */
  weight.edit = {
    post: { date: util.formatDate(new Date() , 'YYYY/MM/DD') },
    success: false,
    submit: function() {
      if ($scope.weightForm.$invalid) {
        return;
      }
      weightModel.append(this.post);
      this.success = true;
      $scope.weightForm.$submitted = false;
    },
  };

  /*
   * グラフ出力
   */
  weight.graf = {
    show: function() {
      let date = ['date'] , pazoo = ['パズー'] , may = ['メイ'];
      weight.history.list.forEach(function(h) {
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
    },
  };

  /*
  * Init
  */
  (function() {
    // 日付時刻用datetimepicker
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
    // 折れ線グラフ
    weight.graf.show();
  })();
}]);
