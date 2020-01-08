import { Table } from '../../../dist/index.umd'
import { deco } from 'xbrief'

const tabObj = {
  title: 'staff',
  banner: ['id', 'name', 'skill', 'level', 'bug'],
  matrix: [
    ['01', 'Andy', 'Java', '78', 5],
    ['02', 'Stan', 'C#', '82', 2],
    ['03', 'Kyle', 'Py', '91', null],
    ['04', 'Will', 'Go', '64', 9],
    ['05', 'Carl', 'Dart', '75', 6],
  ]
}

export class SimpleTableTypeInferTest {
  static test () {
    'original table' |> console.log
    const table = Table.from(tabObj)
    'table'.tag(tabObj.title).tag('types') |> console.log
    deco(table.types) |> console.log
    table.brief() |> console.log

    'change table type' |> console.log
    table.changeType('bug', 'number')
    table.setColumnBy('bug', x => typeof x === 'number' ? Number.isNaN(x) ? 0 : x : 0)
    table.brief() |> console.log

    'infer table type' |> console.log
    table.inferTypes()
    'table.inferTypes()'.tag(table.types) |> console.log
  }
}

test('SimpleTableTypeInferTest test', () => {
  SimpleTableTypeInferTest.test()
})