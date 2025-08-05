<?php

namespace frontend\controllers;

use common\components\AlertNotice;
use common\models\File;
use frontend\models\forms\S3FileUploadForm;
use frontend\models\forms\StorageFileUploadForm;
use frontend\models\searches\TourSearch;
use Yii;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\Controller;

/**
 * Site controller
 */
class SiteController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'except' => ['error'],
                'rules' => [
                    [
                        'actions' => ['index', 'file-upload', 's3-file-upload', 'file-delete', 'send-mail'],
                        'allow' => true,
                        'roles' => ['?', '@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::class,
                'actions' => [
                    'file-upload' => ['post'],
                    'send-mail' => ['post'],
                ],
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
                'layout' => 'blank'
            ],
        ];
    }

    public function actionIndex()
    {
        $searchModel = new TourSearch();
        return $this->render('index', ['searchModel' => $searchModel
        ]);
    }

    public function actionFileUpload()
    {
        $fileUploadForm = new StorageFileUploadForm();

        if($fileUploadForm->upload() !== null)
            AlertNotice::addSuccess();
        else
            AlertNotice::addError();

        return $this->redirect(['index']);
    }

    public function actionS3FileUpload()
    {
        $fileUploadForm = new S3FileUploadForm();

        if($fileUploadForm->load($this->request->post()) and $fileUploadForm->upload() !== null)
            AlertNotice::addSuccess();
        else
            AlertNotice::addError();

        return $this->redirect(['index']);
    }

    public function actionFileDelete($id)
    {
        $file = File::findOne(['id' => $id]);

        if($file and $file->delete())
            AlertNotice::addSuccess();
        else AlertNotice::addError();

        return $this->redirect($this->request->referrer);
    }

    public function actionSendMail()
    {
        $firstName = Yii::$app->request->post('first_name');
        $lastName = Yii::$app->request->post('last_name');
        $email = Yii::$app->request->post('email');
        $phone = Yii::$app->request->post('phone');
        $tourPrice = Yii::$app->request->post('tour_price');
        $tourName = Yii::$app->request->post('tour_name');
        if ($firstName && $lastName && $email && $phone && $tourPrice && $tourName)
        {
            if (Yii::$app->mailer->compose()
                ->setFrom('koldyrev03@gmail.com')
                ->setTo('koldyrev03@gmail.com')
                ->setSubject('Новая заявка с сайта')
                ->setHtmlBody("Заявка на тур 
                <p><strong>Имя:</strong> {$firstName}</p>
                <p><strong>Фамилия:</strong> {$lastName}</p>
                <p><strong>Email:</strong> {$email}</p>
                <p><strong>Телефон:</strong> {$phone}</p>
                <p><strong>Название тура:</strong> {$tourName}</p>
                <p><strong>Цена тура:</strong> {$tourPrice}</p>
            ")
                ->send())
                return true;
        }
        return false;
    }
}
