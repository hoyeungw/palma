import { logger } from '../../logger/logger'
import { Xr } from '../Xr'
import { GP } from 'elprimero'

const ink = Xr('  ', 'b', 'c').p('what')['title']('some').content('chapter')

'ink' |> logger
ink |> logger

'ink()' |> logger
ink.asc()() |> logger

Xr(GP.now(), 'NewsWsj', 'headlines')
  .p('channel').br('world')
  .p('fetched.').br(5).toString() |> console.log
