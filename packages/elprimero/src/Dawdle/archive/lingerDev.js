import { timeout } from './timeout'

export const lingerDev = (ms, fn, ...args) =>
  new Promise((pass, veto) => {
    let st = false, rs
    Promise
      .resolve(fn.apply(null, args))
      .then(x => st++ ? pass(x) : rs = x, veto)
    Promise
      .resolve(timeout(ms))
      .then(_ => { if (st++) pass(rs) }, veto)
  })
