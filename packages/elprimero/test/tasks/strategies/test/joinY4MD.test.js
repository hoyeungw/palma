import { Chrono } from '../../../../dist/index.esm'

const padZeros = (n, l) => {
  n = '' + n
  n = String(n)
  while (n.length < l) n = '0' + n
  return n
}

const pad0 = (n, l) => {
  n = String(n)
  // n = '' + n
  return '0'.repeat(l - n.length) + n
}

export class JoinY4MDTest {
  static test () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+6,
      paramsList: {
        simple: [2019, 12, 31],
        misc: [221, 5, 4],
      },
      funcList: {
        bench: (y, m, d) => `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
        beta: (y, m, d) => [String(y).padStart(4, '0'), String(m).padStart(2, '0'), String(d).padStart(2, '0')].join('-'),
        dev: (y, m, d) => `${y < 1000
          ? pad0(y, 4) : y}-${m < 10
          ? pad0(m, 2) : m}-${d < 10
          ? pad0(d, 2) : d}`,
        fut: (y, m, d) => `${+y < 1000
          ? padZeros(+y, 4) : +y}-${+m < 10
          ? padZeros(+m, 2) : +m}-${+d < 10
          ? padZeros(+d, 2) : +d}`,
        edge: (y, m, d) => `${+y < 1000
          ? padZeros(+y, 4) : +y}-${+m < 10
          ? padZeros(+m, 2) : +m}-${+d < 10
          ? padZeros(+d, 2) : +d}`,

      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log
  }
}

describe('Join Y 4 MD Test', function () {
  this.timeout(1000 * 60)
  it('Join Y 4 MD Test: test', () => {
    JoinY4MDTest.test()
  })
})
