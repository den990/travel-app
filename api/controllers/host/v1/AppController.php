<?php


namespace api\controllers\host\v1;


use Yii;
use yii\filters\Cors;
use yii\web\Controller;
use yii\web\UnauthorizedHttpException;

class AppController extends Controller
{
    public function behaviors()
    {
        $behaviors =  parent::behaviors();

        $behaviors[] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => ['*'],
            ],
        ];

        return $behaviors;
    }

    public function beforeAction($action)
    {
        $beforeAction = parent::beforeAction($action);
        if(!boolval($this->auth())){
            throw new UnauthorizedHttpException('APP Unauthorized');
        }
        return $beforeAction;
    }

    private function auth()
    {
        $header = $this->request->getHeaders()['Authorization'];
        $ip = $this->request->userIP;
        $key = explode('Bearer ', $header)[1];

        // TODO: сделать хранение ключей в базе данныех, поменять реализацию авторизации
        if(empty(Yii::$app->params['apiAccessKeys'][$key]))
            return false;
        if($ip != Yii::$app->params['apiAccessKeys'][$key])
            return false;

        return true;
    }
}