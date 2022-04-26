/**
 *
 * @param {function} abstract
 * @param {boolean} on
 * @param {number} max
 * @param {number} min
 * @param {number} direct
 * @returns {{visual: {on: *, mark: {min: *, max: *}, direct: *}, abstract: *}}
 */
import { deco, Xr } from 'xbrief'

export function briefBeta ({
  abstract = null,
  visual: {
    on = true,
    mark: {
      max = 128,
      min = 256
    } = {},
    direct = 2
  } = {},
} = {}) {
  Xr('pipeline brief beta').tag(({
    abstract, visual: { on, mark: { max, min }, direct }
  }) |> deco).tx |> console.log
  return {
    abstract, visual: { on, mark: { max, min }, direct }
  }
}