import { Table } from '../../../index'
import { Str } from 'xbrief'

export class SimpleTableFundamentalTest {
  static test () {
    const BannerSet = {
      short: ['id', 'name'],
      mid: ['id', 'name', 'phone', 'gender'],
      long: ['id', 'name', 'phone', 'gender', 'address', 'favorite']
    }
    const rowSet = [
      [1, 'Nicolas Cage', '021-88205356', 'm'],
      [2, 'Penelope Cruise', '021-88205358', 'f'],
      [3, 'Brad Pitt', '021-88205360', 'm']
    ]
    for (const [k, banner] of Object.entries(BannerSet)) {
      const table = new Table(banner, rowSet, `${k}_info`)
      table.brief().wL()
    }
  }

  static testBrief () {
    const table = new Table(
      ['id', 'year', 'best film', 'best actor', 'best actress', 'best director', 'comment'],
      [
        [91, 2018, 'Green Book', 'Rami Malek', 'Olivia Colman', 'Alfonso Cuarón'],
        [90, 2017, 'The Shape of Water', 'Gary Oldman', 'Frances McDormand', 'Guillermo del Toro'],
        [89, 2016, 'Moonlight', 'Casey Affleck', 'Emma Stone', 'Damien Chazelle'],
        [88, 2015, 'Spotlight', 'Leonardo DiCaprio', 'Brie Larson', 'Alejandro G. Iñárritu'],
        [86, 2014, 'Birdman', 'Eddie Redmayne', 'Julianne Moore', 'Alejandro G. Iñárritu'],
      ],
      'Oscar'
    )
    const briefParams = [
      {
        banner: { head: 2, tail: 0 },
        matrix: { head: 2, tail: 1 }
      },
      {
        banner: { head: 0, tail: 2 },
        matrix: { head: 2, tail: 1 }
      },
      {
        banner: { head: 2, tail: 1 },
        matrix: { head: 2, tail: 1 }
      }
    ]
    briefParams.forEach(briefParam => {
      table.brief(briefParam).wL()
    })
  }
}
