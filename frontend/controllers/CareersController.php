<?php

namespace frontend\controllers;

use yii\web\Controller;

class CareersController extends Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }
}