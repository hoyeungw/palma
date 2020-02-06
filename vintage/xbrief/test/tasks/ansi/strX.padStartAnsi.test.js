import { Hatsu } from 'hatsu'
import stringLength from 'string-length'
import { ArrX } from '../../../src/ArrX'
import { StrX } from '../../../src/StrX'

describe('Test padStart concerning Ansi', function () {
  it('pad Start Ansi: test', () => {
    String.prototype.tag = function (val) {
      return StrX.tag(this, val)
    }
    const { log } = console
    const candidates = {
      style_normal: (Hatsu.blue('Hello') + ' World' + Hatsu.red('!')),
      chainable: (Hatsu.blue.bgRed.bold('Hello world!')),
      multiple_arg: (Hatsu.blue('Hello', 'World!', 'Foo', 'bar')),
      nest_style: (Hatsu.red('Hello', Hatsu.underline.bgBlue('world') + '!')),
      nest_even: (Hatsu.green(`A green ${Hatsu.blue.underline.bold('Shakespare')} emerged.`))
    }
    const maxLen = ArrX.maxLen(Object.values(candidates))
    'maxLen'.tag(maxLen) |> console.log
    '' |> console.log
    for (let [name, text] of Object.entries(candidates)) {
      name.tag(text).tag(stringLength(text)).tag(text.length) |> console.log
    }
    '' |> console.log
    'Padded by maxLen' |> console.log
    const nameLen = ArrX.maxLen(Object.keys(candidates))
    for (let [name, text] of Object.entries(candidates)) {
      name.padStart(nameLen).tag(text.padStart(text.length + maxLen - stringLength(text))) |> console.log
    }
  })
})
