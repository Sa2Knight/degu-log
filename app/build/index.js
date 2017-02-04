'use strict';

degulog.controller('MainController', ['$scope', '$location', function ($scope, $location) {

  /* URLを取得 */
  var baseURL = function baseURL() {
    return '/' + $location.path().split('/')[1];
  };
  var subURL = function subURL() {
    return $location.path().split('/').slice(1, 3).join('/');
  };

  /* メニューごとのラベルを定義 */
  $scope.menus = {
    '/blog': 'ブログ',
    '/weight': '体重管理',
    '/bought': '購入履歴',
    '/photo': '写真集'
  };

  /* メニューごとのサブメニューを定義 */
  $scope.sideMenus = {
    '/blog': [{ label: '記事一覧', url: '#/blog/posts', icon: 'fa-list' }, { label: '新規・編集', url: '#/blog/create', icon: 'fa-plus-circle' }, { label: 'カレンダー', url: '#/blog/calendar', icon: 'fa-calendar' }],
    '/weight': [{ label: '記録一覧', url: '#/weight/history', icon: 'fa-list' }, { label: '新規・編集', url: '#/weight/create', icon: 'fa-plus-circle' }, { label: '体重遷移', url: '#/weight/graf', icon: 'fa-line-chart' }],
    '/bought': [{ label: '購入記録', url: '#/bought/history', icon: 'fa-list' }, { label: '支出記録', url: '#/bought/graf', icon: 'fa-bar-chart' }],
    '/photo': [{ label: '写真一覧', url: '#/photo/collection', icon: 'fa-picture-o' }, { label: '新規・編集', url: '#/photo/create', icon: 'fa-picture-o' }, { label: 'タグ管理', url: '#/photo/tag', icon: 'fa-tags' }]
  };

  /* 選択中のメインメニューのタイトルを取得*/
  $scope.activeMenuTitle = function () {
    return $scope.menus[baseURL()];
  };

  /* 指定したメインメニューが現在選択中か？ */
  $scope.isActiveMenu = function (viewLocation) {
    return viewLocation === baseURL();
  };

  /* 指定したサイドメニューが現在選択中か？ */
  $scope.isActiveSideMenu = function (viewLocation) {
    return '#/' + subURL() === viewLocation;
  };

  /* メニューに応じたサブメニューのリストを取得 */
  $scope.getSideMenu = function () {
    return $scope.sideMenus[baseURL()];
  };
}]);