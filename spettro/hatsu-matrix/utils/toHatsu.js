import { tube } from './tube'

export const amp = (x, m, rto, min) => (x - m) * rto + min
export const toHatsu = (x, m, [rH, rS, rL], [mH, mS, mL]) =>
  [amp(x, m, rH, mH), amp(x, m, rS, mS), amp(x, m, rL, mL)]
    |> tube
