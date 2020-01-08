export class DateSubtract {
  static test () {
    var d = new Date()

    console.log('Today is: ' + d.toLocaleString())

    d.setDate(d.getDate() - 90)

    console.log('<br>5 days ago was: ' + d.toLocaleString())
  }
}

describe('Test date subtract', function () {
  this.timeout(1000 * 60)
  it('Test date subtract: test', () => {
    DateSubtract.test()
  })
})
