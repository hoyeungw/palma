import { timeout } from './timeout'

export async function lingerStable (ms, fn, ...args) {
  let [it] = await Promise.all([
    fn.apply(null, args),
    timeout(ms)
  ])
  return it
}

