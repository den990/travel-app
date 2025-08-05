<?php

namespace frontend\controllers;

use yii\web\Controller;

class AboutUsController extends Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionWhyTravelWithCanadaway()
    {
        return $this->render('why-travel-with-canadaway');
    }

    public function actionResponsibleTravel()
    {
        return $this->render('responsible-travel');
    }

    public function actionLgbtqTravel()
    {
        return $this->render('lgbtq-travel');
    }
}