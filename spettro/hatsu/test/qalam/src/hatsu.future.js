class Callable extends Function {
  constructor (f) {
    super()
    Reflect.setPrototypeOf(f, new.target.prototype)
    return f
  }
}

class Hatsu extends Callable {
  #config
  #color

  constructor (rgb, config) {
    super(msg => {
      return { msg, color: this.#color, config: this.#config }
    })
    this.#color = rgb
    this.#config = config || {}
    return new Proxy(this, {
      get (target, p, receiver) {
        if (p in target) {
          'p in target' |> console.log
          return target
        } else {
          Reflect.defineProperty(target, 'color', { value: p })
          'p not in target' |> console.log
          return target
        }
      }
    })
  }

  get color () {
    return this.#color
  }

  get config () {
    return this.#config
  }

  /**
   *
   * @param arr
   * @returns {Hatsu|function}
   */
  static rgb (arr) {
    // return HatsuProxyFab.build(new Hatsu(arr))
    return new Hatsu(arr)
  }

  /**
   *
   * @param str
   * @returns {Hatsu|function}
   */
  static hex (str) {
    return new Hatsu(str)
  }

  /**
   *
   * @returns {Hatsu|function}
   */
  get bold () {
    this.#config.bold = true
    return this
  }

  /**
   *
   * @returns {Hatsu|function}
   */
  get italic () {
    this.#config.italic = true
    return this
  }

  /**
   *
   * @returns {Hatsu|function}
   */
  get underline () {
    this.#config.underline = true
    return this
  }

  /**
   *
   * @returns {Hatsu|function}
   */
  get inverse () {
    this.#config.inverse = true
    return this
  }
}

const hatsu = Hatsu.rgb([1, 2, 3])
hatsu |> console.log
hatsu('anything new') |> console.log
hatsu.bold('anything new') |> console.log
hatsu.red.italic.inverse('another') |> console.log
// hatsu.red.blue |> console.log



