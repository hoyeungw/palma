import { Visual } from 'spettro/src/visual'

class VisualFundamentalTest {
  static vector () {
    const vec = [1, 2, 3, 4, 5, 6, 7]
    Visual.vector(vec) |> console.log
  }
}

VisualFundamentalTest.vector() |> console.log
