degulog.controller('MainController', ['$scope', '$location' , function($scope , $location) {

  /* メニューごとのサブメニューを定義 */
  $scope.sideMenus = {
    '/blog': [
      {label: 'ブログ１' , url: '#/blog' , icon: 'fa-external-link'},
      {label: 'ブログ２' , url: '#/blog' , icon: 'fa-external-link'},
      {label: 'ブログ３' , url: '#/blog' , icon: 'fa-external-link'},
      {label: 'ブログ４' , url: '#/blog' , icon: 'fa-external-link'},
    ],
    '/weight': [
      {label: '体重１' , url: '#/weight' , icon: 'fa-external-link'},
      {label: '体重２' , url: '#/weight' , icon: 'fa-external-link'},
      {label: '体重３' , url: '#/weight' , icon: 'fa-external-link'},
      {label: '体重４' , url: '#/weight' , icon: 'fa-external-link'},
    ],
    '/bought': [
      {label: '購買１' , url: '#/bought' , icon: 'fa-external-link'},
      {label: '購買２' , url: '#/bought' , icon: 'fa-external-link'},
      {label: '購買３' , url: '#/bought' , icon: 'fa-external-link'},
      {label: '購買４' , url: '#/bought' , icon: 'fa-external-link'},
    ],
    '/photos': [
      {label: '写真集１' , url: '#/photos' , icon: 'fa-external-link'},
      {label: '写真集２' , url: '#/photos' , icon: 'fa-external-link'},
      {label: '写真集３' , url: '#/photos' , icon: 'fa-external-link'},
      {label: '写真集４' , url: '#/photos' , icon: 'fa-external-link'},
    ]
  };

  /* 指定したメインメニューが現在選択中か？ */
  $scope.isActiveMenu = function(viewLocation) {
    var active = (viewLocation === $location.path());
    return active;
  };

  /* メニューに応じたサブメニューのリストを取得 */
  $scope.getSideMenu = () => $scope.sideMenus[$location.path()];

}]);
