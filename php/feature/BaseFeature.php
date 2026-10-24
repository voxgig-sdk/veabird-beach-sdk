<?php
declare(strict_types=1);

// VeabirdBeach SDK base feature

class VeabirdBeachBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(VeabirdBeachContext $ctx, array $options): void {}
    public function PostConstruct(VeabirdBeachContext $ctx): void {}
    public function PostConstructEntity(VeabirdBeachContext $ctx): void {}
    public function SetData(VeabirdBeachContext $ctx): void {}
    public function GetData(VeabirdBeachContext $ctx): void {}
    public function GetMatch(VeabirdBeachContext $ctx): void {}
    public function SetMatch(VeabirdBeachContext $ctx): void {}
    public function PrePoint(VeabirdBeachContext $ctx): void {}
    public function PreSpec(VeabirdBeachContext $ctx): void {}
    public function PreRequest(VeabirdBeachContext $ctx): void {}
    public function PreResponse(VeabirdBeachContext $ctx): void {}
    public function PreResult(VeabirdBeachContext $ctx): void {}
    public function PreDone(VeabirdBeachContext $ctx): void {}
    public function PreUnexpected(VeabirdBeachContext $ctx): void {}
}
