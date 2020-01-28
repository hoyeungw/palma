import { Roulett } from '../src/Roulett'
import { Ar } from 'veho'
import { deco } from 'xbrief'

class RoulettTest {
  static test () {
    const [min, max] = [0, 10]
    // for (let i = 0; i < 20; i++) {
    //   Roulett.rand(min, max) |> console.log
    // }
    Roulett.between(min, max) |> console.log
    Roulett.rand(min, max) |> console.log
    Roulett.index(max) |> console.log

    const arr = Ar.range(65, 90, i => String.fromCharCode(i))
    Roulett.element(arr) |> console.log
    Roulett.key(arr) |> console.log
    Roulett.value(arr) |> console.log
    Roulett.entry(arr) |> console.log
  }

  static testGaussArray () {
    Roulett.gaussSamples(50, 75, 12) |> deco |> console.log
  }
}

RoulettTest.testGaussArray()


