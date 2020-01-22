export class ClassMeta {

  static getMeta (cls) {
    return {
      methods: ClassMeta.getMethodNames(cls),
      staticMethods: ClassMeta.getStaticMethodNames(cls),
      staticProperties: ClassMeta.getStaticPropertyNames(cls)
    }
  }

  /**
   *
   * @param {class|function|object} cls
   * @returns {any|string}
   */
  static getMethodNames (cls) {
    try {
      return !!cls && !!cls.prototype
        ? Reflect.ownKeys(cls.prototype)
        : []
    } catch (e) {
      return 'N/A'
    }
  }

  /**
   *
   * @param {class} cls
   * @return {string[]|string}
   */
  static getStaticMethodNames (cls) {
    try {
      return Reflect.ownKeys(cls)
        .filter(prop => typeof cls[prop] === 'function')
    } catch (e) {
      return 'N/A'
    }
  }

  /**
   *
   * @param {class} cls
   * @return {string[]|string}
   */
  static getStaticPropertyNames (cls) {
    try {
      return Object.keys(cls)
    } catch (e) {
      return 'N/A'
    }
  }
}
