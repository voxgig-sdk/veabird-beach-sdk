# VeabirdBeach SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

VeabirdBeachUtility.registrar = ->(u) {
  u.clean = VeabirdBeachUtilities::Clean
  u.clean_add = VeabirdBeachUtilities::CleanAdd
  u.clean_explain = VeabirdBeachUtilities::CleanExplain
  u.done = VeabirdBeachUtilities::Done
  u.make_error = VeabirdBeachUtilities::MakeError
  u.feature_add = VeabirdBeachUtilities::FeatureAdd
  u.feature_hook = VeabirdBeachUtilities::FeatureHook
  u.feature_init = VeabirdBeachUtilities::FeatureInit
  u.fetcher = VeabirdBeachUtilities::Fetcher
  u.make_fetch_def = VeabirdBeachUtilities::MakeFetchDef
  u.make_context = VeabirdBeachUtilities::MakeContext
  u.make_options = VeabirdBeachUtilities::MakeOptions
  u.make_request = VeabirdBeachUtilities::MakeRequest
  u.make_response = VeabirdBeachUtilities::MakeResponse
  u.make_result = VeabirdBeachUtilities::MakeResult
  u.make_point = VeabirdBeachUtilities::MakePoint
  u.make_spec = VeabirdBeachUtilities::MakeSpec
  u.make_url = VeabirdBeachUtilities::MakeUrl
  u.param = VeabirdBeachUtilities::Param
  u.prepare_auth = VeabirdBeachUtilities::PrepareAuth
  u.prepare_body = VeabirdBeachUtilities::PrepareBody
  u.prepare_headers = VeabirdBeachUtilities::PrepareHeaders
  u.prepare_method = VeabirdBeachUtilities::PrepareMethod
  u.prepare_params = VeabirdBeachUtilities::PrepareParams
  u.prepare_path = VeabirdBeachUtilities::PreparePath
  u.prepare_query = VeabirdBeachUtilities::PrepareQuery
  u.graphql_body = VeabirdBeachUtilities::GraphqlBody
  u.graphql_errors = VeabirdBeachUtilities::GraphqlErrors
  u.result_basic = VeabirdBeachUtilities::ResultBasic
  u.result_body = VeabirdBeachUtilities::ResultBody
  u.result_headers = VeabirdBeachUtilities::ResultHeaders
  u.transform_request = VeabirdBeachUtilities::TransformRequest
  u.transform_response = VeabirdBeachUtilities::TransformResponse
}
