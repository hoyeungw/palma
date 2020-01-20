import { palette, greys } from '../../index'
import { Visual } from '../../src/visual'
import { Chrono } from 'elprimero'
import { Mx } from 'veho'
import { deco, MatX } from 'xbrief'
import { boxOffice } from '../asset/movieSamples'

const { teal, deepOrange } = palette

export class DatavizTest {

  static testVector () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+0, //3E+2
      paramsList: {
        simple: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { max: teal.accent_3, min: deepOrange.lighten_1 }],
        misc: [[1, 2, 3, NaN, 5, 6, 7, '-', 9, 10], { max: teal.accent_3, min: deepOrange.lighten_1 }],
        spaces: [[false, true, 1, 2, 3, '', ' ', 7, 9, 10], { max: teal.accent_3, min: deepOrange.lighten_1 }],
        sample: [['Avatar', '2,788', '244', '2009', 'James Cameron', ['James Cameron', 'Jon Landau'], 'James Cameron', '']],
        txDatas: [[
          '244', '200', '306', '400', '150', '220',
          '190', '495', '210', '250', '317', '187', '150',
          '255', '200', '250', '200', '74', '250', '200'
        ], { max: teal.accent_3, min: deepOrange.lighten_1 }],
        wierds: [[1, 2, false, undefined, NaN, Infinity, 9, 10]]
      },
      funcList: {
        vizVec: Visual.vector
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief({ ansi: true }) |> console.log
  }

  static testMatrix () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1,//3E+2,
      paramsList: {
        // simple: [Mx.ini(9, 10, (i, j) => (i + 1) * 10 + j), {
        //   max: greys.grey.lighten_5,
        //   min: greys.grey.darken_3
        // }],
        simple: [[
          [1, 3, 4,],
          [2, 2, 4,],
          [2, 3, 2,],
        ]],
        matrix_lack: [[
          [, 3, 4,],
          [2, , 4,],
          [2, 3, ,],
        ]],
        // misc: [[
        //   [1, 2, NaN, 4, 5, 6],
        //   [5, '-', 7, 8, 9, 10],
        //   [9, 10, NaN, null, 13, 14],
        //   [13, 14, 15, 16, 17, 18]
        // ], {
        //   max: teal.accent_3,
        //   min: deepOrange.lighten_1
        // }],
        // many_NaNs: [[
        //   [undefined, 2, NaN, 4, 5, NaN],
        //   [5, '-', 7, undefined, 9, NaN],
        //   [9, 10, NaN, null, 13, NaN],
        //   [13, 14, 15, 16, 17, NaN]
        // ], {
        //   max: palette.lightGreen.accent_3,
        //   min: palette.red.accent_2
        // }],
        // samples: [
        //   boxOffice
        // ]
      },
      funcList: {
        // pointwise: (mx, spettro) => Visual.matrix(mx, { mark: spettro, direct: 0 }),
        // rowwise: (mx, spettro) => Visual.matrix(mx, { mark: spettro, direct: 0, mutate: false, retFn: true }),
        columnwise: (mx, color) => Visual.matrix(mx, { mark: color, direct: 2 })
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    // result.brief() |> console.log
    // Samples.fromCrosTab(result, { sideLabel: 'parameter' }) |> deco |> console.log
    const { side, banner } = result
    for (let head of banner) {
      // const jso = Ob.ini(side, result.column(head))
      // jso |> console.log
      head |> console.log
      for (let mx of result.column(head)) {
        // mx |> deco |> console.log
        mx |> (_ => MatX.xBrief(_)) |> console.log
      }
    }

  }

  static testColumn () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1,//3E+2,
      paramsList: {
        simple: [Mx.ini(9, 10, (i, j) => (i + 1) * 10 + j), {
          max: greys.grey.lighten_5,
          min: greys.grey.darken_3
        }],
        misc: [[
          [1, 2, NaN, 4, 5, 6],
          [5, '-', 7, 8, 9, 10],
          [9, 10, NaN, null, 13, 14],
          [13, 14, 15, 16, 17, 18]
        ], {
          max: teal.accent_3,
          min: deepOrange.lighten_1
        }],
        many_NaNs: [[
          [1, 2, NaN, 4, 5, NaN],
          [5, '-', 7, 8, 9, NaN],
          [9, 10, NaN, null, 13, NaN],
          [13, 14, 15, 16, 17, NaN]
        ], {
          max: palette.lightGreen.accent_3,
          min: palette.red.accent_2
        }],
        samples: [
          boxOffice
        ]
      },
      funcList: {
        _column_1: (mx, color) => Visual.column(mx, 1, { mark: color }),
        _column_3: (mx, color) => Visual.column(mx, 3, { mark: color })
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    // result.brief() |> console.log
    // Samples.fromCrosTab(result, { sideLabel: 'parameter' }) |> deco |> console.log
    const { side, banner } = result
    for (let head of banner) {
      // const jso = Ob.ini(side, result.column(head))
      // jso |> console.log
      head |> console.log
      for (let mx of result.column(head)) {
        MatX.xBrief(mx, { visual: { on: false } }) |> console.log
      }
    }

  }
}
