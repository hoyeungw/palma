import { RgbTransHslTest } from 'farbe/test/RgbTransHsl.test'
import { RgbTransHexTest } from 'farbe/test/RgbTransHex.test'

describe('Rgb Hsl Test', function () {
  this.timeout(1000 * 60)
  it('Rgb Hsl Test: test Rgb To Hsl ', () => {
    RgbTransHslTest.testRgbToHsl()
    '' |> console.log
  })
  it('Rgb Hsl Test: test Hsl To Rgb ', () => {
    RgbTransHslTest.testHslToRgb()
    '' |> console.log
  })
  it('Rgb Trans Hex Test: test Hex To Rgb ', () => {
    RgbTransHexTest.testHexToRgb()
    '' |> console.log
  })
  it('Rgb Trans Hex Test: test Rgb To Hex ', () => {
    RgbTransHexTest.testRgbToHex()
    '' |> console.log
  })
})
