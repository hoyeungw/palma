import { Says } from '../index'
import { castList } from './assets/Bistro'

export const factoryTest = () => {
  const says = Says.build(castList)

  const says1 = {
    chef: says.credit('chef'),
    aboyeur: says.credit('aboyeur')
  }

  const says2 = says.batchCredit(['vendor', { indent: 1 }], 'bistro', 'someone-else')
  'Shakespeare' |> says.chef
  'Dickens' |> says.aboyeur
  'Vendor' |> says2.vendor
  'Bistro' |> says2.bistro
}


