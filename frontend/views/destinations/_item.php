<?php
/* @var $this \yii\web\View */

/* @var $model \common\models\Tour */

use yii\helpers\Html;

?>

<div class="ais-Hits-item">
    <div id="NUKD" class="hit"
         data-insights-position="1" data-insights-query-id="df72665f1dd4673559f1133335c994c1" data-is-on-sale="true"
         data-itinerary-variation-id="9293" data-tour-dossier-id="24497">

        <?= Html::a(' <img class="img-fluid" src="/images/tour/' . $model->logo_img . '"></img>', ['view', 'id' => $model->id]) ?>

        <div class="trip-content">
            <div class="trip-content-top">
                <div class="travel-style">
                    <?= $model->travel_style ?>
                </div>
                <h2 class="name"><?= $model->name ?></h2>
                <div class="duration-destinations"><span class="duration"><?= $model->duration ?> days</span> in <span
                            class="destinations"><?= $model->country->name ?></span></div>
            </div>
            <div class="trip-content-bottom">
                <div class="extra-content">
                    <dl>
                        <dt>Physical Grading</dt>
                        <dd><?= $model->physical_rating ?></dd>
                        <dt>Tour Type</dt>
                        <dd><?= $model->trip_type ?></dd>
                    </dl>
                </div>
                <div class="pricing">
                    <p class="advertised-price"><span class="previous-price"><span
                                    class="amount"><?= Yii::$app->formatter->asInteger($model->price + 200) . ' €' ?></span></span>
                        <span class="current-price"><span class="from-amount">from</span> <span
                                    class="amount"><?= Yii::$app->formatter->asInteger($model->price) . ' €' ?></span></span>
                        <span class="advertised-date">on <span
                                    class="date"><?= Yii::$app->formatter->asDate($model->start_date) ?></span></span>
                    </p>
                </div>
                <?= Html::a('View tour', ['/destinations/view', 'id' => $model->id], ['class' => 'search-btn'])?>
            </div>
        </div>
    </div>
</div>