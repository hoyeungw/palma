import { bright } from 'farbe/test/resources/nord'
import { Callable, ProxyFactory } from '../..'
import { Ar } from 'veho'
import { Hatsu } from 'hatsu'
import { deco } from 'xbrief'

const NordColorEnts = Object.entries(bright)
const getRandomValue = entries => {
  const [, v] = entries|> Ar.randSample
  return v
}

const TAB = ' '.repeat(2)
const renderText = (message, { title, indent, keywords }) =>
  `${TAB.repeat(indent)}[${title}] ${message} ${(keywords || '' |> deco)}` |> console.log

/**
 * @type {class|function}
 */
class Pal extends Callable {
  constructor (title, { indent = 0, keywords } = {}) {
    super(tx => renderText(tx, this))
    this.title = title
    this.indent = indent
    this.keywords = keywords
    if (keywords?.tmr) {
      keywords.tmr += 1
    }
  }

  /**
   *
   * @param title
   * @param indent
   * @returns {Pal|function}
   */
  static build (title, indent) {
    return new Pal(title, indent)
  }

  get asc () {
    this.indent++
    return this
  }

  get desc () {
    this.indent--
    return this
  }
}

export class Says {
  /** @type {Object<string,Pal|function>} */
  #roster
  /** @type {Set<string>} */
  #colorPool
  /** @type {Object<string,string>} */
  #keywords

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
          hex = NordColorEnts|> getRandomValue
        }
        while (++count <= NordColorEnts.length && target.#colorPool.has(hex))
        target.#colorPool.add(hex)
        target.#roster[p] = Pal.build(p |> Hatsu.hex(hex), { keywords })
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

export class CallableTest {
  static test () {
    const says = Says.build({ keywords: { tmr: 1 } })
    'what to do' |> says.chef
    'how would i know' |> says.worker.asc
    'i\'ll be there tmr' |> says.worker
    'anything i can do for you' |> says.tournant.asc.asc
    'no, but you just stand by' |> says.aboyeur
    'yes' |> says.tournant
  }
}

CallableTest.test()
