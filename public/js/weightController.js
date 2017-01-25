degulog.controller('weightController' , ['$scope' , '$routeParams', 'util' , function($scope , $routeParams , util) {

  let weight = this;
  weight.list = {};
  weight.newWeight = {date: util.formatDate(new Date() , 'YYYY/MM/DD')};
  weight.graf = {};

  /* [データ] 体重記録 */
  weight.list.history = [
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
  ];

  /* [メソッド] 体重記録を削除 */
  weight.list.remove = function(index) {
    weight.list.history.splice(index , 1);
  };

  /* [メソッド] 体重を新規登録 */
  weight.newWeight.create = function() {
    if ($scope.newWeightForm.$valid) {
      alert('POSTしました');
    }
  };

  /* [メソッド] 折れ線グラを生成 */
  weight.graf.create = function() {
    // 体重記録をc3js向けのデータに変換する
    let date = ['date'] , pazoo = ['パズー'] , may = ['メイ'];
    weight.list.history.forEach(function(h) {
      date.push(h.date);
      pazoo.push(h.pazoo);
      may.push(h.may);
    });
    //グラフを生成する
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

  /* UI生成 */
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
      $scope.$apply(() => $scope.weight.newWeight.date = $(this).val());
    });
    // 折れ線グラフ
    weight.graf.create();
  })();
}]);
