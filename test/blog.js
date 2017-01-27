var url = 'http://localhost:8086';
casper.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.74.9 (KHTML, like Gecko) Version/7.0.2 Safari/537.74.9");
casper.test.begin('飼育日記機能'  , function(test) {

  casper.start(url , function() {
    test.assertHttpStatus(200 , 'ステータスコードが200である');
    test.assertTitle('ぱずめいろぐ' , 'ページタイトルが正しく取得できている');
  });

  casper.then(function() {
    casper.wait(2000 , function() {
      this.capture('/vagrant/result.png');
      var subMenuTitle = this.fetchText('#sub-menu-title');
      test.comment(subMenuTitle);
      test.assert(subMenuTitle === 'ブログ' , 'サブメニューがブログに切り替わる');
    });
  });

  casper.run(function() {
    test.done();
  });

});
