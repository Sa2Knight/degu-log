degulog.controller('weightController' , ['$scope' , '$routeParams', 'util' , function($scope , $routeParams , util) {

  let weight = this;
  weight.list = {};

  /* 体重記録 */
  weight.list.history = [
    { date: '2016/09/23', pazoo: 217, may: 207 },
    { date: '2016/09/28', pazoo: 216, may: 201 },
    { date: '2016/10/08', pazoo: 224, may: 198 },
    { date: '2016/10/14', pazoo: 216, may: 204 },
    { date: '2016/11/19', pazoo: 209, may: 222 },
    { date: '2016/12/04', pazoo: 210, may: 220 },
    { date: '2016/12/10', pazoo: 207, may: 219 },
    { date: '2016/12/22', pazoo: 208, may: 228 },
    { date: '2017/01/06', pazoo: 214, may: 220 },
    { date: '2017/01/13', pazoo: 208, may: 206 },
    { date: '2017/01/21', pazoo: 213, may: 219 },
  ];

}]);
