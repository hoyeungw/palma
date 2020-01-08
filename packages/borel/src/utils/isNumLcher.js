import { Num, NumLoose } from 'typen'

export const isNumLcher = (level = 0) => {
  switch (level) {
    case 0:
      return x => !isNaN(x)
    case 1:
      return NumLoose.isNumeric
    case 2:
    default:
      return Num.isNumeric
  }
}

export const toNumLcher = (level = 0) => {
  switch (level) {
    case 0:
      return x => x
    case 1:
      return NumLoose.numeric
    case 2:
    default:
      return Num.numeric
  }
}