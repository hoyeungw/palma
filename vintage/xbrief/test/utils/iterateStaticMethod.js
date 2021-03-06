import { GP } from 'vintage/xbrief/test/utils/elprimero'
import { deco } from '../../index'

function getStaticMethodNames (cls) {
  return Object
    .getOwnPropertyNames(cls)
    .filter(prop => typeof cls[prop] === 'function')
}

export function iterateStaticMethod (someClass) {
  const funcNames = getStaticMethodNames(someClass)
  const results = funcNames.map(async name => {
    const func = someClass[name]
    const title = `${someClass.name}.${name}`
    GP.now().tag(title)  |> console.log
    // ''  |> console.log
    const result = await func()
    return deco({
      class: someClass.name,
      function: func.name,
      result: result
    })
  })
  Promise.all(results).then(results => {
    try {
      for (const result of results) {
        GP.now().tag(result)  |> console.log
      }
    } catch (e) {
      GP.now().tag('error')  |> console.log
      console.dir(e)
    }
  })
}
