const
  _d_2 = '2-digit',
  _num = 'numeric'
const
  confDate = {
    year: _d_2,
    month: _d_2,
    day: _d_2
  },
  confTime = {
    hour: _num,
    minute: _num,
    second: _num,
    hour12: false
  }

class Fm {
  /**
   *
   * @type {Intl.DateTimeFormat}
   */
  static Day = new Intl.DateTimeFormat(
    undefined,
    confDate
  )

  /**
   *
   * @type {Intl.DateTimeFormat}
   */
  static Time = new Intl.DateTimeFormat(
    undefined,
    confTime
  )

  /**
   *
   * @type {Intl.DateTimeFormat}
   */
  static DayTime = new Intl.DateTimeFormat(
    undefined,
    {
      ...confDate,
      ...confTime
    }
  )
}

const padMilli = (ms) => {
  ms = '' + ms
  return ms.length > 2 ? ms : ('00' + ms).slice(-3)
}

class GP {
  /**
   * hh:mm:ss
   * @param {Date} [date=new Date()]
   * @returns {string}
   */
  static roughly (date = new Date()) {
    return Fm.Time.format(date)
  }

  /**
   * hh:mm:ss.mmm
   * @param {Date} date
   * @returns {string}
   */
  static time (date = new Date()) {
    return `${Fm.Time.format(date)}.${padMilli(date.getMilliseconds())}`
  }

  static vec (date = new Date()) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  }

  static y4md (date = new Date(), de = '-') {
    return [
      String(date.getFullYear()).padStart(4, '0'),
      String(date.getMonth() + 1).padStart(2, '0'),  //Months are zero based
      String(date.getDate()).padStart(2, '0')
    ].join(de)
  }

  static mdy (date = new Date()) {
    return Fm.Day.format(date)
  }

  static dateTime (date = new Date()) {
    return Fm.DayTime.format(date)
  }

  /**
   * Return string of current time.
   * Format: hh:mm:ss
   * @return {string}
   */
  static roughlyNow () {
    return Fm.Time.format(new Date())
  }

  /**
   * Return string of current time with 3-digit milliseconds.
   * Format: hh:mm:ss.mmm
   * @return {string}
   */
  static now () {
    let d = new Date()
    return `${Fm.Time.format(d)}.${padMilli(d.getMilliseconds())}`
  }

  /**
   * Return current date array in [Y,M,D] order.
   * @returns {*[]}
   */
  static todayVec () {
    const td = new Date()
    //Months are zero based
    return [td.getFullYear(), td.getMonth() + 1, td.getDate()]
  }

  /**
   * Return current date in YYYY-MM-DD format, the delimiter '-' can be replaced by setting parameter 'de'
   * @param {string} [de='-'] - delimiter
   * @returns {string}
   */
  static today (de = '-') {
    const td = new Date()
    return [
      String(td.getFullYear()).padStart(4, '0'),
      String(td.getMonth() + 1).padStart(2, '0'),  //Months are zero based
      String(td.getDate()).padStart(2, '0')
    ].join(de)
  }

  /**
   * Return current date in MM/DD/YY format.
   * Format: mm/dd/yy
   * @return {string}
   */
  static todayMDY () {
    return Fm.Day.format(new Date())
  }

  /**
   * Return string of current date with time.
   * Format: mm/dd/yy, hh:mm:ss
   * @return {string}
   */
  static present () {
    return Fm.DayTime.format(new Date())
  }
}

export {
  Fm,
  GP
}
