import { tube } from '../../utils/hsl'


export const amp = (x, m, rto, min) => (x - m) * rto + min
export const chalkify = (x, m, [rH, rS, rL], [mH, mS, mL]) => [amp(x, m, rH, mH), amp(x, m, rS, mS), amp(x, m, rL, mL)] |> tube
