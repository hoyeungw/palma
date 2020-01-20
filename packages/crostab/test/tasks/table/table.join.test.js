import { Table, TabX } from '../../../index'
import { JoinT } from '../../../index'
import { TabQ } from '../../../src/table/TabQ'

export class TableJoinTest {
  static test () {
    const balance = Table.from({
      banner: ['date', 'symbol', 'ast', 'liab', 'eqt'],
      matrix: [
        ['2025-12-31', 'AAPL', 1000, 500, 500],
        ['2024-12-31', 'AAPL', 800, 500, 300],
        ['2023-12-31', 'AAPL', 700, 450, 250],
        ['2025-12-31', 'MSFT', 900, 300, 600],
        ['2024-12-31', 'MSFT', 780, 280, 500],
        ['2023-12-31', 'MSFT', 710, 260, 450],
      ],
      title: 'balance'
    })
    const income = Table.from({
      banner: ['date', 'symbol', 'rev', 'cost', 'inc'],
      matrix: [
        ['2024-12-31', 'AAPL', 600, 500, 100],
        ['2023-12-31', 'AAPL', 500, 420, 80],
        ['2022-12-31', 'AAPL', 400, 330, 70],
        ['2024-12-31', 'MSFT', 580, 490, 90],
        ['2023-12-31', 'MSFT', 480, 400, 80],
        ['2022-12-31', 'MSFT', 420, 350, 70],
      ],
      title: 'income'
    })
    TabQ.join(balance, income, ['date'], JoinT.intersect) |> TabX.brief |> console.log

    '' |> console.log
    // 'Original balance table' |> console.log
    // balance |> TabX.brief |> console.log
  }
}

