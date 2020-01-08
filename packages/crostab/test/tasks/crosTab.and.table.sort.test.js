import { CrosTab, Table, TabX, CrosX } from '../../src'
import { Comparer } from 'borel'

const table = Table.from({
  banner: ['day', 'name', 'served', 'sold', 'adt'],
  matrix: [
    [1, 'Joyce', 70, 7, ''],
    [1, 'Joyce', 66, 15, ''],
    [2, 'Joyce', 86, 10, ''],
    [2, 'Joyce', NaN, NaN, ''],
    [3, 'Joyce', 96, 2, ''],
    [1, 'Lance', 98, 15, ''],
    [1, 'Lance', 66, 15, ''],
    [2, 'Lance', 85, 12, ''],
    [2, 'Lance', 63, 12, ''],
    [3, 'Lance', NaN, NaN, ''],
    [1, 'Naomi', 90, 14, ''],
    [1, 'Naomi', 66, 9, ''],
    [2, 'Naomi', NaN, NaN, ''],
    [2, 'Naomi', 93, 16, ''],
    [3, 'Naomi', 78, 8, ''],
  ],
  title: 'duties'
})

const crosTab = CrosTab.from({
  side: ['Beijing', 'Shanghai', 'Shenzhen', 'Chengdu'],
  banner: ['Media', 'Tech', 'Manufacture'],
  matrix: [
    [97, 85, 78],
    [95, 87, 90],
    [82, 95, 92],
    [74, 84, 88]
  ],
  title: 'x-tab'
})

export class SortTest {
  static testTable () {
    'table sortLabel via Comparer.stringAscending' |> console.log
    table.sortLabel(Comparer.stringAscending) |> TabX.brief |> console.log
    '' |> console.log

    'table sort on field [sold] via Comparer.numberDescending' |> console.log
    table.sort('day', Comparer.numberDescending) |> TabX.brief |> console.log
    '' |> console.log
  }

  static testCrosTab () {
    'crosTab sortLabel by rows via Comparer.stringAscending' |> console.log
    crosTab.sortLabel('rows', Comparer.stringAscending) |> CrosX.brief |> console.log
    '' |> console.log

    'crosTab sortLabel by columns via Comparer.stringDescending' |> console.log
    crosTab.sortLabel('columns', Comparer.stringDescending) |> CrosX.brief |> console.log
    '' |> console.log

    'crosTab sort by rows on field [Media] via Comparer.numberAscending' |> console.log
    crosTab.sort('rows', 'Media', Comparer.numberAscending) |> CrosX.brief |> console.log
    '' |> console.log

    'crosTab sort by columns on field [Shanghai] via Comparer.numberDescending' |> console.log
    crosTab.sort('columns', 'Shanghai', Comparer.numberDescending) |> CrosX.brief |> console.log
    '' |> console.log
  }

}
