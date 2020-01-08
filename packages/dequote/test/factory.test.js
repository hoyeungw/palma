import { Dequote } from '../src'
import { castList } from './assets/Bistro'

export const factoryTest = () => {
  const dequote = Dequote.build(castList)

  const says = {
    chef: dequote.credit('chef'),
    aboyeur: dequote.credit('aboyeur')
  }

  const says2 = dequote.batchCredit(['vendor', { indent: 1 }], 'bistro', 'someone-else')
  'Shakespeare' |> says.chef
  'Dickens' |> says.aboyeur
  'Vendor' |> says2.vendor
  'Bistro' |> says2.bistro
}


