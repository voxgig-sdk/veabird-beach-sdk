

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


describe('FlightEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when VEABIRD_BEACH_TEST_LIVE=TRUE.
  afterEach(liveDelay('VEABIRD_BEACH_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = VeabirdBeachSDK.test()
    const ent = testsdk.Flight()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = VeabirdBeachSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Flight().load({"adult":"x","depart":"x","from":"x","to":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.VEABIRD_BEACH_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'flight.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"flight","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /trip/flights","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"adult","or":"adults","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"children_age","or":"childrenAges","r":false,"t":"`$ARRAY`","index$":1},{"a":true,"ex":"2027-01-15","k":"query","n":"depart","or":"depart","r":true,"t":"`$STRING`","index$":2},{"a":true,"ex":"DFW","k":"query","n":"from","or":"from","r":true,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"return","or":"return","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"Breckenridge","k":"query","n":"to","or":"to","r":true,"t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/trip/flights","q":{"exist":["depart","from","to"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"trip"},{"lit":"flights"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"flight","name__orig":"flight","Name":"Flight","name_":"flight","name-":"flight","NAME":"FLIGHT","index$":4}, {"active":true,"entity":"flight","key$":"BasicFlightFlow","kind":"basic","name":"BasicFlightFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"flight_ref01","srcdatavar":"flight_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-flight_ref01"}}],"index$":0}]}, 'Flight', {"GET /trip/flights":{"protocol":"http","parameters":[{"name":"from","in":"query","required":true,"description":"Traveler's home airport code (e.g. DFW), city (e.g. 'Dallas') or 'lat,lon'.","schema":{"type":"string"},"example":"DFW","index$":0},{"name":"to","in":"query","required":true,"description":"Ski or beach resort name/id, or a destination airport code.","schema":{"type":"string"},"example":"Breckenridge","index$":1},{"name":"depart","in":"query","required":true,"description":"YYYY-MM-DD","schema":{"type":"string","pattern":"^\\d{4}-\\d{2}-\\d{2}$"},"example":"2027-01-15","index$":2},{"name":"return","in":"query","required":false,"description":"Return date (optional for one-way).","schema":{"type":"string","pattern":"^\\d{4}-\\d{2}-\\d{2}$"},"index$":3},{"name":"adults","in":"query","required":false,"description":"Adults (default 2).","schema":{"type":"integer","minimum":1,"maximum":16},"index$":4},{"name":"childrenAges","in":"query","required":false,"description":"Ages of children traveling, e.g. [6, 9].","style":"form","explode":false,"schema":{"type":"array","items":{"type":"integer","minimum":0,"maximum":17},"maxItems":8},"index$":5}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let flight_ref01_data = Object.values(setup.data.existing.flight)[0] as any

    // LOAD
    const flight_ref01_ent = client.Flight()
    const flight_ref01_match_dt0: any = {}
    const flight_ref01_data_dt0 = (await flight_ref01_ent.load(flight_ref01_match_dt0)).data()
    assert(null != flight_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/flight/FlightTestData.json')

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
    ['flight01','flight02','flight03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'VEABIRD_BEACH_TEST_FLIGHT_ENTID': idmap,
    'VEABIRD_BEACH_TEST_LIVE': 'FALSE',
    'VEABIRD_BEACH_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['VEABIRD_BEACH_TEST_FLIGHT_ENTID']

  const live = 'TRUE' === env.VEABIRD_BEACH_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['VEABIRD_BEACH_TEST_FLIGHT_ENTID']
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
  
