import { iterateStaticMethod } from './utils/iterateStaticMethod'
import { TestAxiosAlphaVantage } from './tasks/axios.alphavantage.test'
import { SimpleMatrixTest } from './tasks/simple.matrix.test'
import { ArTest } from './tasks/ar.test'
import { SimpleJsoTest } from './tasks/simple.Ob.test'

test('TestAxiosAlphaVantage', () => {
  iterateStaticMethod(TestAxiosAlphaVantage)
})

test('MatrixTest', () => {
  iterateStaticMethod(SimpleMatrixTest)
})

test('SimpleVectorTest', () => {
  ArTest.test_iterator()
  // iterateStaticMethod(ArTest)
})

test('SimpleJsoTest', () => {
  iterateStaticMethod(SimpleJsoTest)
})
