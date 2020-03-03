import 'xbrief'
import axios from 'axios'
import { Xio } from '../misc/axios-ext'
import { CrosTabX, deco } from 'xbrief'
import 'veho'
import { logger } from 'palma'
import { round } from 'aryth'
import { Dawdle } from 'elprimero/src/Dawdle/Dawdle'
import { GP } from 'elprimero/src/GP'
import { xr } from '@spare/xr'
import { promises as fsPromises } from 'fs'
import { Samples } from 'veho/src/Samples'
import { deca } from '@spare/deco'
import { PivotModes } from 'veho/src/utils/pivot/PivotModes'

const target = 'vintage/crostab/test/asset/json'
const FORMAT_JSON = 'json'
const MILLION = 1e+6
const Indicators = {
  Gdp: 'NY.GDP.MKTP.CD',
  Population: 'SP.POP.TOTL',
  HumanCapitalIndex: 'HD.HCI.OVRL',
  RuralPopulation: 'SP.RUR.TOTL',
  UrbanPopulation: 'SP.URB.TOTL',
  ArmsImports: 'MS.MIL.MPRT.KD',
  ArmsExports: 'MS.MIL.XPRT.KD',
  MilitaryExpenditure: 'MS.MIL.XPND.CD',
  ConsumptionExpenditure: 'NE.CON.TOTL.CD',
  IndustryVA: 'NV.IND.TOTL.CD',
  ManufacturingVA: 'NV.IND.MANF.CD',
  AgricultureForestryFishingVA: 'NV.AGR.TOTL.CD',
  ServicesEtcVA: 'NV.SRV.TETC.CD',
  StocksTradedValue: 'CM.MKT.TRAD.CD',
  MarketCapListedDomestic: 'CM.MKT.LCAP.CD',
  FDINetInflows: 'BX.KLT.DINV.WD.CD',
  FDINetOutflows: 'BM.KLT.DINV.WD.CD',
}

const fetchWorldBank = async ({ country, year: { min, max }, indicator }) => {
  xr(GP.now()).p('fetching').args([country, [min, max], indicator] |> deca({ vu: 1 }))|> logger
  return await axios
    .get(`/country/${country.join(';')}/indicator/${indicator}`, {
      params: { date: `${min}:${max}`, format: FORMAT_JSON, per_page: 2048 },
      baseURL: 'https://api.worldbank.org/v2'
    })
    .then(({ data }) => data)
    .then(([, samples]) => samples
      .map(({ country, countryiso3code, date, value, indicator }) => ({
        unit: indicator.value,
        id: country.id,
        iso: countryiso3code,
        date: date,
        value: value ? round(value / MILLION) : NaN,
        country: country.value,
      }))
    )
    .catch(Xio.logErr)
}

const testWorldBank = async () => {
  const country = ['USA', 'CHN', 'DEU', 'GBR', 'FRA', 'JPN', 'KOR', 'IND', 'EUU', 'CME',]
  const year = { min: 1998, max: 2018 }
  for (let [key, indicator] of Object.entries(Indicators)) {
    key |> logger
    await Dawdle
      .linger(200, fetchWorldBank, { country, year, indicator })
      .then(async samples => {
        const crosTab = Samples.toCrosTab(
          samples,
          { side: 'date', banner: 'iso', field: 'value' },
          { mode: PivotModes.sum }
        )
        crosTab |> CrosTabX.brief |> logger
        return crosTab
      })
      .then(async crosTab =>
        await fsPromises.writeFile(`${target}/${key}.json`, JSON.stringify(crosTab))
      )
      .catch(Xio.logErr)
  }
}

testWorldBank().then()




