<?php

/* @var $this yii\web\View */
/* @var $name string */
/* @var $message string */
/* @var $exception Exception */

use yii\helpers\Html;

$this->title = Yii::t('yii', $name);
?>
<div class="site-error">

    <div class="row vh-90 align-items-center justify-content-center">
        <div class="col-5">
            <h1 class="text-secondary">
                <?= Yii::t('app', 'Error') ?>  <?= $exception->statusCode ?>
            </h1>

            <div class="card mt-3 border-2" style="border-color: #47268D">
                <div class="card-body">
                    <h1 class="display-6">
                        <?= Yii::t('yii', $message) ?>
                    </h1>
                </div>
            </div>

            <p class="mt-3">
                <?= Yii::t('app', 'The specified error occurred while executing the request.') ?>
            </p>
            <p>
                <?= Yii::t('app', 'Try going back to the previous page, reload it and perform the action again.') ?>
            </p>
            <p>
                <?= Yii::t('app', 'If the error persists, please contact the site administrator.') ?>
            </p>

            <div class="text-center mt-3">
                <?= Html::a(Yii::t('app','Go home'), \yii\helpers\Url::home(), [
                    'class' => 'btn btn-outline-primary bg-error', 'style' => 'background-color: #47268D'
                ]) ?>
            </div>
        </div>
    </div>

</div>
<style>
    .bg-error {
        background-color: #47268D;
        color: #47268D;
        background-image: unset;
    }
</style>
