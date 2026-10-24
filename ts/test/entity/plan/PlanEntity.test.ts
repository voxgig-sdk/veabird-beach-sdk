

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


describe('PlanEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when VEABIRD_BEACH_TEST_LIVE=TRUE.
  afterEach(liveDelay('VEABIRD_BEACH_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = VeabirdBeachSDK.test()
    const ent = testsdk.Plan()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = VeabirdBeachSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Plan().load({"adult":"x","depart":"x","resort":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.VEABIRD_BEACH_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'plan.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"plan","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /trip/plan","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"adult","or":"adults","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"children_age","or":"childrenAges","r":false,"t":"`$ARRAY`","index$":1},{"a":true,"ex":"2027-01-15","k":"query","n":"depart","or":"depart","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"from","or":"from","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"kind","or":"kind","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"max_price_per_night","or":"maxPricePerNight","r":false,"t":"`$NUMBER`","index$":5},{"a":true,"ex":"Breckenridge","k":"query","n":"resort","or":"resort","r":true,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"return","or":"return","r":false,"t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/trip/plan","q":{"exist":["depart","resort"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"trip"},{"lit":"plan"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"plan","name__orig":"plan","Name":"Plan","name_":"plan","name-":"plan","NAME":"PLAN","index$":11}, {"active":true,"entity":"plan","key$":"BasicPlanFlow","kind":"basic","name":"BasicPlanFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"plan_ref01","srcdatavar":"plan_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-plan_ref01"}}],"index$":0}]}, 'Plan', {"GET /trip/plan":{"protocol":"http","parameters":[{"name":"resort","in":"query","required":true,"description":"Ski or beach resort name or id.","schema":{"type":"string"},"example":"Breckenridge","index$":0},{"name":"kind","in":"query","required":false,"description":"Only if the name is ambiguous.","schema":{"type":"string","enum":["ski","beach"]},"index$":1},{"name":"from","in":"query","required":false,"description":"Traveler's home airport code (e.g. DFW), city (e.g. 'Dallas') or 'lat,lon'.","schema":{"type":"string"},"index$":2},{"name":"depart","in":"query","required":true,"description":"Arrival date, YYYY-MM-DD.","schema":{"type":"string","pattern":"^\\d{4}-\\d{2}-\\d{2}$"},"example":"2027-01-15","index$":3},{"name":"return","in":"query","required":false,"description":"Departure date (default 4 nights later).","schema":{"type":"string","pattern":"^\\d{4}-\\d{2}-\\d{2}$"},"index$":4},{"name":"adults","in":"query","required":false,"description":"Adults (default 2).","schema":{"type":"integer","minimum":1,"maximum":16},"index$":5},{"name":"childrenAges","in":"query","required":false,"description":"Ages of children traveling, e.g. [6, 9].","style":"form","explode":false,"schema":{"type":"array","items":{"type":"integer","minimum":0,"maximum":17},"maxItems":8},"index$":6},{"name":"maxPricePerNight","in":"query","required":false,"description":"Lodging budget per night for the whole party, in USD.","schema":{"type":"number","minimum":20,"maximum":20000},"index$":7}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let plan_ref01_data = Object.values(setup.data.existing.plan)[0] as any

    // LOAD
    const plan_ref01_ent = client.Plan()
    const plan_ref01_match_dt0: any = {}
    const plan_ref01_data_dt0 = (await plan_ref01_ent.load(plan_ref01_match_dt0)).data()
    assert(null != plan_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/plan/PlanTestData.json')

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
    ['plan01','plan02','plan03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'VEABIRD_BEACH_TEST_PLAN_ENTID': idmap,
    'VEABIRD_BEACH_TEST_LIVE': 'FALSE',
    'VEABIRD_BEACH_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['VEABIRD_BEACH_TEST_PLAN_ENTID']

  const live = 'TRUE' === env.VEABIRD_BEACH_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['VEABIRD_BEACH_TEST_PLAN_ENTID']
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
  
