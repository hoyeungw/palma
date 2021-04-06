import { ClassMeta } from '../../index'
import { Point } from './resources/Point'
import { deco } from 'xbrief'

export class ClassMetaTest {
  static test () {
    const point = new Point(121, 31)
    ClassMeta.getMeta(Point) |> deco |> console.log
    ClassMeta.getMeta(point) |> deco |> console.log
  }
}

ClassMetaTest.test()
