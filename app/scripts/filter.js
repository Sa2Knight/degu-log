/* テキストを指定した文字数で省略する */
degulog.filter('abbreviate', function () {
  return function (text, len, end) {
    len = len || 10;
    end = end || "…";
    if (text.length > len) {
      return text.substring(0, len - 1) + end;
    }
    return text;
  };
});
