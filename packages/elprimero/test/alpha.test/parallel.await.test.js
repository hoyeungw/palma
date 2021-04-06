const correctAsync500ms = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 500, 'correct500msResult')
  })
}

const correctAsync100ms = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 100, 'correct100msResult')
  })
}

const rejectAsync100ms = () => {
  return new Promise((resolve, reject) => {
    setTimeout(reject, 100, 'reject100msError')
  })
}

const asyncInArray = async (fun1, fun2) => {
  const label = 'test async functions in array'
  try {
    console.time(label)
    const p1 = fun1()
    const p2 = fun2()
    const result = [await p1, await p2]
    console.timeEnd(label)
  } catch (e) {
    console.error('error is', e)
    console.timeEnd(label)
  }
}

const asyncInPromiseAll = async (fun1, fun2) => {
  const label = 'test async functions with Promise.all'
  try {
    console.time(label)
    let [value1, value2] = await Promise.all([fun1(), fun2()])
    console.timeEnd(label)
  } catch (e) {
    console.error('error is', e)
    console.timeEnd(label)
  }
};

(async () => {
  console.group('async functions without error')
  console.log('async functions without error: start')
  await asyncInArray(correctAsync500ms, correctAsync100ms)
  await asyncInPromiseAll(correctAsync500ms, correctAsync100ms)
  console.groupEnd()

  console.group('async functions with error')
  console.log('async functions with error: start')
  await asyncInArray(correctAsync500ms, rejectAsync100ms)
  await asyncInPromiseAll(correctAsync500ms, rejectAsync100ms)
  console.groupEnd()
})()
