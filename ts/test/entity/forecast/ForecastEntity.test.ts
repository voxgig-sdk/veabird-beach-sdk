

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { VeabirdBeachSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ForecastEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when VEABIRD_BEACH_TEST_LIVE=TRUE.
  afterEach(liveDelay('VEABIRD_BEACH_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = VeabirdBeachSDK.test()
    const ent = testsdk.Forecast()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = VeabirdBeachSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Forecast().load({"day":"x","location":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.VEABIRD_BEACH_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'forecast.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"forecast","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /weather/forecast","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"day","or":"days","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"elevation_ft","or":"elevationFt","r":false,"t":"`$NUMBER`","index$":1},{"a":true,"ex":"Chamonix","k":"query","n":"location","or":"location","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"spot","or":"spot","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"unit","or":"units","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/weather/forecast","q":{"exist":["location"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"weather"},{"lit":"forecast"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"forecast","name__orig":"forecast","Name":"Forecast","name_":"forecast","name-":"forecast","NAME":"FORECAST","index$":5}, {"active":true,"entity":"forecast","key$":"BasicForecastFlow","kind":"basic","name":"BasicForecastFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"forecast_ref01","srcdatavar":"forecast_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-forecast_ref01"}}],"index$":0}]}, 'Forecast', {"GET /weather/forecast":{"protocol":"http","parameters":[{"name":"location","in":"query","required":true,"description":"'lat,lon' (most precise), a place ('Moab, UT', 'Chamonix'), or a Veabird ski resort name.","schema":{"type":"string"},"example":"Chamonix","index$":0},{"name":"spot","in":"query","required":false,"description":"At a ski resort: the base (default) or the summit.","schema":{"type":"string","enum":["base","summit"]},"index$":1},{"name":"elevationFt","in":"query","required":false,"description":"Elevation of the exact spot in feet, if known (else from a 90 m terrain map).","schema":{"type":"number","minimum":-1500,"maximum":29000},"index$":2},{"name":"days","in":"query","required":false,"description":"Days ahead (default 10).","schema":{"type":"integer","minimum":1,"maximum":16},"index$":3},{"name":"units","in":"query","required":false,"description":"us (°F, in, mph; default) or metric.","schema":{"type":"string","enum":["us","metric"]},"index$":4}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let forecast_ref01_data = Object.values(setup.data.existing.forecast)[0] as any

    // LOAD
    const forecast_ref01_ent = client.Forecast()
    const forecast_ref01_match_dt0: any = {}
    const forecast_ref01_data_dt0 = (await forecast_ref01_ent.load(forecast_ref01_match_dt0)).data()
    assert(null != forecast_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/forecast/ForecastTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = VeabirdBeachSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['forecast01','forecast02','forecast03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'VEABIRD_BEACH_TEST_FORECAST_ENTID': idmap,
    'VEABIRD_BEACH_TEST_LIVE': 'FALSE',
    'VEABIRD_BEACH_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['VEABIRD_BEACH_TEST_FORECAST_ENTID']

  const live = 'TRUE' === env.VEABIRD_BEACH_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['VEABIRD_BEACH_TEST_FORECAST_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new VeabirdBeachSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.VEABIRD_BEACH_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
