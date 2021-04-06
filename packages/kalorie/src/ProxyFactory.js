export class ProxyFactory {
  /**
   *
   * @param {*} ob
   * @param {ProxyHandler<*>} handler
   * @returns {Proxy<*>}
   */
  static build (ob, handler) {
    return new Proxy(ob, handler)
  }
}
