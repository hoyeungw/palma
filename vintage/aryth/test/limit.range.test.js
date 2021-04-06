import { Chrono } from 'elprimero/src/Chrono'
import { CrosTabX, logger } from 'xbrief'

const max = (x, a) => x ^ ((x ^ a) & -(x < a))
const min = (x, b) => x ^ ((b ^ x) & -(b < x))

const { lapse, result } = Chrono.strategies({
  repeat: 3E+6,
  paramsList: {
    neg_some: [-567.890, 1, 10],
    neg_pi: [-Math.PI, 1, 10],
    neg_e: [-Math.E, 1, 10],
    neg_one: [-1, 1, 10],
    zero: [0, 1, 10],
    pos_one: [1, 1, 10],
    pos_e: [Math.E, 1, 10],
    pos_pi: [Math.PI, 1, 10],
    pos_some: [567.890, 1, 10],
  },
  funcList: {
    bench: x => x,
    stable: (x, a, b) => {
      x = Math.max(x, a)
      x = Math.min(x, b)
      return x
    },
    dev: (x, a, b) => {
      if (x < a) x = a
      if (x > b) x = b
      return x
    },
    fut: (x, a, b) => {
      x ^= (x ^ a) & -(x < a)
      x ^= (b ^ x) & -(b < x)
      return x
    }
  }
})
'lapse' |> console.log
lapse |> CrosTabX.brief |> console.log
'' |> console.log
'result' |> console.log
result |> CrosTabX.brief |> console.log
