import { abs, exp, log, sqrt, pow }  from '../helper'

const R0 = 3.442619855899
const R1 = 1.0 / R0
const R0S = exp(-0.5 * R0 * R0)
const N2P32 = -pow(2, 32)
const M1 = 2147483648.0
const VN = 9.91256303526217e-3

export const zigguratObject = {
  jsr: 123456789,
  wn: Array(128),
  fn: Array(128),
  kn: Array(128),

  preset () {
    // seed generator based on current time
    this.jsr ^= new Date().getTime()
    let
      m1 = M1, dn = R0, tn = R0, vn = VN, q = vn / R0S
    this.kn[0] = ~~((dn / q) * m1)
    this.kn[1] = 0

    this.wn[0] = q / m1
    this.wn[127] = dn / m1

    this.fn[0] = 1.0
    this.fn[127] = R0S

    for (let i = 126; i >= 1; i--) {
      dn = sqrt(-2.0 * log(vn / dn + exp(-0.5 * dn * dn)))
      this.kn[i + 1] = ~~((dn / tn) * m1)
      tn = dn
      this.fn[i] = exp(-0.5 * dn * dn)
      this.wn[i] = dn / m1
    }
  },

  get next () {
    return this.RNOR
  },

  get RNOR () {
    let
      hz = this.SHR3,
      iz = hz & 127
    return abs(hz) < this.kn[iz]
      ? hz * this.wn[iz]
      : this.NFIX(hz, iz)
  },

  /**
   * @return {number}
   */
  NFIX (hz, iz) {
    let
      r = R0,
      r1 = R1,
      x,
      y
    while (true) {
      x = hz * this.wn[iz]
      if (iz === 0) {
        x = -log(this.UNI) * r1
        y = -log(this.UNI)
        while (y + y < x * x) {
          x = -log(this.UNI) * r1
          y = -log(this.UNI)
        }
        return hz > 0
          ? r + x
          : -r - x
      }
      if (this.fn[iz] + this.UNI * (this.fn[iz - 1] - this.fn[iz]) < exp(-0.5 * x * x))
        return x
      hz = this.SHR3
      iz = hz & 127
      if (abs(hz) < this.kn[iz]) return hz * this.wn[iz]
    }
  },

  get SHR3 () {
    let m = this.jsr, n = this.jsr
    n ^= n << 13
    n ^= n >>> 17
    n ^= n << 5
    this.jsr = n
    return (m + n) | 0
  },

  get UNI () {
    return 0.5 + this.SHR3 / N2P32
  }
}

export function * zigguratGeneratorDev () {
  const self = zigguratObject
  self.preset()
  while (true) {
    yield self.next
  }
}

// const z = zigguratGeneratorDev()
// z.next() |> console.log
// for (let i = 0; i < 16; i++) {
//   z.next() |> console.log
// }
