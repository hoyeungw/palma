import { Quot } from '../src'
import { castList } from './assets/Bistro'

export const factoryTest = () => {
  const quot = Quot.build(castList)

  const says = {
    chef: quot.credit('chef'),
    aboyeur: quot.credit('aboyeur')
  }

  const says2 = quot.batchCredit(['vendor', { indent: 1 }], 'bistro', 'someone-else')
  'Shakespeare' |> says.chef
  'Dickens' |> says.aboyeur
  'Vendor' |> says2.vendor
  'Bistro' |> says2.bistro
}


