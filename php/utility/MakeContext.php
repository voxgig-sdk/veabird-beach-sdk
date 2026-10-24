<?php
declare(strict_types=1);

// VeabirdBeach SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class VeabirdBeachMakeContext
{
    public static function call(array $ctxmap, ?VeabirdBeachContext $basectx): VeabirdBeachContext
    {
        return new VeabirdBeachContext($ctxmap, $basectx);
    }
}
