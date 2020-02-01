// export function logger (m, ...p) {
//   console.log(String(m), ...p)
// }
//
// export function logNeL (m, ...p) {
//   console.log(String(m), ...p)
//   console.log('')
// }

import { deco } from '../deco/deco'

export const decoLog = (x) => void console.log(x |> deco)

export const logger = (x, ...p) => void console.log(x + '', ...p)

export const logNeL = (x, ...p) => void console.log(x + '', ...p, '\n')


