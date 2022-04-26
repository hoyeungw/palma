import { deco }  from 'xbrief'
import { Typ }   from 'typen'
import { nowTM } from '../misc/elprimero'

class SimpleJsonTest {
  static test () {
    const jso = {
      a: null,
      b: undefined,
      c: '',
      d: [],
      e: {},
      f: [1, 2, 3],
      g: {
        capital: 'Beijing',
        longitude: 116.286,
        latitude: 40.0495
      },
      h: a => console.log(a)
    }
    nowTM().tag('deco(jso)').wL()
    deco(jso).wL()
    nowTM().tag('elvis').wL()
    for (let [k, v] of Object.entries(jso)) {
      k.tag(Typ.infer(v)).tag(v ? v : 'null').wL()
    }
    console.log('jso.x'.tag(jso.h))
  }
}

export {
  SimpleJsonTest
}