export class Point {
  #x
  #y
  tag

  constructor (x, y, tag) {
    this.#x = x
    this.#y = y
    this.tag = tag
  }

  static build ([x, y]) {
    return new Point(x, y)
  }

  static version = '0.0.2'

  get coordinate () {
    return [this.#x, this.#y]
  }

  set coordinate ([x, y]) {
    this.#x = x
    this.#y = y
  }

  toString () {
    return `(${this.#x},${this.#y})`
  }
}

export class MovablePoint extends Point {
  #x
  #y

  constructor (x, y) {
    super(x, y)
  }

  offset (dx, dy) {
    this.#x += dx
    this.#y += dy
  }
}
