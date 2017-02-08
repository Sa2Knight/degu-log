degulog.controller('weightController' , ['$scope' , '$routeParams', 'weightModel', 'util' , function($scope , $routeParams , weightModel , util) {

  let weight = this;
  weight.graf = {};

  /*
   * 体重記録一覧
   */
  weight.history = {
    remove: (_id) => weightModel.remove(_id),
  };

  /*
   * 体重の新規登録・編集
   */
  weight.edit = {
    /* [フィールド] 入力中の体重データ */
    post: (function() {
      if ($routeParams._id) {
        return weightModel.get($routeParams._id);
      } else {
        return {date: util.formatDate(new Date() , 'YYYY/MM/DD') };
      }
    })(),
    /* [フィールド] submitの結果 */
    success: false,
    /* [メソッド] 体重記録を登録 */
    submit() {
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
    },
  };
  weight.edit.headerText = $routeParams._id ? `【${weight.edit.post.date}】を編集` : '新規登録',

  /*
   * グラフ出力
   */
  weight.graf = {
    show() {
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
    // 体重記録一覧を取得
    if (! weight.history.list) {
      weightModel.load().then(function() {
        weight.history.list = weightModel.all();
        weight.graf.show();
      });
    }
  })();
}]);
