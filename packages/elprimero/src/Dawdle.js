export class Dawdle {
  static linger (ms, asyncFunc, ...args) {
    return Promise
      .all([
        asyncFunc.apply(null, args),
        Dawdle.timeout(ms)
      ])
      .then(([it]) =>
        it
      )
  }

  static timeout (ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    )
  }
}
