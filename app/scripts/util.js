/*
  [Util] 汎用メソッド
*/
degulog.factory('util' , [function() {
  return {
    /* 時刻を特定のフォーマットに変換する */
    formatDate: function(date , format) {
      if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
      format = format.replace(/YYYY/g, date.getFullYear());
      format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
      format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
      format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
      format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
      format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
      if (format.match(/S/g)) {
        let milliSeconds = ('00' + date.getMilliseconds()).slice(-3).
            length = format.match(/S/g).length;
        for (let i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
      }
      return format;
    },
  };
}]);
