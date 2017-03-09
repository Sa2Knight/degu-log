degulog.controller('MainController', ['$scope', '$location' , 'util', function($scope , $location , util) {

  /* URLを取得 */
  let baseURL = () => ('/' + $location.path().split('/')[1]);
  let subURL = () => $location.path().split('/').slice(1,3).join('/');

  /* 現在の年月 */
  let thisMonth = util.formatDate(new Date() , 'YYYY-MM');

  /* メニューごとのラベルを定義 */
  $scope.menus = {
    '/blog'  : 'ブログ'  ,
    '/weight': '体重管理',
    '/bought': '購入履歴',
    '/photo': '写真集'  ,
  };

  /* メニューごとのサブメニューを定義 */
  $scope.sideMenus = {
    '/blog': [
      {label: '記事一覧' ,   url: '#/blog/posts' ,                 icon: 'fa-list'},
      {label: '新規・編集' , url: '#/blog/create' ,                icon: 'fa-plus-circle'},
      {label: 'カレンダー' , url: '#/blog/calendar' ,              icon: 'fa-calendar'},
    ],
    '/weight': [
      {label: '記録一覧' ,   url: '#/weight/history' ,             icon: 'fa-list'},
      {label: '新規・編集' , url: '#/weight/create' ,              icon: 'fa-plus-circle'},
      {label: '体重遷移' ,   url: '#/weight/graf' ,                icon: 'fa-line-chart'},
    ],
    '/bought': [
      {label: '支出一覧' ,   url: '#/bought/monthly' ,             icon: 'fa-list'},
      {label: '支出詳細' ,   url: '#/bought/detail/' + thisMonth , icon: 'fa-jpy'},
    ],
    '/photo': [
      {label: '写真一覧' ,   url: '#/photo/collection' ,           icon: 'fa-picture-o'},
      {label: '新規・編集' , url: '#/photo/create' ,               icon: 'fa-picture-o'},
    ]
  };

  /* 選択中のメインメニューのタイトルを取得*/
  $scope.activeMenuTitle = () => $scope.menus[baseURL()];

  /* 指定したメインメニューが現在選択中か？ */
  $scope.isActiveMenu = (viewLocation) => (viewLocation === baseURL());

  /* 指定したサイドメニューが現在選択中か？ */
  $scope.isActiveSideMenu = (viewLocation) => viewLocation.indexOf(subURL()) > 0;

  /* メニューに応じたサブメニューのリストを取得 */
  $scope.getSideMenu = () => $scope.sideMenus[baseURL()];
}]);
