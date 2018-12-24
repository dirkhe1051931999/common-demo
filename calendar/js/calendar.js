/*
 * @Author: hejian@myhexin.com
 * @Date: 2018-12-18 14:50:52
 * @Last Modified by: hejian
 * @Last Modified time: 2018-12-24 21:49:20
 * @desc 构造函数和原型组合模式实现日历控件
 */

(function($) {
  // 构造函数
  var Calendar = function(elem, options) {
    this.$calendar = elem
    this.weeknum = thisweek()[1]
    this.clickListDay = options.clickListDay
    this.clickWeekDay = options.clickWeekDay
  }
  // 原型链
  Calendar.prototype = {
    // 填充一月日子dom
    showCalendar: function() {
      // this指向当前的构造函数
      var that = this
      // dateObj是封装好的时间对象 dateObj.getDate()是当月的标准化时间
      // 计算当前的年份
      var year = dateObj.getDate().getFullYear()
      // 计算当前月份
      var month = dateObj.getDate().getMonth() + 1
      // 获取当前的日子以yymmdd形式返回
      var dateStr = returnDateStr(dateObj.getDate())
      // 获取当月的第一天
      var firstDay = new Date(year, month - 1, 1)
      // 左上角显示当前时间
      this.$calendarTitle_text.text(dateStr)
      // 遍历所有的天数
      this.$calendarDate_item.each(function(i) {
        // 得到当前列表显示的所有日子 6*7结构
        var allDay = new Date(year, month - 1, i + 1 - firstDay.getDay())
        // 把日子转换成yy-mm-dd形式
        var allDay_str = returnDateStr(allDay)
        // this指向所有的日子dom
        // 写上日子，再附上yymmdd的时间
        $(this)
          .text(allDay.getDate())
          .data('date', allDay_str)
          .data('index', i)
        // 如果是当前日子，那么就高亮一下
        if (returnDateStr(new Date()) === allDay_str) {
          $(this)
            .attr('class', 'item item-curMonth item-curSelDay item-curDay')
            .data('day', '0')
          if (
            changingStr(allDay_str).getDay() === 0 ||
            changingStr(allDay_str).getDay() === 6
          ) {
            $(this).removeClass('item-curMonth')
          }
          // 存储当日的序号
          that.curSelDay2 = i
          // 当存当天的日期
          that.curDay = dateStr
          // 如果是这个月日子，就加黑一下
        } else if (
          returnDateStr(firstDay).substr(0, 7) === allDay_str.substr(0, 7) &&
          changingStr(allDay_str).getDay() !== 0 &&
          changingStr(allDay_str).getDay() !== 6
        ) {
          $(this)
            .attr('class', 'item item-curMonth')
            .data('day', '1')
          // 如果是上个月日子，就置灰一下
        } else {
          $(this)
            .attr('class', 'item')
            .data('day', '-1')
        }
      })
    },
    // 填充一周日子dom
    showCalendarWeek: function(year, weeknum) {
      var that = this
      var newdate = ''
      // 当前月份
      var month = dateObj.getDate().getMonth() + 1
      //获取周第一天日期
      var datastart = weekFirstDay(year, weeknum)
      // 获取当月的第一天
      var firstDay = new Date(year, month - 1, 1)
      // 获取今天时间数组
      var todayarr = todaydate()
      // 拼接时间
      var dateStr = todayarr.join('-')
      this.$calendarDate_item_week.each(function(i) {
        newdate = new Date(datastart[0], datastart[1], datastart[2] + i)
        $(this)
          .text(newdate.getDate())
          .data('date', returnDateStr(newdate))
          .data('index', i)
        if (
          newdate.getFullYear() == todayarr[0] &&
          newdate.getMonth() == todayarr[1] &&
          newdate.getDate() == todayarr[2] &&
          !that.date
        ) {
          $(this)
            .attr('class', 'item item-curMonth item-curSelDay item-curDay')
            .data('day', '0')
          if (
            changingStr(returnDateStr(newdate)).getDay() === 0 ||
            changingStr(returnDateStr(newdate)).getDay() === 6
          ) {
            $(this).removeClass('item-curMonth')
          }
          // 存储当日的序号
          that.curSelDay = i
          // 当存当天的日期
          that.curDay = dateStr
        } else if (
          firstDay.getMonth() === newdate.getMonth() &&
          changingStr(returnDateStr(newdate)).getDay() !== 0 &&
          changingStr(returnDateStr(newdate)).getDay() !== 6
        ) {
          // 如果是这个月日子，就加黑一下
          $(this)
            .attr('class', 'item item-curMonth')
            .data('day', '1')
        } else {
          // 如果是上个月日子，就置灰一下
          $(this)
            .attr('class', 'item')
            .data('day', '-1')
        }
        if (returnDateStr(newdate) === that.date) {
          $(this)
            .attr('class', 'item item-curMonth item-curSelDay')
            .data('day', '1')
        }
      })
      var _weekLastDay = $(
        that.$calendarDate_item_week[that.$calendarDate_item_week.length - 1]
      ).data('date')
      var _listLastDay = $(
        that.$calendarDate_item[that.$calendarDate_item.length - 1]
      ).data('date')
      var _weekFirstDay = $(that.$calendarDate_item_week[0]).data('date')
      var _listFirstDay = $(that.$calendarDate_item[0]).data('date')
      if (_weekLastDay === _listLastDay) {
				this.$next.css('visibility', 'hidden')
      } else {
        this.$next.css('visibility', 'visible')
      }
      if (_weekFirstDay === _listFirstDay) {
        this.$prev.css('visibility', 'hidden')
      } else {
        this.$prev.css('visibility', 'visible')
      }
    },
    // 渲染DOM
    renderDOM: function() {
      // 标题dom结构
      this.$calendar_title = $('<div class="calendar-title"></div>')
      // 周dom结构
      this.$calendar_week = $('<ul class="calendar-week"></ul>')
      // 日子dom结构
      this.$calendar_date = $(
        '<ul class="calendar-date" style="display:none"></ul>'
      )
      // 周dom结构
      this.$calendar_date_week = $('<ul class="calendar-date-week"></ul>')
      // 展开收起按钮
      this.$fold_btn = $('<p class="fold">展开</p>')
      // 上一周
      this.$prev = $('<p class="prev">上一周</p>')
      // 下一周
      this.$next = $('<p class="next">下一周</p>')
      // 折叠区域
      this.$foldarea = $('<div class="foldarea"></div>')
      // 标题
      var _titleStr = '<a href="javascript:;" class="title"></a>'
      // 周
      var _weekStr =
        '<li class="item">日</li>' +
        '<li class="item">一</li>' +
        '<li class="item">二</li>' +
        '<li class="item">三</li>' +
        '<li class="item">四</li>' +
        '<li class="item">五</li>' +
        '<li class="item">六</li>'
      // 日子
      var _dateStr = ''
      var _weekDay = ''
      // 浮窗
      var _dayStr =
        '<i class="triangle"></i>' +
        '<p class="date"></p>' +
        '<p class="week"></p>'
      // 遍历
      for (var i = 0; i < 6; i++) {
        _dateStr +=
          '<li class="item">--</li>' +
          '<li class="item">--</li>' +
          '<li class="item">--</li>' +
          '<li class="item">--</li>' +
          '<li class="item">--</li>' +
          '<li class="item">--</li>' +
          '<li class="item">--</li>'
      }
      for (var j = 0; j < 7; j++) {
        _weekDay += '<li class="item">--</li>'
      }
      // 日历的标题dom
      this.$calendar_title.html(_titleStr)
      // 日历的周dom
      this.$calendar_week.html(_weekStr)
      // 日历的日子dom
      this.$calendar_date.html(_dateStr)
      // 一周日子dom
      this.$calendar_date_week.html(_weekDay)
      // 折叠区域
      this.$foldarea.append(this.$prev, this.$fold_btn, this.$next)
      // 把这些插入父级dom里
      this.$calendar.append(
        this.$calendar_title,
        this.$calendar_week,
        this.$calendar_date_week,
        this.$foldarea,
        this.$calendar_date,
        this.$calendar_today
      )
      // 插入完显示
      this.$calendar.show()
    },
    // 初始化操作
    inital: function() {
      // this指向当前的构造函数
      var that = this
      var flag = false
      // 先渲染dom
      this.renderDOM()
      // 获取左上角显示的日期dom
      this.$calendarTitle_text = this.$calendar_title.find('.title')
      // 获取日子的dom
      this.$calendarDate_item = this.$calendar_date.find('.item')
      //  获取周日子的dom
      this.$calendarDate_item_week = this.$calendar_date_week.find('.item')
      // 填充日子dom
      this.showCalendar()
      // 填充周日子dom
      this.showCalendarWeek(thisweek()[0], thisweek()[1])
      //  日子在click的时候
      this.$calendarDate_item.click(function() {
        // 从周点击返回只触发一次
        if (flag) {
          that.$calendarDate_item.each(function(i) {
            if ($(this).hasClass('item-curSelDay')) {
              $(this).removeClass('item-curSelDay')
            }
          })
          flag = false
        }
        // 记录索引
        var index = $(this).data('index')
        // 记录点击的日期
        var date = $(this).data('date')
        // 移除上一次点击的日子样式
        $(that.$calendarDate_item[that.curSelDay2]).removeClass(
          'item-curSelDay'
        )
        // 存储这次点击的索引
        that.curSelDay2 = index
        // 增加选中的样式
        $(this).addClass('item-curSelDay')
        // 更改标题样式
        $(that.$calendarTitle_text).text(date)
        that.clickListDay($(this))
      })
      // 周日子在点击的时候
      this.$calendarDate_item_week.click(function() {
        flag = true
        // 记录点击的日期
        that.date = $(this).data('date')
        // 移除上一次点击的日子样式
        $(that.$calendarDate_item_week[that.curSelDay]).removeClass(
          'item-curSelDay'
        )
        // 记录索引
        that.$calendarDate_item_week.each(function(i) {
          if ($(this).hasClass('item-curSelDay')) {
            $(this).removeClass('item-curSelDay')
          }
          if ($(this).data('date') == that.date) {
            $(this).addClass('item-curSelDay')
          }
        })
        // 同步完整的日子
        that.$calendarDate_item.each(function(i) {
          if ($(this).hasClass('item-curSelDay')) {
            $(this).removeClass('item-curSelDay')
          }
          if ($(this).data('date') == that.date) {
            $(this).addClass('item-curSelDay')
          }
        })
        // 更改标题样式
        $(that.$calendarTitle_text).text(that.date)
        that.clickWeekDay($(this))
      })
      this.$fold_btn.click(function() {
        that.$calendar_date_week.css('display', 'none')
        that.$calendar_date.css('display', 'block')
        $(this).css('display', 'none')
        that.$prev.css('display', 'none')
        that.$next.css('display', 'none')
      })

      this.$next.click(function() {
        that.weeknum += 1
        var nowweek = thisweek()
        var beforeweekfirst = weekFirstDay(nowweek[0], that.weeknum)
        var beforeweekdata = getweeknum(
          beforeweekfirst[0],
          beforeweekfirst[1],
          beforeweekfirst[2]
        )
        that.showCalendarWeek(beforeweekdata[0], beforeweekdata[1])
      })
      this.$prev.click(function() {
        that.weeknum -= 1
        var nowweek = thisweek()
        var beforeweekfirst = weekFirstDay(nowweek[0], that.weeknum)
        var beforeweekdata = getweeknum(
          beforeweekfirst[0],
          beforeweekfirst[1],
          beforeweekfirst[2]
        )
        that.showCalendarWeek(beforeweekdata[0], beforeweekdata[1])
      })
    },
    constructor: Calendar
  }
  // 实例化
  $.fn.calendar = function(options) {
    return new Calendar(this, options).inital()
  }
  // 存储标准化时间
  var dateObj = (function() {
    var _date = new Date()
    return {
      getDate: function() {
        return _date
      },
      setDate: function(date) {
        _date = date
      }
    }
  })()
  // 日期转字符串
  function returnDateStr(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    month = month <= 9 ? '0' + month : '' + month
    day = day <= 9 ? '0' + day : '' + day
    return year + '-' + month + '-' + day
  }
  // 字符串转日期
  function changingStr(fDate) {
    var fullDate = fDate.split('-')
    return new Date(fullDate[0], fullDate[1] - 1, fullDate[2])
  }
  // 判断是否是闰年
  function is_leap(year) {
    return year % 100 == 0
      ? (res = year % 400 == 0 ? 1 : 0)
      : (res = year % 4 == 0 ? 1 : 0)
  }
  // 获取每周的第一天
  function weekFirstDay(year, weeknum) {
    //获取当年月份天数数组
    var monthDays = [
      31,
      28 + is_leap(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31
    ]
    //获取当年第一天是周几
    var newYearWeek = new Date(year, 0, 1).getDay()
    //新年到周第一天的总天数
    var weekDays
    if (newYearWeek < 5) {
      //新年第一天算年内第一周[周四在本年]
      weekDays = 7 * (weeknum - 2) + (7 - newYearWeek + 1)
    } else {
      //新年第一天是上年最后一周
      weekDays = 7 * (weeknum - 1) + (7 - newYearWeek + 1)
    }
    var startmonth
    for (var i = 0; i < monthDays.length; i++) {
      startmonth = i
      if (weekDays > monthDays[i]) {
        weekDays -= monthDays[i]
        if (i == monthDays.length - 1) {
          year++
          startmonth = 0
        }
      } else {
        break
      }
    }
    return [year, startmonth, weekDays]
  }
  //传入日期为当年第几周
  function getweeknum(year, month, day) {
    //获取月份天数数组
    var m_days = [
      31,
      28 + is_leap(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31
    ]
    var newtonowday = 0
    for (var i = 0; i < month; i++) {
      newtonowday += m_days[i]
    }
    newtonowday += day
    //获取当年第一天是周几
    var newyear_week = new Date(year, 0, 1).getDay()
    var fdaynothisy = false
    //新年到周第一天的总天数
    if (newyear_week < 5) {
      //新年第一天算年内第一周[周四在本年]
      newtonowday += newyear_week
      if (newyear_week == 0 && m_days[2] == 29) {
        fdaynothisy = true
      }
    } else {
      //新年第一天是上年最后一周
      fdaynothisy = true
      newtonowday -= 7 - newyear_week
    }
    var weeknum_result = Math.ceil(newtonowday / 7)
    var weekyear = year
    if (weeknum_result == 0) {
      var beforeyear_fweek = new Date(weekyear - 1, 0, 1).getDay()
      if (beforeyear_fweek < 5 && beforeyear_fweek > 1 && fdaynothisy) {
        weeknum_result = 53
      } else {
        weeknum_result = 52
      }
      weekyear--
    } else if (weeknum_result > 52) {
      var year_lweek = new Date(year, 11, 31).getDay()
      if (year_lweek > 3 && newyear_week < 5) {
        weeknum_result = 53
      } else {
        weekyear++
        weeknum_result = 1
      }
    }
    return [weekyear, weeknum_result]
  }
  //获取今天
  function todaydate() {
    var nstr = new Date()
    var ynow = nstr.getFullYear()
    var mnow = nstr.getMonth()
    var dnow = nstr.getDate()
    return [ynow, mnow, dnow]
  }
  // 获取本周
  function thisweek() {
    var todayarr = todaydate()
    var weekdata = getweeknum(todayarr[0], todayarr[1], todayarr[2])
    return weekdata
  }
})(Zepto)
