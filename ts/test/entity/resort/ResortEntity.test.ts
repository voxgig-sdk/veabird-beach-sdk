

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


describe('ResortEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when VEABIRD_BEACH_TEST_LIVE=TRUE.
  afterEach(liveDelay('VEABIRD_BEACH_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = VeabirdBeachSDK.test()
    const ent = testsdk.Resort()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = VeabirdBeachSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Resort().load({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.VEABIRD_BEACH_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'resort.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"resort","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /beach/resorts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"query","or":"query","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/beach/resorts","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"beach"},{"lit":"resorts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /ski/resorts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"pass","or":"pass","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"query","or":"query","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/ski/resorts","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"ski"},{"lit":"resorts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"resort","name__orig":"resort","Name":"Resort","name_":"resort","name-":"resort","NAME":"RESORT","index$":13}, {"active":true,"entity":"resort","key$":"BasicResortFlow","kind":"basic","name":"BasicResortFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"resort_ref01","srcdatavar":"resort_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-resort_ref01"}}],"index$":0}]}, 'Resort', {"GET /beach/resorts":{"protocol":"http","parameters":[{"name":"query","in":"query","required":false,"description":"e.g. 'tulum', 'punta cana', 'barbados'","schema":{"type":"string"},"index$":0},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","minimum":1,"maximum":100},"index$":1}]},"GET /ski/resorts":{"protocol":"http","parameters":[{"name":"query","in":"query","required":false,"description":"e.g. 'utah', 'alps', 'whistler', 'japan'","schema":{"type":"string"},"index$":0},{"name":"pass","in":"query","required":false,"schema":{"type":"string","enum":["epic","ikon"]},"index$":1},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","minimum":1,"maximum":100},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let resort_ref01_data = Object.values(setup.data.existing.resort)[0] as any

    // LOAD
    const resort_ref01_ent = client.Resort()
    const resort_ref01_match_dt0: any = {}
    const resort_ref01_data_dt0 = (await resort_ref01_ent.load(resort_ref01_match_dt0)).data()
    assert(null != resort_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/resort/ResortTestData.json')

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
    ['resort01','resort02','resort03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'VEABIRD_BEACH_TEST_RESORT_ENTID': idmap,
    'VEABIRD_BEACH_TEST_LIVE': 'FALSE',
    'VEABIRD_BEACH_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['VEABIRD_BEACH_TEST_RESORT_ENTID']

  const live = 'TRUE' === env.VEABIRD_BEACH_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['VEABIRD_BEACH_TEST_RESORT_ENTID']
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
  
