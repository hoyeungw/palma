import { ConsoleColors, Effects } from '../assets/codes'

export class HatsuProxyFactory {
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
        if (p in Effects) {
          [target.head[p], target.tail[p]] = Effects[p]
          return receiver
        }
        if (p in ConsoleColors) {
          target.color = p
          return receiver
        }
        // Reflect.defineProperty(target, 'spec', { value: p })
        return receiver
      },
    })
  }
}
