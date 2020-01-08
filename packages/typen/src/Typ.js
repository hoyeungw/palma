import { otype, oc } from './utils/typen'

class Typ {
  static protoType (o) { return oc.call(o) }

  static initial (o) { return oc.call(o).slice(8, 11) }

  static infer (o) {
    const t = typeof o
    return t !== 'object'
      ? t
      : otype(o).toLowerCase()
  }
}

export {
  Typ
}
