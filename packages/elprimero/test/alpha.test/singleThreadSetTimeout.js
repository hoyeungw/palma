class SingleThreadSetTimeoutTest {
  static test () {
    const start = Date.now()//获取当前时间戳
    setTimeout(() => {
      console.log(Date.now() - start)
      for (let i = 0; i < 1000000000; i++) {//执行长循环
      }
    }, 1000)
    setTimeout(() => {
      console.log(Date.now() - start)
    }, 2000)
  }

  static test2 () {
    const start = Date.now()
    createThread(function () { //创建一个子线程执行这10亿次循环
      console.log(Date.now() - start)
      for (let i = 0; i < 1000000000; i++) {
      }
    })
    setTimeout(function () { //因为10亿次循环是在子线程中执行的，所以主线程不受影响
      console.log(Date.now() - start)
    }, 2000)
  }
}

SingleThreadSetTimeoutTest.test()

// describe('Test Set Time Out In Single Thread', function () {
//   this.timeout(1000 * 60)
//   it('Test Set Time Out In Single Thread: test', async () => {
//
//   })
// })
