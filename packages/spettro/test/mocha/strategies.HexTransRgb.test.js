import { CompareHexTransRgb } from '../tasks/strategies/HexToRgbPrep'

describe('Compare Hex Trans Rgb Strategies', function () {
  this.timeout(1000 * 60)
  it('Compare Hex Trans Rgb: test Hex => Rgb ', () => {
    CompareHexTransRgb.testHexToRgb()
  })
  it('Compare Hex Trans Rgb: test Rgb => Hex ', () => {
    CompareHexTransRgb.testRgbToHex()
  })
  it('number and test', function () {
    const numbers = [
      -5,
      0,
      128,
      128.5,
      128.7,
      255,
      255.1,
      255.9999,
      256,
      257,
      512,
      1024.2425,
      Math.PI
    ]
    for (let number of numbers) {
      `[${number}] -> [${number & 0xFF}]` |> console.log
    }
  })
})
