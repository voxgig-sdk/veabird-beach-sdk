

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


describe('OutlookEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when VEABIRD_BEACH_TEST_LIVE=TRUE.
  afterEach(liveDelay('VEABIRD_BEACH_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = VeabirdBeachSDK.test()
    const ent = testsdk.Outlook()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = VeabirdBeachSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Outlook().load({"date":1,"location":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.VEABIRD_BEACH_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'outlook.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"outlook","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /weather/outlook","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"date","or":"date","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"elevation_ft","or":"elevationFt","r":false,"t":"`$NUMBER`","index$":1},{"a":true,"ex":"Chamonix","k":"query","n":"location","or":"location","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"month","or":"months","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"spot","or":"spot","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"start","or":"start","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"unit","or":"units","r":false,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/weather/outlook","q":{"exist":["location"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"weather"},{"lit":"outlook"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"outlook","name__orig":"outlook","Name":"Outlook","name_":"outlook","name-":"outlook","NAME":"OUTLOOK","index$":10}, {"active":true,"entity":"outlook","key$":"BasicOutlookFlow","kind":"basic","name":"BasicOutlookFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"outlook_ref01","srcdatavar":"outlook_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-outlook_ref01"}}],"index$":0}]}, 'Outlook', {"GET /weather/outlook":{"protocol":"http","parameters":[{"name":"location","in":"query","required":true,"description":"'lat,lon' (most precise), a place ('Napa, CA', 'Kyoto'), or a Veabird ski resort name.","schema":{"type":"string"},"example":"Chamonix","index$":0},{"name":"spot","in":"query","required":false,"description":"At a ski resort: the base (default) or the summit.","schema":{"type":"string","enum":["base","summit"]},"index$":1},{"name":"elevationFt","in":"query","required":false,"description":"Elevation of the exact spot in feet, if known.","schema":{"type":"number","minimum":-1500,"maximum":29000},"index$":2},{"name":"date","in":"query","required":false,"description":"A specific date within the next 12 months, YYYY-MM-DD (a wedding, a race, a trip).","schema":{"type":"string","pattern":"^\\d{4}-\\d{2}-\\d{2}$"},"index$":3},{"name":"start","in":"query","required":false,"description":"First month, YYYY-MM (default this month, or the date's month).","schema":{"type":"string","pattern":"^\\d{4}-\\d{2}$"},"index$":4},{"name":"months","in":"query","required":false,"description":"How many months (default 6).","schema":{"type":"integer","minimum":1,"maximum":12},"index$":5},{"name":"units","in":"query","required":false,"description":"us (°F, in; default) or metric.","schema":{"type":"string","enum":["us","metric"]},"index$":6}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let outlook_ref01_data = Object.values(setup.data.existing.outlook)[0] as any

    // LOAD
    const outlook_ref01_ent = client.Outlook()
    const outlook_ref01_match_dt0: any = {}
    const outlook_ref01_data_dt0 = (await outlook_ref01_ent.load(outlook_ref01_match_dt0)).data()
    assert(null != outlook_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/outlook/OutlookTestData.json')

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
    ['outlook01','outlook02','outlook03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'VEABIRD_BEACH_TEST_OUTLOOK_ENTID': idmap,
    'VEABIRD_BEACH_TEST_LIVE': 'FALSE',
    'VEABIRD_BEACH_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['VEABIRD_BEACH_TEST_OUTLOOK_ENTID']

  const live = 'TRUE' === env.VEABIRD_BEACH_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['VEABIRD_BEACH_TEST_OUTLOOK_ENTID']
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
  
