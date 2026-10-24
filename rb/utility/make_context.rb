# VeabirdBeach SDK utility: make_context
require_relative '../core/context'
module VeabirdBeachUtilities
  MakeContext = ->(ctxmap, basectx) {
    VeabirdBeachContext.new(ctxmap, basectx)
  }
end
