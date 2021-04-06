import { joinIntersect, joinLeft, joinRight, joinUnion } from '../../../src/utils/MxJoin/mxJoin'
import { MatX } from 'xbrief'

export class MxJoinTest {
  static test () {
    const mxL = [
      ['a', '2025-12-31', 'AAPL', 1000, 500, 500],
      ['b', '2024-12-31', 'AAPL', 800, 500, 300],
      ['c', '2023-12-31', 'AAPL', 700, 450, 250],
      ['a', '2025-12-31', 'MSFT', 900, 300, 600],
      ['b', '2024-12-31', 'MSFT', 780, 280, 500],
      ['c', '2023-12-31', 'MSFT', 710, 260, 450],
    ]
    const mxR =
      [
        [600, 500, 100, '2024-12-31', 'AAPL',],
        [500, 420, 80, '2023-12-31', 'AAPL',],
        [400, 330, 70, '2022-12-31', 'AAPL',],
        [580, 490, 90, '2024-12-31', 'MSFT',],
        [480, 400, 80, '2023-12-31', 'MSFT',],
        [420, 350, 70, '2022-12-31', 'MSFT',],
      ]
    const joinedUnion = joinIntersect({ mx: mxL, ys: [2, 1] }, { mx: mxR, ys: [4, 3] })
    joinedUnion |> MatX.xBrief |> console.log
  }
}
