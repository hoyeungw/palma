import 'xbrief'
import axios from 'axios'
import { Xio } from '../misc/axios-ext'
import { deco } from 'xbrief'
import 'veho'
import { nowTM } from 'elprimero'
import fs from 'fs'

axios.defaults.withCredentials = true

class WorldBank {
  static gdp (country, year) {
    `Let\'s test ${WorldBank.name}.${WorldBank.gdp.name}()`.wL()
    axios
      .get(`https://api.worldbank.org/v2/country/${country}/indicator/NY.GDP.MKTP.CD`, {
        params: {
          'date': year,
          'format': 'json',
        }
      })
      .then(response => {
        deco(response.data).wL()
      })
      .catch(Xio.logErr)
  }

  static population (country, year) {
    `Let\'s test ${WorldBank.name}.${WorldBank.population.name}()`.wL()
    axios
      .get(`https://api.worldbank.org/v2/country/${country}/indicator/SP.POP.TOTL`, {
        params: {
          'date': year,
          'format': 'json',
        }
      })
      .then(response => {
        deco(response.data).wL()
      })
      .catch(Xio.logErr)
  }

  static async crawlAndSave (countries, years) {
    // 并发读取远程URL
    const cartesianParameters = countries
      .map(country => years.map(year => ({ country, year })))
      .reduce((country1ofAllYears, country2ofAllYears) =>
          country1ofAllYears.concat(country2ofAllYears)
        , [])
    // deco(cartesianParameters).wL()
    const textPromises = cartesianParameters.map(async p => {
      let result1 = {}
      let result2 = {}
      await axios
        .get(`https://api.worldbank.org/v2/country/${p.country}/indicator/NY.GDP.MKTP.CD`, {
          params: {
            'date': p.year,
            'format': 'json',
          }
        })
        .then(response => {
          nowTM().tag(`${p.country},${p.year}`).wL()
          // deco(response.data).wL()
          result1 = response.data
        })
        .catch(Xio.logErr)
      await axios
        .get(`https://api.worldbank.org/v2/country/${p.country}/indicator/SP.POP.TOTL`, {
          params: {
            'date': p.year,
            'format': 'json',
          }
        })
        .then(response => {
          nowTM().tag(`${p.country},${p.year}`).wL()
          // deco(response.data).wL()
          result2 = response.data
        })
        .catch(Xio.logErr)
      const obj1 = result1[1][0]
      const obj2 = result2[1][0]
      // return obj
      return {
        'country': obj1.countryiso3code,
        'year': obj1.date,
        'gdp': ~~(obj1.value / Math.pow(10, 9)),
        'pop': ~~(obj2.value / Math.pow(10, 6))
      }
    })

    // 按次序输出
    // for (const textPromise of textPromises) {
    //   nowTM().tag('read').wL()
    //   deco(await textPromise).wL()
    // }
    Promise.all(textPromises).then(arr => {
      console.log(arr)
      fs.writeFileSync('./test/asset/json/gdp.rows.json', JSON.stringify(arr, null, 2))
    })
    nowTM().tag('Done').wL()
  }
}

export {
  WorldBank
}
