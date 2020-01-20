import { deco, Xr } from 'xbrief'
import { pal } from './config'

/**
 *
 * @param {function} [abstract]
 * @param {{
 *          [on]:boolean,
 *          mark:{
 *            [max]:number,
 *            [min]:number
 *          }
 *          [direct]:number
 *          }} [visual]
 * @returns {{abstract: *, visual: *}}
 */
export function briefAlpha ({
  abstract = null,
  visual = {
    on: true,
    mark: {
      max: pal.foo.max,
      min: pal.foo.min
    },
    direct: 2
  }
} = {}) {
  // visual.on = visual.on || true
  // visual.direct = visual.direct || 2
  // visual.mark = visual.mark || { max: 128, min: 256 }
  // visual.mark.max = visual.mark.max || 128
  // visual.mark.min = visual.mark.min || 256
  Xr('pipeline brief alpha').tag(({ abstract, visual }) |> deco).tx |> console.log
  return {
    abstract, visual
  }
}