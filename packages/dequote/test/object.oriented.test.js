import { Dequote } from '../src'
import { castList } from './assets/Bistro'

export const ooTest = () => {
  const dequote = Dequote.build(castList)

  dequote.says('chef', '\'Shakespeare\'')
  dequote.says('aboyeur', '\'Dickens\'')
}
