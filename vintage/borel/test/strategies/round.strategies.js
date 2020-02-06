import { Chrono } from 'elprimero'

// round for positive
const round = x => x + 0.5 << 0

// round for both positive and negative
const roundEdge = x => (x + (x > 0 ? 0.5 : -0.5)) << 0

const { lapse, result } = Chrono.strategies({
  repeat: 1E+6,
  paramsList: {
    nd: [-7.7],
    nc: [-6.6],
    nb: [-5.5],
    na: [-1.1],
    zero: [0],
    pa: [1.1],
    pb: [5.5],
    pc: [6.6],
    pd: [7.7]
  },
  funcList: {
    bench: x => x,
    stable: Math.round,
    bitShift: x => (x) + 0.5 << 0,
    bitShiftDev: round,
    bitShiftEdge: roundEdge,
  }
})
'lapse' |> console.log
lapse |> CrosTabX.brief |> console.log
'' |> console.log
'result' |> console.log
result.brief() |> console.log
