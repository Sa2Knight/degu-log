degulog.controller('MainController', ['$scope', '$location' , function($scope , $location) {

  /* メニューごとのサブメニューを定義 */
  $scope.sideMenus = {
    '/blog': [
      {label: '新規投稿' ,      url: '#/blog/new' ,       icon: 'fa-external-link'},
      {label: '記事一覧' ,      url: '#/blog/list' ,      icon: 'fa-external-link'},
      {label: 'カレンダー' ,    url: '#/blog/calendar' ,  icon: 'fa-external-link'},
      {label: 'カテゴリ管理' ,  url: '#/blog/category' ,  icon: 'fa-external-link'},
    ],
    '/weight': [
      {label: '体重登録' ,      url: '#/weight/new' ,     icon: 'fa-external-link'},
      {label: '体重遷移' ,      url: '#/weight/graf' ,    icon: 'fa-external-link'},
    ],
    '/bought': [
      {label: '購入記録' ,      url: '#/bought/list' ,    icon: 'fa-external-link'},
      {label: '支出記録' ,      url: '#/bought/paid' ,    icon: 'fa-external-link'},
    ],
    '/photos': [
      {label: '新規投稿' ,      url: '#/photos/new' ,     icon: 'fa-external-link'},
      {label: '写真一覧' ,      url: '#/photos/list' ,    icon: 'fa-external-link'},
      {label: 'タグ管理' ,      url: '#/photos/tag' ,     icon: 'fa-external-link'},
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
