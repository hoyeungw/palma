import 'xbrief'
import { EntX } from 'xbrief'
import { xr } from '@spare/xr'
import { GP } from 'elprimero'
import { logger } from 'palma'

export class Xio {
  static logErr (error) {
    if (error.response) {
      xr(GP.now()).p('axios log').error(
        [
          ['data', error.data],
          ['status', error.status],
          ['headers', error.headers]
        ]|> EntX.vBrief
      ) |> logger
    } else {
      xr(GP.now()).error(error).wL()
    }
    xr(GP.now()).config(JSON.stringify(error.config)).wL()
  }
}
