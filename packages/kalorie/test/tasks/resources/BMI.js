class BMI {
  constructor (num) {
    this.num = num
  }

  [Symbol.toPrimitive] (hint) {
    switch (hint) {
      case 'number':
        return this.num * 100
      case 'string':
        return `BMI: ${this.num}`
      case 'default':
        return this.num * 100
      default:
        throw new Error()
    }
  }

  get [Symbol.toStringTag] () {
    return 'Example'
  }
}

const bmi = new BMI(20.5)
bmi |> console.log
bmi.toString() |> console.log
bmi + 100 |> console.log
100 + bmi |> console.log
