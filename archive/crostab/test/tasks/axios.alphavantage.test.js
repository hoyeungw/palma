import 'xbrief'
import axios    from 'axios'
import { Xio }  from '../misc/axios-ext'
import { deco } from 'xbrief'

axios.defaults.withCredentials = true
function testAxiosAlphaVantage () {
  const arr = [1, 2, 3, 4, 5]
  let content = ''
  axios
    .get(`https://www.alphavantage.co/query`, {
      params: {
        'function': 'TIME_SERIES_MONTHLY',//TIME_SERIES_INTRADAY
        'symbol': 'sh601009',
        'apikey': 'DA0GB1RTQ5343QDB'
      }
    })
    .then(response => {
      content = response.data
      console.log(response.data)
    })
    .catch(Xio.logErr)
  deco(content).wL()
  const message = 'Hello ES6!'
  // arr.vBrief().wL()
  message.wL()
  arr.vBrief().wL()
}

export {
  testAxiosAlphaVantage
}
