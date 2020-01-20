import { deco } from '../../../index'
import { superlativeTrees } from '../../asset/superlativTrees.json'

class DecoTest {
  static decoTest () {
    const simple_array = [1, 2, 3, 4, 5]
    const objects = {
      boolean: true,
      string: 'Shakespeare',
      number: 128,
      null: null,
      undefined: undefined,
      simple_array: simple_array,
      empty_matrix: [[]],
      one_row_matrix: [simple_array],
      simple_set: new Set([1, 1, 1, 2, 2, 3, 3, 3]),
      simple_matrix: Array.from({ length: 3 }, (_, x) => Array.from({ length: 12 }, (_, y) => x + y + 1)),
      simple_map: new Map([['Lagos', 861], ['Dhaka', 8906], ['Lima', 9174], ['Ankara', 5271], ['Nagpur', 2405]]),
      superlativeTrees_map: superlativeTrees,
      simple_lambda: x => `${x}`
    }

    // JSON.stringify(objects|> deco) |> console.log
    objects |> deco |> console.log
  }
}

// it('deco test', () => {
//   DecoTest.decoTest()
// })

export { DecoTest }



