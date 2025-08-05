<?php

namespace frontend\assets;

use yii\web\AssetBundle;

/**
 * Main frontend application asset bundle.
 */
class AppAsset extends AssetBundle
{
    public $jsOptions = [
        'async' => 'async',
    ];
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/live-chat.css',
        'css/output.0e53bfd77a37.css',
        'css/output.68af710f57d0.css',
        'css/output.85a3cd0a30d4.css',
        'css/swiper-bundle.min.css',
        'css/site.css'
    ];
    public $js = [
        'js/api_dynamic.js',
        'js/api_static.js',
        'js/esw.min.js',
        'js/esw.min_1.js',
        'js/gtm.js',
        'js/main-3f7d070e04fa8238fa90.js',
        'js/otSDKStub.js',
        'js/output.200e3076cbce.js',
        'js/output.b9ca106eeffd.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap5\BootstrapAsset',
        'yii\bootstrap5\BootstrapPluginAsset',
        'frontend\assets\SwiperAsset'
    ];
}
