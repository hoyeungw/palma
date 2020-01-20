import { StrX } from './src/brief/StrX'

String.prototype.wL = function () {
  console.log(this)
}

String.prototype.tag = function (val) {
  return StrX.tag(this, val)
}

Number.prototype.tag = function (val) {
  return StrX.tag(`${this}`, val)
}

export { StrX }
export { totx } from './utils/str'
export { Xr, Ink } from './src/brief/Ink'
export { ArrX } from './src/brief/ArrX'
export { MatX } from './src/brief/MatX'
export { MapX } from './src/brief/MapX'
export { EntX } from './src/brief/EntX'
export { TableX } from './src/brief/TableX'
export { CrosTabX } from './src/brief/CrosTabX'
export { deco } from './src/deco/deco'
export { FinFm, RatioFm, MagFm, toPercent } from './src/formos'
export { noop } from './utils/str'
export { Preci } from './utils/Preci/Preci'
