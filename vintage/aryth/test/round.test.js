import { Chrono } from 'elprimero/src/Chrono'
import { CrosTabX } from 'xbrief'

const { lapse, result } = Chrono.strategies({
  repeat: 3E+6,
  paramsList: {
    neg_some: [-567.890],
    neg_pi: [-Math.PI],
    neg_e: [-Math.E],
    neg_one: [-1],
    zero: [0],
    pos_one: [1],
    pos_e: [Math.E],
    pos_pi: [Math.PI],
    pos_some: [567.890],
  },
  funcList: {
    bench: x => x,
    stable: Math.round,
    dev: x => {
      const a = x > 0 ? 0.5 : -0.5
      return (x + a) << 0
    },
    fut: x => x + 0.5 + (x >> 31) << 0,
    origin: x => (x + 0.5) << 0,
  }
})
'lapse' |> console.log
lapse |> CrosTabX.brief |> console.log
'' |> console.log
'result' |> console.log
result |> CrosTabX.brief |> console.log
