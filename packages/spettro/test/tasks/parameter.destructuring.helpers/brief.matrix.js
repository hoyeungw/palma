import { palette } from '../../../dist/index.esm'
import { greys, Visual } from '../../../src'
import { Mx } from 'veho'

export function briefMatrix (
  matrix,
  {
    abstract,
    visual = {
      on: true,
      mark: {
        max: palette.lightGreen.accent_3,
        min: palette.orange.accent_2,
        na: greys.blueGrey.lighten_3,
      },
      direct: 1
    }
  } = {},
) {
  // visual |> console.log
  return abstract
    ? Visual.matrix(Mx.map(matrix, abstract), visual)
    : Visual.matrix(matrix, visual)
}