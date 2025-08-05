<?php


namespace api\controllers\host\v1;


use api\components\ApiResponse;
use api\models\host\v1\SiteIndex;
use yii\filters\VerbFilter;

class SiteController extends AppController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['verbs'] = [
            'class' => VerbFilter::class,
            'actions' => [
                'index'  => ['post'],
            ],
        ];
        return $behaviors;
    }

    public function actionIndex()
    {
        $model = new SiteIndex();

        if($model->load($this->request->post()) and $model->execute())
            return ApiResponse::success($model->result);

        return ApiResponse::error(null, null, $model->errors);
    }
}