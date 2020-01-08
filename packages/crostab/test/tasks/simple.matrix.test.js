import 'xbrief'
import { nbaScoreLeaders } from '../asset/map/nba.score.leaders'
import '../../src'

function main () {
  let names = [...nbaScoreLeaders.keys()]
  names.take(5).vBrief().wL()
}

export {
  main as simpleTestMatrix
}