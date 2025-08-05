<?php

return [
    'destinations/view/<id:\d+>' => 'destinations/view',
    'destinations/<regionSlug:[a-z0-9\-]+>' => 'destinations/region',
    'destinations/<regionSlug:[a-z0-9\-]+>/<countrySlug:[a-z0-9\-]+>' => 'destinations/country',
];
