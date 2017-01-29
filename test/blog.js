var url = 'http://localhost:8086/#/blog/posts';

casper.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.74.9 (KHTML, like Gecko) Version/7.0.2 Safari/537.74.9");
casper.test.begin('ブログ機能'  , function(test) {

  /* ページにアクセスできるか */
  casper.start(url , function() {
    test.assertHttpStatus(200 , 'ステータスコードが200である');
    test.assertTitle('ぱずめいろぐ' , 'ページタイトルが正しく表示される');
  });

  /* 記事一覧ページが表示されるか*/
  casper.then(function() {
    test.comment('記事一覧ページの表示内容');
    this.click('#side-menu-0');
    test.assertEquals(this.fetchText('#main-menu-title') , 'ブログ' , 'サイドバーの見出しが正しい');
    test.assertEquals(this.fetchText('article h1') , '記事一覧' , '記事一覧の見出しが正しい');
    test.assertEquals(this.fetchText('#post-title-0') , 'ダミータイトル11' , '特定記事のタイトルが正しい');
    test.assertEquals(this.fetchText('#post-datetime-3') , '2016/12/08 15:41' , '特定記事の投稿日が正しい');
    test.assertEquals(this.fetchText('#post-body-5') , 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文' , '特定記事の本文が正しい');

    test.comment('検索フォームによるフィルタリング');
    this.fill('form[name=postSearchForm]' , { searchWord: 'ダミータイトル20'}, false);
    test.assertEquals(this.fetchText('#post-title-0') , 'ダミータイトル20' , '検索条件に合致する記事が表示される');
    test.assertNotExists('#post-title-1' , '検索条件に合致しない記事は表示されない');
    this.fill('form[name=postSearchForm]' , { searchWord: ''}, false);
  });

  /* 記事一覧ページから記事の削除ができるか */
  casper.then(function() {
    test.comment('記事一覧から記事の削除');
    this.click('#post-delete-btn-0');
    test.assertNotEquals(this.fetchText('#post-title-0') , 'ダミータイトル11' , '特定記事を削除できる');
    this.click('#post-edit-btn-0');
  });

  /* 記事の編集ができるか */
  casper.then(function() {
    test.comment('記事投稿画面の表示内容');
    test.assertEquals(this.fetchText('article h1') , '【ダミータイトル12】を編集' , '記事編集画面の見出しが正しい');
    test.assertEquals(this.fetchText('input[name=datetime]') , '2016/12/03 15:41' , '編集対象の投稿日が正しい');
    test.assertEquals(this.fetchText('input[name=title]') , 'ダミータイトル12' , '編集対象のタイトルが正しい');
    test.assertEquals(this.fetchText('textarea[name=body]') , 'ダミー本文ダミー本文ダミー本文ダミー本文ダミー本文' , '編集対象の本文が正しい');

    test.comment('記事投稿内容のバリデーション');
    this.fill('form[name=postForm]' , { datetime: '', title: '', body: '' }, false);
    test.assertAllVisible('error > span' , 'submit前はエラーメッセージが表示されない');
    this.fill('form[name=postForm]' , { datetime: '', title: '', body: '' }, true);
    test.assertVisible('#datetime-require-error' , '投稿日未入力エラーが表示される');
    test.assertVisible('#title-require-error' , 'タイトル未入力エラーが表示される');
    this.fill('form[name=postForm]' , { datetime: 'hogehoge', title: '0123456789012345678', body: '' }, false);
    test.assertVisible('#title-length-error' , 'タイトル文字数エラーが表示される');

    test.comment('記事の編集');
    test.assertNotVisible('#success-msg' , '投稿前は投稿完了メッセージが表示されない');
    this.fill('form[name=postForm]' , { datetime: '1900/01/01 13:00', title: '更新後タイトル', body: '更新後本文' }, true);
    test.assertVisible('#success-msg' , '投稿後は投稿完了メッセージが表示される');
    this.click('#side-menu-0');
    test.assertEquals(this.fetchText('#post-title-0') , '更新後タイトル' , '編集後のタイトルが正しい');
    test.assertEquals(this.fetchText('#post-datetime-0') , '1900/01/01 13:00' , '編集後の投稿日が正しい');
    test.assertEquals(this.fetchText('#post-body-0') , '更新後本文' , '編集後の本文が正しい');
    this.click('#side-menu-1');
  });

  /* 記事の新規投稿ができるか */
  casper.then(function() {
    test.comment('新規記事投稿画面');
    test.assertEquals(this.fetchText('article h1') , '新規投稿' , '新規投稿画面の見出しが正しい');
    test.assertAllVisible('error > span' , 'エラーメッセージが表示されていない');
    test.assertNotEquals(this.fetchText('input[name=datetime]') , '' , 'デフォルトで投稿日が入力されている');
    test.assertEquals(this.fetchText('input[name=title]') , '' , 'タイトルが空になっている');
    test.assertEquals(this.fetchText('textarea[name=body]') , '' , '本文が空になっている');

    test.comment('新規記事を投稿する');
    test.assertNotVisible('#success-msg' , '投稿前は投稿完了メッセージが表示されない');
    this.fill('form[name=postForm]' , { datetime: '2000/01/01 13:00', title: '新規タイトル', body: '新規本文' }, true);
    test.assertVisible('#success-msg' , '投稿後は投稿完了メッセージが表示される');
    this.click('#side-menu-0');
    test.assertEquals(this.fetchText('#post-title-0') , '新規タイトル' , '作成したタイトルが正しい');
    test.assertEquals(this.fetchText('#post-datetime-0') , '2000/01/01 13:00' , '作成した投稿日が正しい');
    test.assertEquals(this.fetchText('#post-body-0') , '新規本文' , '作成した本文が正しい');
    this.click('#side-menu-2');
  });

  /* カレンダーが表示されるか */
  casper.then(function() {
    test.comment('カレンダー表示');
    var getMonth = function(opt) {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      if (opt && opt > 0) {
        month += opt;
        if (month > 12) {
          year += 1;
          month = month - 12;
        }
      } else if (opt && opt < 0) {
        month += opt;
        if (month < 1) {
          year -= 1;
          month = 12 + month;
        }
      }
      return year + '年' + month + '月';
    }
    test.assertEquals(this.fetchText('article h1') , 'カレンダー' , 'カレンダー画面の見出しが正しい');
    test.assertEquals(this.fetchText('.calendar-year-month') , getMonth() , '現在年月が正しい');
    this.click('#next_month_btn');
    this.click('#next_month_btn');
    test.assertEquals(this.fetchText('.calendar-year-month') , getMonth(2) , '翌月に切り替えられる');
    this.click('#last_month_btn');
    test.assertEquals(this.fetchText('.calendar-year-month') , getMonth(1) , '前月に切り替えられる');
    this.click('#today_btn');
    test.assertEquals(this.fetchText('.calendar-year-month') , getMonth() , '今月に切り替えられる');

    test.comment('カレンダー内に記事を表示');
    test.assertEquals(this.fetchText('#calendar-id2 p') , 'ダミータイトル02' , 'カレンダー内に記事名が表示される1');
    test.assertEquals(this.fetchText('#calendar-id26 p') , 'ダミータイトル08' , 'カレンダー内に記事名が表示される2');
    this.click('#last_month_btn');
    test.assertEquals(this.fetchText('#calendar-id7 p') , 'ダミータイトル13' , 'カレンダー内に記事名が表示される3');
    test.assertEquals(this.fetchText('#calendar-id20 p') , 'ダミータイトル17' , 'カレンダー内に記事名が表示される4');
  });

  casper.run(function() {
    test.done();
  });

});
