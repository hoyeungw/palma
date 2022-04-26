import { Num } from 'typen'

const { inferData } = Num

class ArrTyp {
  /**
   *
   * @param {*[]} column
   * @return {string|unknown}
   */
  static infer (column) {
    if (column.length) {
      const types = column.map(inferData)
      const dist = new Set(types)
      switch (dist.size) {
        case 1:
          return types[0]
        case 2:
          return dist.has('number') && dist.has('numstr')
            ? 'numstr'
            : 'misc'
        default:
          return 'misc'
      }
    } else {
      return 'null'
    }
  }

}

export { ArrTyp }