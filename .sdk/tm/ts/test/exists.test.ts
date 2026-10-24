
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { VeabirdBeachSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = VeabirdBeachSDK.test()
    equal(testsdk instanceof VeabirdBeachSDK, true,
      'VeabirdBeachSDK.test() must return a client synchronously')
  })

})
