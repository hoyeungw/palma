import { GP, Dawdle } from '../../dist/index.cjs'

GP.now() |> console.log
Dawdle
  .linger(2000, () => 'later')
  .then(it => `${GP.now()} ${it}` |> console.log)

