var url = 'http://localhost:8086/#/weight/history';

casper.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.74.9 (KHTML, like Gecko) Version/7.0.2 Safari/537.74.9");
casper.test.begin('体重管理機能'  , function(test) {

  /* ページにアクセス可能か */
  casper.start(url , function() {
    test.assertHttpStatus(200 , 'ステータスコードが200である');
    test.assertTitle('ぱずめいろぐ' , 'ページタイトルが正しく表示される');
  });

  /* 体重記録一覧ページが正常か */
  casper.then(function() {
    test.comment('体重記録一覧ページの表示内容');
    this.click('#side-menu-0');
    test.assertEquals(this.fetchText('#main-menu-title') , '体重管理' , 'サイドバーの見出しが正しい');
    test.assertEquals(this.fetchText('article h1') , '体重記録' , '記事一覧の見出しが正しい');
    test.assertEquals(this.fetchText('#weight-date-0') , '2017/01/27' , '特定体重記録の日時が正しい');
    test.assertEquals(this.fetchText('#weight-pazoo-3') , '214' , '特定のパズーの体重表示が正しい');
    test.assertEquals(this.fetchText('#weight-may-5') , '219' , '特定のメイの体重表示が正しい');
  });

  /* 体重記録の削除ができるか */
  casper.then(function() {
    test.comment('体重記録一覧から記録の削除');
    this.click('#weight-remove-btn-0');
    test.assertNotEquals(this.fetchText('#weight-date-0') , '2017/01/27' , '特定記事を削除できる');
    this.click('#weight-edit-btn-0');
  });

  /* 体重記録の編集ができるか */
  casper.then(function() {
    test.comment('体重記録投稿画面の表示内容');
    test.assertEquals(this.fetchText('article h1') , '【2017/01/21】を編集' , '体重記録編集画面の見出しが正しい');
    test.assertEquals(this.fetchText('input[name=date]') , '2017/01/21' , '編集対象の投稿日が正しい');
    test.assertEquals(this.fetchText('input[name=pazoo]') , '213' , '編集対象のパズーの体重が正しい');
    test.assertEquals(this.fetchText('input[name=may]') , '219' , '編集対象のメイの体重が正しい');

    test.comment('体重記録のバリデーション');
    this.fill('form[name=weightForm]' , { date: '', pazoo: '', may: '' }, false);
    test.assertAllVisible('error > span' , 'submit前はエラーメッセージが表示されない');
    this.fill('form[name=weightForm]' , { date: '', pazoo: '', may: '' }, true);
    test.assertVisible('#date-require-error' , '投稿日未入力エラーが表示される');
    test.assertVisible('#pazoo-require-error' , '体重(パズー)未入力エラーが表示される');
    test.assertVisible('#may-require-error' , '体重(メイ)未入力エラーが表示される');
    this.fill('form[name=weightForm]' , { date: '2018/01/01', pazoo: '301', may: '301' }, true);
    test.assertVisible('#pazoo-max-error' , '体重(パズー)上限エラーが表示される');
    test.assertVisible('#may-max-error' , '体重(メイ)上限エラーが表示される');
    this.fill('form[name=weightForm]' , { date: '2018/01/01', pazoo: '99', may: '99' }, true);
    test.assertVisible('#pazoo-min-error' , '体重(パズー)下限エラーが表示される');
    test.assertVisible('#may-min-error' , '体重(メイ)下限エラーが表示される');

    test.comment('体重記録の編集');
    test.assertNotVisible('#success-msg' , '投稿前は投稿完了メッセージが表示されない');
    this.fill('form[name=weightForm]' , { date: '2100/01/01', pazoo: '250', may: '260' }, true);
    test.assertVisible('#success-msg' , '投稿後は投稿完了メッセージが表示される');
    this.click('#side-menu-0');
    test.assertEquals(this.fetchText('#weight-date-0') , '2100/01/01' , '編集後の日付が正しい');
    test.assertEquals(this.fetchText('#weight-pazoo-0') , '250' , '編集後の体重(パズー)が正しい');
    test.assertEquals(this.fetchText('#weight-may-0') , '260' , '編集後の体重(メイ)が正しい');
    this.click('#side-menu-1');
  });

  /* 体重記録の新規登録ができるか */
  casper.then(function() {
    test.comment('新規体重記録投稿画面');
    test.assertEquals(this.fetchText('article h1') , '新規登録' , '体重記録新規投稿画面の見出しが正しい');
    test.assertAllVisible('error > span' , 'エラーメッセージが表示されていない');
    test.assertNotEquals(this.fetchText('input[name=date]') , '' , 'デフォルトで投稿日が入力されている');
    test.assertNotEquals(this.fetchText('input[name=date]') , '' , 'デフォルトで投稿日が入力されている');
    test.assertEquals(this.fetchText('input[name=pazoo]') , '' , '体重(パズー)が空になっている');
    test.assertEquals(this.fetchText('input[name=may]') , '' , '体重(メイ)が空になっている');

    test.comment('新規体重記録を投稿する');
    test.assertNotVisible('#success-msg' , '投稿前は投稿完了メッセージが表示されない')
    this.fill('form[name=weightForm]' , { date: '2200/01/01', pazoo: '222', may: '233' }, true);
    test.assertVisible('#success-msg' , '投稿後は投稿完了メッセージが表示される')
    this.click('#side-menu-0');
    test.assertEquals(this.fetchText('#weight-date-0') , '2200/01/01' , '作成したタイトルが正しい');
    test.assertEquals(this.fetchText('#weight-pazoo-0') , '222' , '作成した体重(パズー)が正しい');
    test.assertEquals(this.fetchText('#weight-may-0') , '233' , '作成した体重(メイ)が正しい');
    this.click('#side-menu-2');
  });

  /* 体重遷移グラフが表示されるか */
  casper.then(function() {
    test.comment('折れ線グラフ');
    test.assertEquals(this.fetchText('article h1') , '体重遷移グラフ' , '折れ線グラフ画面の見出しが正しい');
    test.assertVisible('#weight-graf' , '折れ線グラフが表示されている');
  });

  casper.run(function() {
    test.done();
    this.capture('/vagrant/result.png');
  });

});
