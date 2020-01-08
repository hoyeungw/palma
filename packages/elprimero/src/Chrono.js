import { ArrX} from 'xbrief'
import { Mx, Ar } from 'veho'
import { ETA } from './ETA'
import { GP } from './GP'
import { CrosTab } from 'crostab'
import { Stat } from 'borel'
import { Visual } from 'spettro'

const _reh = (r, func, params) => {
  for (--r; r > 0; r--) func.apply(null, params)
  return func.apply(null, params)
}

// const _rehRest = (repeat, func, ...params) => {
//   for (let i = --repeat; !!i; --i) func.call(null, ...params)
//   return func.call(null, ...params)
// }

class Chrono {
  /**
   *
   * @param {number} repeat
   * @param {function} func
   * @param {...*[]} [params]
   * @return {*}
   */
  static rehearsalRest (repeat, func, ...params) {
    for (--repeat; repeat > 0; repeat--) func.call(null, ...params)
    return func.call(null, ...params)
  }

  /**
   *
   * @param {number} repeat
   * @param {function} func
   * @param {...*[]} [params]
   * @return {*}
   */
  static rehearsalArgs (repeat, func, params) {
    for (--repeat; repeat > 0; repeat--) func.call(null, params)
    return func.call(null, params)
  }

  /**
   * Cross by repeatList and functions.
   * Each function contains no parameter.
   * @param {number[]} repeatList
   * @param {Object<string,function>} funcList
   * @param {*[]} [params]
   * @returns {CrosTab}
   */
  static crossByRepeatsAndFuncs ({ repeatList, funcList, params = [] }) {
    const eta = new ETA()
    const [side, banner] = [repeatList, Object.keys(funcList)]
    const [ht, wd] = [side.length, banner.length]
    const [lapseX, valueRow] = [
      Mx.ini(ht, wd, (i, j) => 0),
      Ar.ini(wd, () => null)
    ]
    eta.ini()
    for (let [x, repeat] of Object.entries(repeatList)) {
      GP.now().tag(
        `[${x}] (${repeat}): repeat for each of [${Object.keys(funcList) |> ArrX.hBrief}]`
      ) |> console.log
      eta.split()
      for (let [y, func] of Object.values(funcList).entries()) {
        valueRow[y] = _reh(repeat, func, params)
        lapseX[x][y] = eta.split()
      }
    }
    return new CrosTab(side, banner, lapseX, 'repeat #')
      .unshiftRow('result', valueRow)
  }

  /**
   * Cross by paramsList and functions, under certain repeat.
   * Each function receives the same list of paramsList.
   * @param {number} repeat
   * @param {Object<string,*[]>} paramsList - each value is an array of parameters.
   * @param {Object<string,function>} funcList
   * @param {{showAverage:boolean,showParamsValues:boolean}} [config]
   * @returns {{lapse:CrosTab,result:CrosTab}}
   */
  static strategies ({
    repeat, paramsList, funcList, config = {
      showAverage: true,
      showParamsValues: false
    }
  }) {
    const
      eta = new ETA(),
      [side, banner] = [Object.keys(paramsList), Object.keys(funcList)],
      [ht, wd] = [side.length, banner.length],
      [lapseX, valueX] = [
        Mx.ini(ht, wd, (i, j) => 0),
        Mx.ini(ht, wd, (i, j) => null)
      ]
    eta.ini()
    for (let [x, [label, params]] of Object.entries(paramsList).entries()) {
      GP.now().tag(
        `[${x}] (${label}) tested by each of funcs [${banner}], each repeated * ${repeat}.`
      ) |> console.log
      eta.split()
      for (let [y, func] of Object.values(funcList).entries()) {
        valueX[x][y] = _reh(repeat, func, params)
        lapseX[x][y] = eta.split()
      }
    }
    let [lapse, result] = [
      CrosTab.from({ side, banner, matrix: lapseX, title: 'parameter' }).clone(),
      CrosTab.from({ side, banner, matrix: valueX, title: 'parameter' }).clone()
    ];
    if (config.showAverage) lapse.unshiftRow(
      'avg',
      lapse.columns.map(Stat.avg).map(it => it.toFixed()
      )|> Visual.vector )
    if (config.showParamsValues) result.unshiftCol(
      'input',
      Object.values(paramsList)
    )
    return { lapse, result }
  }
}

export {
  Chrono
}
