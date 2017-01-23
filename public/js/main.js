degulog.controller('MainController', ['$scope', '$location' , function($scope , $location) {

  /* ベースURLを取得 */
  let baseURL = () => ('/' + $location.path().split('/')[1]);

  /* メニューごとのラベルを定義 */
  $scope.menus = {
    '/blog'  : 'ブログ'  ,
    '/weight': '体重管理',
    '/bought': '購入履歴',
    '/photos': '写真集'  ,
  };

  /* メニューごとのサブメニューを定義 */
  $scope.sideMenus = {
    '/blog': [
      {label: '記事一覧' ,      url: '#/blog/list' ,      icon: 'fa-list'},
      {label: '新規投稿' ,      url: '#/blog/new' ,       icon: 'fa-plus-circle'},
      {label: 'カレンダー' ,    url: '#/blog/calendar' ,  icon: 'fa-calendar'},
      {label: 'カテゴリ管理' ,  url: '#/blog/category' ,  icon: 'fa-tags'},
    ],
    '/weight': [
      {label: '記録一覧' ,      url: '#/weight/list' ,    icon: 'fa-list'},
      {label: '新規登録' ,      url: '#/weight/new' ,     icon: 'fa-plus-circle'},
      {label: '体重遷移' ,      url: '#/weight/graf' ,    icon: 'fa-line-chart'},
    ],
    '/bought': [
      {label: '購入記録' ,      url: '#/bought/list' ,    icon: 'fa-list'},
      {label: '新規登録' ,      url: '#/bought/new' ,     icon: 'fa-plus-circle'},
      {label: '支出記録' ,      url: '#/bought/graf' ,    icon: 'fa-bar-chart'},
    ],
    '/photos': [
      {label: '写真一覧' ,      url: '#/photos/list' ,    icon: 'fa-picture-o'},
      {label: '新規投稿' ,      url: '#/photos/new' ,     icon: 'fa-camera'},
      {label: 'タグ管理' ,      url: '#/photos/tag' ,     icon: 'fa-tags'},
    ]
  };

  /* 選択中のメインメニューのタイトルを取得*/
  $scope.activeMenuTitle = () => $scope.menus[baseURL()];

  /* 指定したメインメニューが現在選択中か？ */
  $scope.isActiveMenu = (viewLocation) => (viewLocation === baseURL());

  /* 指定したサイドメニューが現在選択中か？ */
  $scope.isActiveSideMenu = (viewLocation) => ('#' + $location.path()) === viewLocation;

  /* メニューに応じたサブメニューのリストを取得 */
  $scope.getSideMenu = () => $scope.sideMenus[baseURL()];

}]);
