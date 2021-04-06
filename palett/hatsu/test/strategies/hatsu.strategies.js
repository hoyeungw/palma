import { Chrono } from 'elprimero/src/Chrono'
import { CrosTabX } from 'xbrief'
import { PalettTable, Degrees, ColorGroups } from 'palett-table'
import { Hatsu } from '../../index'
import { render } from '../../src/render'
import { decoLog } from '@spare/deco'
import { dye } from '../../src/dye'

const cxt = PalettTable.crosTab({
  space: 'rgb',
  degrees: Degrees.entire,
  colors: [...ColorGroups.rainbow],
  average: false,
  cellColor: false
})

const colorVector = cxt.row('lighten_2').map(([r, g, b]) => [+r, +g, +b])
colorVector |> decoLog

class HatsuStrategies {
  static test () {
    const { lapse, result } = Chrono.strategies({
      repeat: 2E+6,
      paramsList: {
        simple: [colorVector],
        misc: [[]],
      },
      funcList: {
        stable: x => x,
        // dev: (arr) => {return arr.map(rgb => Hatsu.rgb(rgb))},
        edge: (arr) => {return arr.map(rgb => it => render(it, { color: rgb }))},
        fut: (arr) => {return arr.map(rgb => dye.bind({ color: rgb, effect: '' }))}
      }
    })
    'lapse' |> console.log
    lapse |> CrosTabX.brief |> console.log
    '' |> console.log
    'result' |> console.log
    // result |> CrosTabX.brief |> console.log

    result.queryCell('simple', 'fut').map(it => 'urus'|> it) |> decoLog
  }
}

HatsuStrategies.test()
