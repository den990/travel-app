<?php

namespace frontend\controllers;

use yii\web\Controller;

class WorkController extends Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }

}