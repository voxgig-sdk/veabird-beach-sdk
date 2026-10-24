# VeabirdBeach SDK utility: prepare_body
require_relative 'media'
module VeabirdBeachUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return VeabirdBeachUtilities.raw_body(ctx.reqdata) if VeabirdBeachUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
