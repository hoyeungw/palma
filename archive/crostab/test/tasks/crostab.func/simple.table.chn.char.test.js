import { Table } from '../../../index'
import { Dic }   from 'veho'
import { Str }   from 'xbrief'

const rowSet = [
  { name: 'JackieChan北京耀莱', box: 354799, showCount: 125, audience: 7677, price: 46.22, avgPeople: 61.42 },
  { name: '金逸北京大悦城IMAX店', box: 333561, showCount: 61, audience: 4983, price: 66.94, avgPeople: 81.69 },
  { name: '广州飞扬影城（正佳分店）', box: 269439, showCount: 67, audience: 4604, price: 58.52, avgPeople: 68.72 },
  { name: '金逸北京荟聚IMAX店', box: 250328, showCount: 73, audience: 4616, price: 54.23, avgPeople: 63.23 },
  { name: '广州飞扬影城', box: 246854, showCount: 58, audience: 4375, price: 56.42, avgPeople: 75.43 },
  { name: '首都电影院西单店', box: 241699, showCount: 76, audience: 4109, price: 58.82, avgPeople: 54.07 },
  { name: '北京寰映合生汇店', box: 231942, showCount: 63, audience: 3633, price: 63.84, avgPeople: 57.67 },
  { name: '南京新街口国际影城', box: 230295, showCount: 107, audience: 5543, price: 41.55, avgPeople: 51.8 },
  { name: 'UME影城（北京双井店）', box: 224883, showCount: 70, audience: 3359, price: 66.95, avgPeople: 47.99 },
  { name: '上海百丽宫影城（环贸iapm店）', box: 222610, showCount: 40, audience: 2811, price: 79.19, avgPeople: 70.28 },
  { name: '恒大影都', box: undefined, showCount: null, audience: [], price: {}, avgPeople: 70.28 }
]

function uniLength (str) {
  const halfAng = str.match(/[\u0000-\u00ff]/g) || [] //半角
  const chinese = str.match(/[\u4e00-\u9fa5]/g) || [] //中文
  const fullAng = str.match(/[\uff00-\uffff]/g) || [] //全角
  return halfAng.length + (chinese.length + fullAng.length) * 2
}

function extraLen (str) {
  const chinese = str.match(/[\u4e00-\u9fa5]/g) || [] //中文
  const fullAng = str.match(/[\uff00-\uffff]/g) || [] //全角
  return (chinese.length + fullAng.length)
}

export class SimpleTableChnCharTest {
  static main () {
    const table = Table.fromSamples(rowSet, 'cinema perf')
    table.briefCn().wL()
  }

  static test2 () {
    const table = Table.fromSamples(rowSet, 'cinema perf')
    const column = [
      'Jack耀莱',
      '广州飞扬',
      'UME（双井）',
      'IMAX',
    ]
    column.map(Str.toFullAngle).vBrief().wL()
    const lengths = column.map(it => uniLength(it))
    const maxLen = Math.max(...lengths)
    const lex = Dic.ini(column.zip(lengths, (it, len) => '(' + it.padStart(maxLen - len + it.length) + ')'),
      lengths)
    lex.vBrief().wL()
    for (const key of lex.keys()) {
      key.wL()
    }
  }

  static test3 () {
    const column = [
      'Jack耀莱',
      '广州飞扬',
      'UME（双井）',
      'IMAX',
    ]
    const rsls = column.map(Str.hasChn)
    const show = Dic.ini(column, rsls)
    show.vBrief().wL()
  }
}

// console.log(str.match(/[\u0000-\u00ff]/g))     //半角
// console.log(str.match(/[\u4e00-\u9fa5]/g))     //中文
// console.log(str.match(/[\uff00-\uffff]/g))     //全角

