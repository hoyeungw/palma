import { palette }       from '../../../index'
import { greys, Visual } from '../../../index'
import { Mx }            from 'veho'

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
