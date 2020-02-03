import { decoLog, TableX } from 'xbrief'
import { Samples } from 'veho/src/Samples'

const beta = 255
const candidates = [-65535, -255, -16, -Math.PI, 0, Math.Pi, 16, 255, 65535]
const samples = candidates.map(x => ({
  value: x,
  and: x & beta,
  or: x | beta,
  xor: x ^ beta,
  shift: x >> 8,
  signBit: x >> 31,
  maskXor: x ^ (x >> 31),
  get abs () {
    return (x ^ (x >> 31)) - (x >> 31)
  }
}))

Samples.toTable(samples) |> TableX.brief |> decoLog

