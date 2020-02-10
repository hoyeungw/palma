import { CrosTabX, decoLog, TableX } from 'xbrief'
import { Samples } from 'veho/src/Samples'
import { CrosTab } from 'crostab/src/crostab/CrosTab'
import { logger } from 'palma'

const beta = 255
const candidates = [-65535, -255, -16, -4, -Math.PI, 0, Math.Pi, 4, 16, 255, 65535]
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

const side = [0, 1, 2, 4, 9, 16, 64, 256]
const banner = [0, 1, 2, 4, 9, 16, 64, 256]
const matrix = side.map(x => banner.map(y => x & y))

const crostab = CrosTab.from({
  side, banner, matrix
})

crostab |> CrosTabX.brief |> logger


