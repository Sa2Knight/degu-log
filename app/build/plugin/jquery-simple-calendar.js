/*
 * jQuery Mini Calendar
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2016, k.ishiwata
 * http://www.webopixel.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
(function($) {
  $.wop = $.wop || {};
  $.wop.miniCalendar = function(targets,option){
    this.opts = $.extend({},$.wop.miniCalendar.defaults,option);
    this.ele = targets;

    // jsonファイルから読み込んだデータを入れる変数
    this.events = {};
    this.date = new Date();
    this.month = "";
    this.year = "";
    this.holiday = "";

    //表示する年月
    this.year = this.opts.year;
    this.month = this.opts.month;

    this.createFrame();
    this.printType(this.year, this.month);
    // 取得したイベントを表示
    this.events = this.opts.events;
    this.setEvent();
  };
  $.wop.miniCalendar.prototype = {

    /**
     * 枠を作成
     */
    createFrame : function() {
      var outText = '<table><thead><tr>';
      for (var i = 0; i < this.opts.weekType.length; i++) {
        if (i === 0) {
          outText += '<th class="calendar-sun">';
        } else if (i === this.opts.weekType.length-1) {
          outText += '<th class="calendar-sat">';
        } else {
          outText += '<th>';
        }
        outText += this.opts.weekType[i] +'</th>';
      }
      outText += '</thead><tbody></tbody></table>';
      this.ele.append(outText);
    },

    /**
     * 日付・曜日の配置
     */
    printType : function(thisYear, thisMonth) {

      var thisDate = new Date(thisYear, thisMonth-1, 1);

      // 開始の曜日
      var startWeek = thisDate.getDay();

      var lastday = new Date(thisYear, thisMonth, 0).getDate();
      // 縦の数
      //var rowMax = Math.ceil((lastday + (startWeek+1)) / 7);
      var rowMax = Math.ceil((lastday + startWeek) / 7);

      var outText = '<tr>';
      var countDate = 1;
      // 最初の空白を出力
      for (var i = 0; i < startWeek; i++) {
        outText += '<td class="calendar-none">&nbsp;</td>';
      }
      for (var row = 0; row < rowMax; row++) {
        // 最初の行は曜日の最初から
        if (row == 0) {
          for (var col = startWeek; col < 7; col++) {
            outText += printTD(countDate, col);
            countDate++;
          }
        } else {
          // 2行目から
          outText += '<tr>';
          for (var col = 0; col < 7; col++) {
            if (lastday >= countDate) {
              outText += printTD(countDate, col);
            } else {
              outText += '<td class="calendar-none">&nbsp;</td>';
            }
            countDate++;
          }
        }
        outText += '</tr>';
      }
      $(this.ele).find('tbody').html(outText);

      function printTD(count, col) {
        var dayText = "";
        var tmpId = ' id="calendar-id'+ count + '"';
        // 曜日classを割り当てる
        if (col === 0) tmpId += ' class="calendar-sun"';
        if (col === 6) tmpId += ' class="calendar-sat"';
        return '<td' + tmpId + '><i class="calendar-day-number">' + count + '</i>'+dayText+'</td>';
      }

      //今日の日付をマーク
      var toDay = new Date();
      if (thisYear === toDay.getFullYear()) {
        if (thisMonth === (toDay.getMonth()+1)) {
          var dateID = 'calendar-id' + toDay.getDate();
          $(this.ele).find('#' + dateID).addClass('calendar-today');
        }
      }
    },
    /**
     * イベントの表示
     */
    setEvent : function() {
      for(var i = 0; i < this.events.length; i++) {
        var dateID = 'calendar-id' + this.events[i].day;
        var labelClass = "calendar-label";
        if (this.events[i].type) {
          labelClass += '-' + this.events[i].type;
        }
        var calendarLabel = $('<span>').addClass('calendar-event').addClass(labelClass);
        if (this.events[i].onclick) {
          (function(f) {
            calendarLabel.addClass('pointer').click(function() {
              console.log('hoge');
              f();
            });
          })(this.events[i].onclick);
        }

        $(this.ele).find('#' + dateID).append(calendarLabel);
        calendarLabel.append($('<p>').text(this.events[i].text));
        /*this.events[i].images.forEach(function(i) {
          calendarLabel.append($('<img src="' + i + '">').prop('width' , '32'));
        });*/
      }
    },
  };

  $.wop.miniCalendar.defaults = {
    weekType : ["日", "月", "火", "水", "木", "金", "土"],
    year : new Date().getFullYear(),
    month : new Date().getMonth()+1,
  };
  $.fn.miniCalendar = function(option){
    option = option || {};
    var api = new $.wop.miniCalendar(this,option);
    return option.api ? api : this;
  };
})(jQuery);
