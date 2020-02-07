import { Chrono } from 'elprimero/src/Chrono'
import { CrosTabX } from 'xbrief'

const { lapse, result } = Chrono.strategies({
  repeat: 3E+6,
  paramsList: {
    neg_some: [-567.890, 1],
    neg_pi: [-Math.PI, Number.NaN],
    neg_e: [-Math.E, Number.POSITIVE_INFINITY],
    neg_one: [-1, Number.NEGATIVE_INFINITY],
    zero: [0, Number.EPSILON],
    pos_one: [1, '2'],
    pos_e: [Math.E, 2],
    pos_pi: [Math.PI, undefined],
    pos_some: [567.890, 2],
  },
  funcList: {
    bench: x => x,
    stable: Math.min,
    dev: (a, b) => a < b ? a : b,
    fut: (a, b) => b ^ ((a ^ b) & -(a < b)),
    max: (a, b) => a ^ ((a ^ b) & -(a < b))
  }
})
'lapse' |> console.log
lapse |> CrosTabX.brief |> console.log
'' |> console.log
'result' |> console.log
result |> CrosTabX.brief |> console.log
