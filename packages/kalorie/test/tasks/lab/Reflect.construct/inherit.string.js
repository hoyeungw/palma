class Wedge extends Array {
  constructor () {
    super()
    // Reflect.setPrototypeOf(this, String.prototype)
  }

  static build () {
    return new Wedge()
    // return Reflect.construct(Array, [], Wedge)
  }

  toUpperCase () {
    return 'nope'
  }

  tag (another) {
    return another
  }
}

// Wedge.prototype = Object.create(Array.prototype)

Wedge.build() |> console.log
Wedge.length |> console.log




