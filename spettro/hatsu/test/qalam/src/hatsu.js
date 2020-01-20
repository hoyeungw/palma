const effects = ['bold', 'italic', 'underline', 'inverse']

class HatsuProxyFactory {
  static build (hatsuInstance) {
    return new Proxy(hatsuInstance, {
      /**
       *
       * @param target
       * @param p
       * @param receiver
       * @returns {Hatsu|function(string):string}
       */
      get (target, p, receiver) {
        if (p in target) return receiver
        if (effects.includes(p)) target.config[p] = true
        Reflect.defineProperty(target, 'spec', { value: p })
        return receiver
      },
    })
  }
}

class Hatsu extends Callable {

  constructor (rgb, config) {
    super(msg => {
      return { msg, color: this.color, config: this.config, spec: this.spec }
    })
    this.color = rgb
    this.config = config || {}
  }

  /**
   *
   * @param arr
   * @returns {Hatsu|function}
   */
  static rgb (arr) {
    // return new Hatsu(arr)
    return HatsuProxyFactory.build(new Hatsu(arr))
  }

  /**
   *
   * @param str
   * @returns {Hatsu|function}
   */
  static hex (str) {
    // return new Hatsu(str)
    return HatsuProxyFactory.build(new Hatsu(str))
  }

  clear () {
    this.config = {}
    return this
  }
}

const hatsu = Hatsu.rgb([1, 2, 3])
hatsu |> console.log
hatsu('anything new') |> console.log
hatsu.bold('anything new') |> console.log
hatsu.blue.red.italic.inverse('another') |> console.log


