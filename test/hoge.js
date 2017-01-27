var page = require('webpage').create();
page.open('http://localhost:8086', function () {
    window.setTimeout(function () {
        page.render('/vagrant/result.png');
        phantom.exit();
    }, 200);
});
