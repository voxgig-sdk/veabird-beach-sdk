

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


describe('RankEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when VEABIRD_BEACH_TEST_LIVE=TRUE.
  afterEach(liveDelay('VEABIRD_BEACH_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = VeabirdBeachSDK.test()
    const ent = testsdk.Rank()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = VeabirdBeachSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Rank().load({"date":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.VEABIRD_BEACH_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'rank.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"rank","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /beach/rank","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"date","or":"date","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"from","or":"from","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"near","or":"near","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"query","or":"query","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"radius_mile","or":"radiusMiles","r":false,"t":"`$NUMBER`","index$":5}]},"k":"http","m":"GET","o":"/beach/rank","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"beach"},{"lit":"rank"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"rank","name__orig":"rank","Name":"Rank","name_":"rank","name-":"rank","NAME":"RANK","index$":12}, {"active":true,"entity":"rank","key$":"BasicRankFlow","kind":"basic","name":"BasicRankFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"rank_ref01","srcdatavar":"rank_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-rank_ref01"}}],"index$":0}]}, 'Rank', {"GET /beach/rank":{"protocol":"http","parameters":[{"name":"date","in":"query","required":false,"description":"YYYY-MM-DD (default today). Beyond 16 days needs a narrow query or near.","schema":{"type":"string","pattern":"^\\d{4}-\\d{2}-\\d{2}$"},"index$":0},{"name":"query","in":"query","required":false,"description":"Region, island, town or country, e.g. 'mexico', 'bahamas', 'punta cana'.","schema":{"type":"string"},"index$":1},{"name":"near","in":"query","required":false,"description":"Resort id or name to rank around.","schema":{"type":"string"},"index$":2},{"name":"radiusMiles","in":"query","required":false,"description":"With near: max distance (default 300).","schema":{"type":"number","minimum":10,"maximum":2000},"index$":3},{"name":"from","in":"query","required":false,"description":"Traveler's home airport code (e.g. DFW), city (e.g. 'Dallas') or 'lat,lon'.","schema":{"type":"string"},"index$":4},{"name":"limit","in":"query","required":false,"description":"Default 8.","schema":{"type":"integer","minimum":1,"maximum":25},"index$":5}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let rank_ref01_data = Object.values(setup.data.existing.rank)[0] as any

    // LOAD
    const rank_ref01_ent = client.Rank()
    const rank_ref01_match_dt0: any = {}
    const rank_ref01_data_dt0 = (await rank_ref01_ent.load(rank_ref01_match_dt0)).data()
    assert(null != rank_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/rank/RankTestData.json')

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
    ['rank01','rank02','rank03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'VEABIRD_BEACH_TEST_RANK_ENTID': idmap,
    'VEABIRD_BEACH_TEST_LIVE': 'FALSE',
    'VEABIRD_BEACH_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['VEABIRD_BEACH_TEST_RANK_ENTID']

  const live = 'TRUE' === env.VEABIRD_BEACH_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['VEABIRD_BEACH_TEST_RANK_ENTID']
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
  
