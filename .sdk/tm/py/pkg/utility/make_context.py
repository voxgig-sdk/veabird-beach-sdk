# VeabirdBeach SDK utility: make_context

from projectname_sdk.core.context import VeabirdBeachContext


def make_context_util(ctxmap, basectx):
    return VeabirdBeachContext(ctxmap, basectx)
