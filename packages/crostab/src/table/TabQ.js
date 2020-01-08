import { joiner } from '../misc/MxJoin/MxJoin'
import { Ar } from 'veho'
import { Comparer } from 'borel'
import { Table } from './Table'
import { JoinT } from '../misc/MxJoin/JoinT'

export class TabQ {
  /**
   *
   * @param {Table} table
   * @param {Table} another
   * @param {string[]|number[]} indexFields
   * @param {number} [joinType=-1] - union:0,left:1,right:2,intersect:-1
   * @param {*} [fillEmpty]
   * @returns {Table}
   */
  static join (table, another, indexFields, joinType = JoinT.intersect, fillEmpty = null) {
    const
      ysL = indexFields.map(x => table.coin(x)),
      ysR = indexFields.map(x => another.coin(x)),
      joinFn = joiner(joinType),
      matrix = joinFn({ mx: table.matrix, ys: ysL }, { mx: another.matrix, ys: ysR }, fillEmpty),
      banner = Ar.select(table.banner, ysL).concat(
        Ar.splices(table.banner.slice(), ysL.slice().sort(Comparer.numberAscending)),
        Ar.splices(another.banner.slice(), ysL.slice().sort(Comparer.numberAscending))
      )
    return new Table(banner, matrix, `${table.title} ${another.title}`)
  }
}
