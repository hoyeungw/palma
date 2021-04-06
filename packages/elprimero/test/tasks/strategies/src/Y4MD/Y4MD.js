import { joinY4MD, splitY4MD } from '../../../../../src/Y4MD/utils/parseY4MD'
import { monthCap } from '../../../../../src/Y4MD/utils/monthCap'
import { leapYear } from '../../../../../src/Y4MD/utils/leapYear'
import { calibre } from '../../../../../src/Y4MD/utils/calibre'

const daysForth = ([y, m, d], days) => {
  let lp = leapYear(y), cap
  d += days
  while ((cap = monthCap(m++, lp)) && d > cap) {
    d -= cap
    if (m > 12) {
      m = 1
      lp = leapYear(++y)
    }
  }
  return joinY4MD(y, --m, d)
}

const daysBack = ([y, m, d], days) => {
  if (d > days) return joinY4MD(y, m, d - days)
  d = days - d
  m--
  let lp = leapYear(y), cap
  if (m < 1) {
    m = 12
    lp = leapYear(--y)
  }
  while ((cap = monthCap(m, lp)) && d >= 0) {
    d -= cap
    if (d <= 0) continue
    if (--m < 1) {
      m = 12
      lp = leapYear(--y)
    }
  }
  return joinY4MD(y, m, (d > 0 ? d : -d))
}

export class Y4MD {
  static addYear (dt, qn) {
    let [y, m, d] = splitY4MD(dt)
    return calibre(+y + qn, +m, +d)
  }

  static addMonth (dt, qn) {
    let
      [y, m, d] = splitY4MD(dt),
      ym = +y * 0xc + +m + qn
    y = ~~(ym / 12)
    m = ym % 12
    return calibre(y, m, +d)
  }

  static subDays (dt, days) {
    // `Y4MD.subDays(${dt}, ${days})` |> console.log
    let [y, m, d] = typeof dt === 'string' ? splitY4MD(dt) : dt
    // let bonus = 0
    while (days >= 365) {
      days -= 365
      // y--
      if (m <= 2 && leapYear(--y) || m > 2 && leapYear(y--)) days--
    }
    // ({ y, m, d, days }) |> console.log
    return days >= 0
      ? daysBack([y, m, d], days)
      : daysForth([y, m, d], -days)
    // let ymd = bonus ? daysForth([y, m, d], bonus) |> splitY4MD : [y, m, d]
    // return daysBack(ymd, days)
  }

  static addDays (dt, days) {
    let [y, m, d] = typeof dt === 'string' ? splitY4MD(dt) : dt
    while (days >= 365) {
      days -= 365
      if (m <= 2 && leapYear(y++) || m > 2 && leapYear(++y)) days--
    }
    // ([y, m, d, days]) |> console.log
    return days >= 0
      ? daysForth([y, m, d], days)
      : daysBack([y, m, d], -days)
  }

  static subDays2 (dt, days) {
    let [y, m, d] = typeof dt === 'string' ? splitY4MD(dt) : dt
    return d > days ?
      joinY4MD(y, m, d - days)
      : daysBack([y, m, d], days)
  }
}
