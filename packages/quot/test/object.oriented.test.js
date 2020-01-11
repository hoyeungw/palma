import { Quot } from '../src'
import { castList } from './assets/Bistro'

export const ooTest = () => {
  const quot = Quot.build(castList)

  quot.says('chef', '\'Shakespeare\'')
  quot.says('aboyeur', '\'Dickens\'')
}
