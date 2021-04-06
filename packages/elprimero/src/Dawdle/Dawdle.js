export class Dawdle {
  static linger (ms, fn, ...args) {
    return new Promise((pass, veto) => {
      let st = false, rs
      Promise
        .resolve(fn.apply(null, args))
        .then(x => st++ ? pass(x) : rs = x, veto)
      Promise
        .resolve(Dawdle.timeout(ms))
        .then(_ => { if (st++) pass(rs) }, veto)
    })
  }

  static timeout (ms) {
    return new Promise(pass => setTimeout(pass, ms))
  }
}
