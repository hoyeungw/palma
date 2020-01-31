import { Hatsu } from 'hatsu'
import { PalettSelector } from 'palett-table'
import { Pal } from './Pal'

export class Says {
  /** @type {Object<string,Pal|function>} */ #roster
  /** @type {Set<string>} */ #colorPool
  /** @type {Object<string,string>} */ #keywords

  constructor (roster, keywords) {
    this.#roster = roster || {}
    this.#keywords = keywords || {}
    this.#colorPool = new Set()
    return new Proxy(this, {
      /** @returns {Pal|function} */
      get (target, p, receiver) {
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
