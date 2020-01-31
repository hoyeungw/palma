import 'xbrief'
import { nbaScoreLeaders } from '../asset/map/nba.score.leaders'
import '../../index'

function main () {
  let names = [...nbaScoreLeaders.keys()]
  names.take(5).vBrief().wL()
}

export {
  main as simpleTestMatrix
}
