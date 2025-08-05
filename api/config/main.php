<?php

$params = array_merge(
    $params,
    require __DIR__ . '/params.php',
    require __DIR__ . '/params-local.php'
);

return [
    'id' => 'app-api',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'api\controllers',
    'modules' => [],
    'components' => [
        'request' => [
            'baseUrl' => '/api',
            'enableCsrfCookie' => false,
            'enableCsrfValidation' => false,
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ]
        ],
        'response' => [
            'class' => 'yii\web\Response',
            'format' => yii\web\Response::FORMAT_JSON,
            'charset' => 'UTF-8',
            'on beforeSend' => function ($event) {
                $response = $event->sender;
                if (!$response->isSuccessful) {
                    $response->data = api\components\ApiResponse::error(
                        $response->data["code"],
                        strtoupper($response->data["name"]),
                        $response->data["message"],
                        $response->statusCode
                    );
                }
            },
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
            ],
        ],
        'errorHandler' => [
            'errorAction' => '/site/error',
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\DbTarget',
                    'logTable' => 'api_log',
                    'logVars' => [],
                    'levels' => ['error', 'warning'],
                    'categories' => ['yii\*'],
                ],
                [
                    'class' => 'yii\log\DbTarget',
                    'logTable' => 'api_log',
                    'logVars' => [],
                    'levels' => ['info', 'error', 'warning'],
                    'except' => ['yii\*'],
                ],
            ],
        ],
    ],
    'params' => $params,
];
