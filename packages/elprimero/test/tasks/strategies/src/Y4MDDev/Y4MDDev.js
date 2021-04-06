import { monthCap } from '../../../../../src/Y4MD/utils/monthCap'
import { leapYear } from '../../../../../src/Y4MD/utils/leapYear'

const nextMonth = ([y, m, lp]) => ++m > 12 ? [++y, 1, leapYear(y)] : [y, m, lp]
const prevMonth = ([y, m, lp]) => --m < 1 ? [--y, 12, leapYear(y)] : [y, m, lp]

const yearForth = ([y, m], days) => {
  while (days >= 365) {
    days -= 365
    if (m <= 2 && leapYear(y++) || m > 2 && leapYear(++y)) days--
  }
  return [[y, m], days]
}

const yearBack = ([y, m], days) => {
  while (days <= -365) {
    days += 365
    if (m <= 2 && leapYear(--y) || m > 2 && leapYear(y--)) days++
  }
  return [[y, m], days]
}

const daysForth = ([y, m], days) => {
  let lp = leapYear(y), cap
  while ((cap = monthCap(m, lp)) && days > cap) {
    days -= cap;
    [y, m, lp] = [y, m, lp] |> nextMonth
  }
  return [y, m, days]
}

const daysBack = ([y, m], days) => {
  let lp = leapYear(y), cap = 0
  while (days < cap) {
    [y, m, lp] = [y, m, lp] |> prevMonth
    cap = monthCap(m, lp)
    days += cap
  }
  return daysForth([y, m], days)
}

export class Y4MDDev {
  static addDays (ymd, days) {
    let [y, m, d] = ymd, ym;
    [ym, days] = yearForth([y, m], d + days)
    return days >= 0
      ? daysForth(ym, days)
      : daysBack(ym, days)
  }

  static subDays (ymd, days) {
    let [y, m, d] = ymd, ym;
    [ym, days] = yearBack([y, m], d - days)
    return days >= 0
      ? daysForth(ym, days)
      : daysBack(ym, days)
  }
}
