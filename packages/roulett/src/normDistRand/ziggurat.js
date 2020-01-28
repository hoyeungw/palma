import { abs, exp, log, sqrt, pow } from '../helper'

const R0 = 3.442619855899
const R1 = 1.0 / R0
const R0S = exp(-0.5 * R0 * R0)
const N2P32 = -pow(2, 32)
const M1 = 2147483648.0
const VN = 9.91256303526217e-3

export class Ziggurat {
  constructor (mean = 0, stdev = 1) {
    this.jsr = 123456789
    this.wn = Array(128)
    this.fn = Array(128)
    this.kn = Array(128)
    this.mean = mean
    this.stdev = stdev
    this.preset()
  }

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
  }

  next () {
    return this._randSample() * this.stdev + this.mean
  }

  _randSample () {
    let
      hz = this._xorshift(),
      iz = hz & 127
    return abs(hz) < this.kn[iz]
      ? hz * this.wn[iz]
      : this._nFix(hz, iz)
  }

  _nFix (hz, iz) {
    let
      r = R0,
      r1 = R1,
      x,
      y
    while (true) {
      x = hz * this.wn[iz]
      if (iz === 0) {
        do {
          x = -log(this._uni()) * r1
          y = -log(this._uni())
        } while (y + y < x * x)
        // {
        //   x = -log(this._uni()) * r1
        //   y = -log(this._uni())
        // }
        return hz > 0
          ? r + x
          : -r - x
      }
      if (this.fn[iz] + this._uni() * (this.fn[iz - 1] - this.fn[iz]) < exp(-0.5 * x * x))
        return x
      hz = this._xorshift()
      iz = hz & 127
      if (abs(hz) < this.kn[iz]) return hz * this.wn[iz]
    }
  }

  _xorshift () {
    let m = this.jsr, n = m
    n ^= n << 13
    n ^= n >>> 17
    n ^= n << 5
    this.jsr = n
    return (m + n) | 0
  }

  _uni () {
    return 0.5 + this._xorshift() / N2P32
  }
}
