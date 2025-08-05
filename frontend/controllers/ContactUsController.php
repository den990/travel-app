<?php

namespace frontend\controllers;

use yii\web\Controller;

class ContactUsController extends Controller
{

    public function actionIndex()
    {
        return $this->render('index');
    }

}