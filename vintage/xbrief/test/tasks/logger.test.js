import { decoLog, logger, logNeL } from '../../src/logger/logger'

const obj = {
  ob: ({ foo: 'bar', kha: 'mia' }),
  str: 'shakespeare',
  num: 0x200,
  udf: undefined,
  nul: null,
  inf: Number.POSITIVE_INFINITY,
  eps: Number.EPSILON
}

for (let k in obj) {
  logger(obj[k])
}

for (let k in obj) {
  logNeL(obj[k])
}

for (let k in obj) {
  decoLog(obj[k])
}

