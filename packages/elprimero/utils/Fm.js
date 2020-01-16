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

export class Fm {
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

export const padMilli = (ms) => {
  ms = '' + ms
  return ms.length > 2 ? ms : ('00' + ms).slice(-3)
}
