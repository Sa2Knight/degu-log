degulog.controller('weightController' , ['$scope' , '$routeParams', 'util' , function($scope , $routeParams , util) {

  let weight = this;
  weight.graf = {};

  /*
   * 体重記録一覧
   */
  weight.history = {
    list: [
      { id: 'hogehoge1', date: '2017/01/21', pazoo: 213, may: 219 },
      { id: 'hogehoge2', date: '2017/01/13', pazoo: 208, may: 206 },
      { id: 'hogehoge3', date: '2017/01/06', pazoo: 214, may: 220 },
      { id: 'hogehoge4', date: '2016/12/22', pazoo: 208, may: 228 },
      { id: 'hogehoge5', date: '2016/12/10', pazoo: 207, may: 219 },
      { id: 'hogehoge6', date: '2016/12/04', pazoo: 210, may: 220 },
      { id: 'hogehoge7', date: '2016/11/19', pazoo: 209, may: 222 },
      { id: 'hogehoge8', date: '2016/10/14', pazoo: 216, may: 204 },
      { id: 'hogehoge9', date: '2016/10/08', pazoo: 224, may: 198 },
      { id: 'hogehoge10', date: '2016/09/28', pazoo: 216, may: 201 },
      { id: 'hogehoge11', date: '2016/09/23', pazoo: 217, may: 207 },
    ],
    remove: function(index) {
      this.list.splice(index , 1);
    }
  };

  /*
   * 体重の新規登録・編集
   */
  weight.edit = {
    post: { date: util.formatDate(new Date() , 'YYYY/MM/DD') },
    submit: function() {
      if ($scope.weightForm.$valid) {
        alert('POSTしました');
      }
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
