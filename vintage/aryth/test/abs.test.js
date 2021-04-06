import { CrosTabX } from 'xbrief'
import { Chrono } from 'elprimero'

const signBit = n => n >> 31

const absStable = n => {
  const m = n >> 31
  return (m ^ n) - m
}

const absDev = n => {
  const temp = n >> 31 // make a mask of the sign bit
  n ^= temp // toggle the bits if value is negative
  n -= temp // n += temp & 1 // add one if value was negative
  return n
}

const absFut = (n, m) => (m = n >> 31, (m ^ n) - m)

const { lapse, result } = Chrono.strategies({
  repeat: 5E+6,
  paramsList: {
    neg_0xffff: [-65535],
    neg_pi: [-Math.PI],
    neg_one: [-1],
    zero: [0],
    pos_one: [1],
    pos_pi: [Math.PI],
    pos_0xffff: [65535],
  },
  funcList: {
    bench: x => x,
    signBit,
    native: Math.abs,
    absStable,
    absDev,
    absFut,
  }
})
'lapse' |> console.log
lapse |> CrosTabX.brief |> console.log
'' |> console.log
'result' |> console.log
result |> CrosTabX.brief |> console.log
