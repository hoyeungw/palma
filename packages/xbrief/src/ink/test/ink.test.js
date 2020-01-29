import { logger } from '../../logger/logger'
import { Xr } from '../Xr'

const ink = Xr('  ', 'b', 'c').p('what')['title']('some').content('chapter')

'ink' |> logger
ink |> logger

'ink()' |> logger
ink.asc()() |> logger
