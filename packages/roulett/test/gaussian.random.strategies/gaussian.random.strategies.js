import { Chrono } from 'elprimero/src/Chrono'
import { marsagliaPolar } from '../../src/normDistRand/marsaglia-polar'
import { boxMuller } from '../../src/normDistRand/box-muller'
import { Ziggurat } from '../../src/normDistRand/ziggurat'
import { zigguratGenerator } from '../../src/normDistRand/ziggurat-generator'
import { zigguratGeneratorDev } from '../../src/normDistRand/ziggurat-generator-dev'

const z = new Ziggurat()
const zg = zigguratGenerator()
const zgd = zigguratGeneratorDev()

class GaussianRandomStrategies {
  static test () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+6,
      paramsList: {
        simple: [],
        misc: [],
        some: [],
      },
      funcList: {
        bench: x => x,
        boxMuller: boxMuller,
        marsaglia: marsagliaPolar,
        ziggurat: z.next.bind(z),
        z_generator: () => zg.next().value,
        zigguratGenDev: () => zgd.next().value,
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log
  }
}

GaussianRandomStrategies.test()
