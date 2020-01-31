import { Hatsu } from '..'

const hatsu = Hatsu.rgb([44, 181, 233])
hatsu |> console.log
hatsu('Charles Dickens') |> console.log
hatsu.bold('William Shakespeare') |> console.log
hatsu.yellow.italic.inverse |> console.log
hatsu.yellow.italic.inverse('Leo Tolstoy') |> console.log
