

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


describe('DemandEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when VEABIRD_BEACH_TEST_LIVE=TRUE.
  afterEach(liveDelay('VEABIRD_BEACH_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = VeabirdBeachSDK.test()
    const ent = testsdk.Demand()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = VeabirdBeachSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Demand().load({"day":"x","location":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.VEABIRD_BEACH_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'demand.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"demand","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /host/demand","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"day","or":"days","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"from","or":"from","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"ical","or":"ical","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"Destin, FL","k":"query","n":"location","or":"location","r":true,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"radius_mile","or":"radiusMiles","r":false,"t":"`$NUMBER`","index$":4},{"a":true,"k":"query","n":"rate","or":"rate","r":false,"t":"`$NUMBER`","index$":5},{"a":true,"k":"query","n":"rate","or":"rates","r":false,"t":"`$ARRAY`","index$":6}]},"k":"http","m":"GET","o":"/host/demand","q":{"exist":["location"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"host"},{"lit":"demand"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"demand","name__orig":"demand","Name":"Demand","name_":"demand","name-":"demand","NAME":"DEMAND","index$":3}, {"active":true,"entity":"demand","key$":"BasicDemandFlow","kind":"basic","name":"BasicDemandFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"demand_ref01","srcdatavar":"demand_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-demand_ref01"}}],"index$":0}]}, 'Demand', {"GET /host/demand":{"protocol":"http","parameters":[{"name":"location","in":"query","required":true,"description":"Where the property is: 'lat,lon' (most precise), a town with state or country ('Destin, FL', 'Tulum'), or a Veabird beach resort name.","schema":{"type":"string"},"example":"Destin, FL","index$":0},{"name":"ical","in":"query","required":false,"description":"The listing's calendar export (iCal, .ics) link. Airbnb: Calendar > Availability > Connect calendars > Export. Vrbo: Calendar > Import/Export > Export. Read once, never stored.","schema":{"type":"string","maxLength":1000},"index$":1},{"name":"rate","in":"query","required":false,"description":"The property's normal nightly rate (USD or local currency).","schema":{"type":"number","minimum":10,"maximum":100000},"index$":2},{"name":"rates","in":"query","required":false,"description":"Current nightly rates for specific dates, e.g. ['2026-10-17=189','2026-10-18=189'].","style":"form","explode":false,"schema":{"type":"array","maxItems":120,"items":{"type":"string","pattern":"^\\d{4}-\\d{2}-\\d{2}=\\d+(\\.\\d+)?$","description":"YYYY-MM-DD=price"}},"index$":3},{"name":"from","in":"query","required":false,"description":"First night, YYYY-MM-DD (default today).","schema":{"type":"string","pattern":"^\\d{4}-\\d{2}-\\d{2}$"},"index$":4},{"name":"days","in":"query","required":false,"description":"Nights to check (default 35; events are listed about 5 weeks ahead, holidays further).","schema":{"type":"integer","minimum":7,"maximum":60},"index$":5},{"name":"radiusMiles","in":"query","required":false,"description":"How far an event still sends guests to this property (default 25; use ~10 in a big city, 40+ for a remote area).","schema":{"type":"number","minimum":2,"maximum":100},"index$":6}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let demand_ref01_data = Object.values(setup.data.existing.demand)[0] as any

    // LOAD
    const demand_ref01_ent = client.Demand()
    const demand_ref01_match_dt0: any = {}
    const demand_ref01_data_dt0 = (await demand_ref01_ent.load(demand_ref01_match_dt0)).data()
    assert(null != demand_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/demand/DemandTestData.json')

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
    ['demand01','demand02','demand03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'VEABIRD_BEACH_TEST_DEMAND_ENTID': idmap,
    'VEABIRD_BEACH_TEST_LIVE': 'FALSE',
    'VEABIRD_BEACH_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['VEABIRD_BEACH_TEST_DEMAND_ENTID']

  const live = 'TRUE' === env.VEABIRD_BEACH_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['VEABIRD_BEACH_TEST_DEMAND_ENTID']
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
  
