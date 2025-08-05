<?php

namespace frontend\controllers;

use common\models\Country;
use common\models\Region;
use common\models\Tour;
use frontend\models\searches\TourSearch;
use Yii;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use yii\helpers\ArrayHelper;
use yii\web\Controller;
use yii\web\NotFoundHttpException;

class DestinationsController extends Controller
{
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'except' => ['error'],
                'rules' => [
                    [
                        'actions' => ['region', 'country', 'view', 'index'],
                        'allow' => true,
                        'roles' => ['?', '@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::class,
                'actions' => [

                ],
            ],
        ];
    }

    public function actionRegion($regionSlug)
    {
        $region = Region::findOne(['slug' => $regionSlug]);
        if (!$region) {
            throw new NotFoundHttpException('Region not found');
        }

        $countryIds = ArrayHelper::getColumn($region->countries, 'id');

        $searchModel = new TourSearch();
        $dataProvider = $searchModel->searchByCountryId($countryIds, Yii::$app->request->queryParams);
        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
            'region' => $region
        ]);
    }

    public function actionCountry($regionSlug, $countrySlug)
    {
        $region = Region::findOne(['slug' => $regionSlug]);
        if (!$region) {
            throw new NotFoundHttpException('Region not found');
        }

        $country = Country::find()
            ->where(['slug' => $countrySlug, 'region_id' => $region->id])
            ->one();

        if (!$country) {
            throw new NotFoundHttpException('Country not found');
        }

        $searchModel = new TourSearch();
        $dataProvider = $searchModel->searchByCountryId($country->id, Yii::$app->request->queryParams);


        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
            'region' => $region
        ]);
    }

    public function actionView($id)
    {
        $model = $this->findTour($id);
        $path = Yii::getAlias('@frontend/web') . '/images/tour-images/'
            . $model->country->region->slug . '/' . $model->country->slug;

        if (is_dir($path)) {
            $files = array_filter(scandir($path), function($file) use ($path) {
                return is_file($path . DIRECTORY_SEPARATOR . $file);
            });
            $countPhoto = count($files);
        } else {
            $countPhoto = 0;
        }
        $recommendedTours = Tour::find()->where(['country_id' => $model->country_id])->limit(4)->all();
        return $this->render('view', ['model' => $model, 'recommendedTours' => $recommendedTours, 'countPhoto' => $countPhoto, 'path' => $path]);
    }

    public function actionIndex()
    {
        $searchModel = new TourSearch();
        $dataProvider = $searchModel->searchByName(Yii::$app->request->queryParams);
        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
            'region' => null
        ]);
    }

    protected function findTour($id)
    {
        if ($model = Tour::find()->where(['id' => $id])->one())
            return $model;

        throw new NotFoundHttpException(Yii::t('app', 'Requested page was not found'));
    }
}