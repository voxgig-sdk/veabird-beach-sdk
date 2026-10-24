# VeabirdBeach SDK feature factory

from veabirdbeach_sdk.feature.base_feature import VeabirdBeachBaseFeature
from veabirdbeach_sdk.feature.ratelimit_feature import VeabirdBeachRatelimitFeature
from veabirdbeach_sdk.feature.retry_feature import VeabirdBeachRetryFeature
from veabirdbeach_sdk.feature.test_feature import VeabirdBeachTestFeature
from veabirdbeach_sdk.feature.timeout_feature import VeabirdBeachTimeoutFeature


_FEATURES = {
    "base": lambda: VeabirdBeachBaseFeature(),
    "ratelimit": lambda: VeabirdBeachRatelimitFeature(),
    "retry": lambda: VeabirdBeachRetryFeature(),
    "test": lambda: VeabirdBeachTestFeature(),
    "timeout": lambda: VeabirdBeachTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
