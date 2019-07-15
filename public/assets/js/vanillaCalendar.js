var vanillaCalendar = {
  month: document.querySelectorAll('[data-calendar-area="month"]')[0],
  next: document.querySelectorAll('[data-calendar-toggle="next"]')[0],
  previous: document.querySelectorAll('[data-calendar-toggle="previous"]')[0],
  label: document.querySelectorAll('[data-calendar-label="month"]')[0],
  activeDates: null,
  date: new Date(),
  todaysDate: new Date(),

  init: function (options) {
    this.options = options
    this.date.setDate(1)
    this.createMonth(0)
    this.createListeners()
  },
  createListeners: function () {
    var _this = this


    this.next.addEventListener('click', function () {
      var weekNum = 0;
      var day = _this.date.getDate()
      console.log("First Day of the next week is: " + day + " Month is " + _this.date.getMonth())
      var n = day/7
      var dec_portion = Math.floor(n);
      var rem_portion = n - Math.floor(n)
      // console.log("day remains: " + Math.floor(n) + " Decimal: " + (n - Math.floor(n)))
      if(rem_portion === 0) {
        var weekNum = dec_portion;
        console.log("Week #" + weekNum)
      } else {
        var weekNum = dec_portion + 1;
        console.log("Week #" + weekNum)
      }

      _this.clearCalendar()
      // var nextMonth = _this.date.getMonth() + 1
      // _this.date.setMonth(nextMonth)
      _this.date.setDate(day)
      _this.createMonth(weekNum)
    })
    // Clears the calendar and shows the previous month
    this.previous.addEventListener('click', function () {
      _this.clearCalendar()
      var prevMonth = _this.date.getMonth() - 1
      _this.date.setMonth(prevMonth)
      _this.createMonth(1)
    })
  },

  createDay: function (num, day, year) {
    var newDay = document.createElement('div')
    var dateEl = document.createElement('span')
    dateEl.innerHTML = num
    newDay.className = 'vcal-date'
    newDay.setAttribute('data-calendar-date', this.date)

    // if it's the first day of the month
    if (num === 1) {
      if (day === 0) {
        newDay.style.marginLeft = (6 * 14.28) + '%'
      } else {
        newDay.style.marginLeft = ((day - 1) * 14.28) + '%'
      }
    }

    if (this.options.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1) {
      newDay.classList.add('vcal-date--disabled')
    } else {
      newDay.classList.add('vcal-date--active')
      newDay.setAttribute('data-calendar-status', 'active')
    }

    if (this.date.toString() === this.todaysDate.toString()) {
      newDay.classList.add('vcal-date--today')
    }

    newDay.appendChild(dateEl)
    this.month.appendChild(newDay)
  },

  dateClicked: function () {
    var _this = this
    this.activeDates = document.querySelectorAll(
      '[data-calendar-status="active"]'
    )
    for (var i = 0; i < this.activeDates.length; i++) {
      this.activeDates[i].addEventListener('click', function (event) {
        var picked = document.querySelectorAll(
          '[data-calendar-label="picked"]'
        )[0]
        picked.innerHTML = this.dataset.calendarDate
        _this.removeActiveClass()
        this.classList.add('vcal-date--selected')
      })
    }
  },

  createMonth: function (weekNum) {
    var week = 0
    if (weekNum === 0) {
      var day = this.todaysDate.getDate()
      this.date.setDate(day)
      var n = day/7
      var dec_portion = Math.floor(n);
      var rem_portion = n - Math.floor(n)
      // console.log("day remains: " + Math.floor(n) + " Decimal: " + (n - Math.floor(n)))
      if(rem_portion === 0) {
        var week = dec_portion;
        console.log("Week #" + week)
      } else {
        var week = dec_portion + 1;
        console.log("Week #" + week)
      }
      weekNum = week
    } else {
      var day = this.date.getDate()
      var n = day/7
      var dec_portion = Math.floor(n);
      var rem_portion = n - Math.floor(n)
      // console.log("day remains: " + Math.floor(n) + " Decimal: " + (n - Math.floor(n)))
      if(rem_portion === 0) {
        var week = dec_portion;
        console.log("Week #" + week)
      } else {
        var week = dec_portion + 1;
        console.log("Week #" + week)
      }
    }


    var currentMonth = this.date.getMonth()
    // while (this.date.getMonth() === currentMonth) {
    while (weekNum === week) {
      this.createDay(
        this.date.getDate(),
        this.date.getDay(),
        this.date.getFullYear(),
      )
      if (this.date.getDay() === 0) {
        this.date.setDate(7*week + 1)
        console.log("Week : " + week + " -- Days: " + (7*week + 1))
        week++
      } else {
        if(this.date.getDate() === 1 && week > 3) {
          week = 1
          this.date.setDate(1)
        } else {
          this.date.setDate(this.date.getDate() + 1)
        }
      }

    }
    // while loop trips over and day is at 30/31, bring it back
    // this.date.setDate(1)
    // this.date.setMonth(this.date.getMonth() - 1)


    this.label.innerHTML =
      this.date.getDate() + ' ' + this.monthsAsString(this.date.getMonth())
    this.dateClicked()
  },

  monthsAsString: function (monthIndex) {
    return [
      'I-сар',
      'II-сар',
      'III-сар',
      'IV-сар',
      'V-сар',
      'VI-сар',
      'VII-сар',
      'VIII-сар',
      'IX-сар',
      'X-сар',
      'XI-сар',
      'XII-сар'
    ][monthIndex]
  },

  clearCalendar: function () {
    vanillaCalendar.month.innerHTML = ''
  },

  removeActiveClass: function () {
    for (var i = 0; i < this.activeDates.length; i++) {
      this.activeDates[i].classList.remove('vcal-date--selected')
    }
  }
}
