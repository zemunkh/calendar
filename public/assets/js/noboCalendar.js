var noboCalendar = {
  month: document.querySelectorAll('[data-calendar-area="month-nobo"]')[0],
  next: document.querySelectorAll('[data-calendar-toggle="next-nobo"]')[0],
  previous: document.querySelectorAll('[data-calendar-toggle="previous-nobo"]')[0],
  label: document.querySelectorAll('[data-calendar-label="month-nobo"]')[0],
  label2: document.querySelectorAll('[data-calendar-label="month-nobo-tomorrow"]')[0],
  label3: document.querySelectorAll('[data-calendar-label="month-nobo-dayAfterTomorrow"]')[0],

  activeDates: null,
  date: new Date(),
  todaysDate: new Date(),

  init: function (options) {
    this.options = options
    this.date.setDate(1)
    // this.createMonth()
    this.slideDay()
    this.createListeners()
  },

  createListeners: function () {
    var _this = this
    this.next.addEventListener('click', function () {
      _this.clearCalendar()
      // var nextMonth = _this.date.getMonth() + 1
      // _this.date.setMonth(nextMonth)
      // _this.createMonth()


      var nextDay = _this.date.getDate() + 1
      _this.date.setDate(nextDay)
      _this.slideDay()
    })
    // Clears the calendar and shows the previous month
    this.previous.addEventListener('click', function () {
      _this.clearCalendar()
      // var prevMonth = _this.date.getMonth() - 1
      // _this.date.setMonth(prevMonth)
      // _this.createMonth()

      var prevDay = _this.date.getDate() - 1
      _this.date.setDate(prevDay)
      _this.slideDay()
    })
  },

  slideDay: function () {
    var currentWeekday = this.date.getDay()
    // while(this.date.getDay() < 6){
    //   this.createWeekDay(
    //     this.date.getDate(),
    //     this.date.getDay(),
    //     this.date.getFullYear()
    //   )
    //   this.date.setDate(this.date.getDate() + 1)
    // }
    //
    // this.date.setDate(1)
    // this.date.setMonth(this.date.getDate() - 1)

    this.label.innerHTML =
      this.monthsAsString(this.date.getMonth()) + this.date.getDate()
      + ',  ' + this.weekdaysAsString(this.date.getDay())

    // if (this.date.getDay() === 6) {
    //   this.label2.innerHTML =
    //     this.monthsAsString(this.date.getMonth()) + (this.date.getDate() + 1)
    //     + ',  ' + this.weekdaysAsString(0)
    // } else {
    //   this.label2.innerHTML =
    //     this.monthsAsString(this.date.getMonth()) + (this.date.getDate() + 1)
    //     + ',  ' + this.weekdaysAsString(this.date.getDay() + 1)
    // }
    //
    // if (this.date.getDay() === 5) {
    //   this.label3.innerHTML =
    //     this.monthsAsString(this.date.getMonth()) + (this.date.getDate() + 2)
    //     + ',  ' + this.weekdaysAsString(0)
    // } else if(this.date.getDay() === 6) {
    //   this.label3.innerHTML =
    //     this.monthsAsString(this.date.getMonth()) + (this.date.getDate() + 2)
    //     + ',  ' + this.weekdaysAsString(1)
    // } else {
    //   this.label3.innerHTML =
    //     this.monthsAsString(this.date.getMonth()) + (this.date.getDate() + 2)
    //     + ',  ' + this.weekdaysAsString(this.date.getDay() + 2)
    // }

  },
// num = a day of month
// day = weekday
// year

  createWeekDay: function(num, day, year) {
    var newDay = document.createElement('div')
    var dateEl = document.createElement('span')
    dateEl.innerHTML = num
    newDay.className = 'vcal-date'
    newDay.setAttribute('data-calender-date', this.date)

    if(num === 1) {
      if(day === 0) {
        newDay.style.marginLeft = (6 * 14.28) + '%'
      } else {
        newDay.style.marginLeft = ((day - 1) * 14.28) + '%'
      }
    }

    if (this.options.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1) {
      newDay.classList.add('vcal-date--disabled')
    } else {
      newDay.classList.add('vcal-date--active')
      newDay.setAttribute('data.calendar-status', 'active')
    }

    if (this.date.toString() === this.todaysDate.toString()) {
      newDay.classList.add('vcal-date--today')
    }

    newDay.appendChild(dateEl)
    this.month.appendChild(newDay)
  },

  createDay: function (num, day, year) {
    var newDay = document.createElement('div')
    var dateEl = document.createElement('span')
    dateEl.innerHTML = num
    newDay.className = 'ncal-date'
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
      newDay.classList.add('ncal-date--disabled')
    } else {
      newDay.classList.add('ncal-date--active')
      newDay.setAttribute('data-calendar-status', 'active')
    }

    if (this.date.toString() === this.todaysDate.toString()) {
      newDay.classList.add('ncal-date--today')
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
        this.classList.add('ncal-date--selected')
      })
    }
  },

  createMonth: function () {
    var currentMonth = this.date.getMonth()
    while (this.date.getMonth() === currentMonth) {
      this.createDay(
        this.date.getDate(), // Month Day
        this.date.getDay(),  // Weekday
        this.date.getFullYear() 
      )
      this.date.setDate(this.date.getDate() + 1)
    }
    // while loop trips over and day is at 30/31, bring it back
    this.date.setDate(1)
    this.date.setMonth(this.date.getMonth() - 1)

    // this.label_1.innerHTML =
    //   this.date.getFullYear() + ' ' + this.monthsAsString(this.date.getMonth()) + ', ' + this.weekdaysAsString(this.todaysDate.getDay())
    // this.label_2.innerHTML =
    //   this.monthsAsString(this.date.getMonth()) + ', ' + this.weekdaysAsString(this.todaysDate.getDay() + 1)

    // this.label.innerHTML =
    //   this.monthsAsString(this.date.getMonth()) + this.todaysDate.getDate()
    //   + ',  ' + this.weekdaysAsString(this.todaysDate.getDay())
    //
    // this.label2.innerHTML =
    //   this.monthsAsString(this.date.getMonth()) + (this.todaysDate.getDate() + 1)
    //   + ',  ' + this.weekdaysAsString(this.todaysDate.getDay() + 1)

    this.dateClicked()
  },

  monthsAsString: function (monthIndex) {
    return [
      'I-',
      'II-',
      'III-',
      'IV-',
      'V-',
      'VI-',
      'VII-',
      'VIII-',
      'IX-',
      'X-',
      'XI-',
      'XII-'
    ][monthIndex]
  },

  weekdaysAsString: function (weekdayIndex) {
    return [
      'Ням',
      'Даваа',
      'Мягмяр',
      'Лхагва',
      'Пүрэв',
      'Баасан',
      'Бямба'
    ][weekdayIndex]
  },

  clearCalendar: function () {
    noboCalendar.month.innerHTML = ''
  },

  removeActiveClass: function () {
    for (var i = 0; i < this.activeDates.length; i++) {
      this.activeDates[i].classList.remove('ncal-date--selected')
    }
  }
}
