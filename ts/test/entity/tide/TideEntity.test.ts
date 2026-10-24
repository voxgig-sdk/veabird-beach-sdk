

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


describe('TideEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when VEABIRD_BEACH_TEST_LIVE=TRUE.
  afterEach(liveDelay('VEABIRD_BEACH_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = VeabirdBeachSDK.test()
    const ent = testsdk.Tide()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = VeabirdBeachSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Tide().load({"day":"x","resort":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.VEABIRD_BEACH_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'tide.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"tide","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /beach/tides","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"day","or":"days","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"Tulum","k":"query","n":"resort","or":"resort","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/beach/tides","q":{"exist":["resort"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"beach"},{"lit":"tides"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"tide","name__orig":"tide","Name":"Tide","name_":"tide","name-":"tide","NAME":"TIDE","index$":16}, {"active":true,"entity":"tide","key$":"BasicTideFlow","kind":"basic","name":"BasicTideFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"tide_ref01","srcdatavar":"tide_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-tide_ref01"}}],"index$":0}]}, 'Tide', {"GET /beach/tides":{"protocol":"http","parameters":[{"name":"resort","in":"query","required":true,"schema":{"type":"string"},"example":"Tulum","index$":0},{"name":"days","in":"query","required":false,"schema":{"type":"integer","minimum":1,"maximum":7},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let tide_ref01_data = Object.values(setup.data.existing.tide)[0] as any

    // LOAD
    const tide_ref01_ent = client.Tide()
    const tide_ref01_match_dt0: any = {}
    const tide_ref01_data_dt0 = (await tide_ref01_ent.load(tide_ref01_match_dt0)).data()
    assert(null != tide_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/tide/TideTestData.json')

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
    ['tide01','tide02','tide03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'VEABIRD_BEACH_TEST_TIDE_ENTID': idmap,
    'VEABIRD_BEACH_TEST_LIVE': 'FALSE',
    'VEABIRD_BEACH_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['VEABIRD_BEACH_TEST_TIDE_ENTID']

  const live = 'TRUE' === env.VEABIRD_BEACH_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['VEABIRD_BEACH_TEST_TIDE_ENTID']
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
  
