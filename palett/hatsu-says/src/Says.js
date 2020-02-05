import { Hatsu } from 'hatsu'
import { PalettSelector } from 'palett-table'
import { Pal } from './Pal'
import { Ob } from 'veho'

export class Says {
  /** @type {Object<string,Pal|function>} */ #roster = {}
  /** @type {Set<string>} */ #colorPool = new Set()
  /** @type {Object<string,string>} */ #keywords = {}

  constructor (roster, keywords) {
    if (roster) this.#roster = roster
    if (keywords) this.#keywords = keywords
    return new Proxy(this, {
      /** @returns {Pal|function} */
      get (target, p, receiver) {
        if (p in target) return target[p]
        if (p in target.#roster) return target.#roster[p]
        let hex, count = 0
        do {
          ({ hex } = PalettSelector.random())
        } while (++count <= PalettSelector.pool && target.#colorPool.has(hex))
        target.#colorPool.add(hex)
        target.#roster[p] = Pal.build(p |> Hatsu.hex(hex), { keywords: target.#keywords })
        return target.#roster[p]
      }
    })
  }

  get roster () {
    return Ob.mapValues(this.#roster, pal => pal.title)
  }

  get colorPool () {
    return this.#colorPool
  }

  /**
   *
   * @param roster
   * @param keywords
   * @returns {Says|Object<string,function>}
   */
  static build ({ roster, keywords }) {
    return new Says(roster, keywords)
  }
}

export default new Says()
