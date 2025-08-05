<?php
/* @var $this View */

/* @var $region \common\models\Region */
/* @var $dataProvider \yii\data\ActiveDataProvider */

/* @var $searchModel \frontend\models\searches\TourSearch */

use common\widgets\ActiveForm;
use common\widgets\ListView;
use yii\helpers\Html;
use yii\jui\DatePicker;
use yii\web\View;
$this->title = $region ? $region->name : 'Search Tour';
?>

<?php if ($region): ?>
<div class="mt-5 container canadatop mb-5"><h1><?= $region->name ?> Tours</h1>
    <h2>Even nicer than you think</h2>
    <script type="text/javascript" src="javascript/tp.widget.bootstrap.min.js"
            async=""></script>
    <div class="trustpilot-widget" data-locale="en-CA"
         data-template-id="577258fb31f02306e4e3aaf9"
         data-businessunit-id="501e93b700006400051925b6" data-style-height="24px"
         data-style-width="100%" data-theme="light"
         data-sku="NCCNG,NCCS,NCCV,NCPN,NCRU,NCUR,NCVC,NCVE,NCVP,NCVS,NCVU,NCVV,NCWL,NCWW"
         data-star-color="#513394" data-no-reviews="hide" data-scroll-to-list="true"
         data-style-alignment="left"></div><p
            class="schema-extraction--touristtrip--description">
        <?= $region->description ?>
    </p>
</div>
<?php endif; ?>

<div id="instantsearch-container">
    <h1 class="mb-5">Our tours</h1>
    <button class="btn btn-outline-primary d-md-none mb-5 ms-md-5 mx-3 col-4" type="button" id="show-mobile-filters">
        Filters
    </button>
    <div class="d-flex flex-md-row flex-column">
        <div class="col-md-3">
            <div class="search-panel__side">
                <?= Html::a('&times;', 'javascript:void(0)', ['id' => 'mobile-close-filters', 'class' => 'close-btn']) ?>

                <?php $form = ActiveForm::begin([
                    'method' => 'get'
                ]); ?>

                <div class="ais-Panel">
                    <div class="ais-Panel-header"><span>Tour start date</span></div>
                    <div class="ais-Panel-body">
                        <div class="form-group">
                            <?= $form->field($searchModel, 'start_date_min')->widget(DatePicker::class, [
                                'dateFormat' => 'yyyy-MM-dd',
                                'options' => [
                                    'class' => 'start-date-range--input-min form-control input',
                                    'placeholder' => 'Departing after...'
                                ],
                            ])->label(false) ?>
                            <?= Html::a('x', 'javascript:void(0)', ['class' => 'start-date-range--clear-min']) ?>
                        </div>

                        <div class="form-group">
                            <?= $form->field($searchModel, 'start_date_max')->widget(DatePicker::class, [
                                'dateFormat' => 'yyyy-MM-dd',
                                'options' => [
                                    'class' => 'start-date-range--input-max form-control input',
                                    'placeholder' => 'Departing before...'
                                ],
                            ])->label(false) ?>
                            <?= Html::a('x', 'javascript:void(0)', ['class' => 'start-date-range--clear-max']) ?>
                        </div>
                    </div>
                </div>

                <!-- Budget -->
                <div class="ais-Panel">
                    <div class="ais-Panel-header"><span>Budget</span></div>
                    <div class="ais-Panel-body">
                        <div id="price-slider" class="noUi-wrapper"></div>

                        <?= $form->field($searchModel, 'price_min', ['options' => ['tag' => false]])
                            ->hiddenInput(['id' => 'price-min'])->label(false) ?>

                        <?= $form->field($searchModel, 'price_max', ['options' => ['tag' => false]])
                            ->hiddenInput(['id' => 'price-max'])->label(false) ?>
                    </div>
                </div>

                <!-- Duration -->
                <div class="ais-Panel">
                    <div class="ais-Panel-header"><span>Duration</span></div>
                    <div class="ais-Panel-body">
                        <div id="duration-slider" class="noUi-wrapper"></div>

                        <?= $form->field($searchModel, 'duration_min', ['options' => ['tag' => false]])
                            ->hiddenInput(['id' => 'duration-min'])->label(false) ?>

                        <?= $form->field($searchModel, 'duration_max', ['options' => ['tag' => false]])
                            ->hiddenInput(['id' => 'duration-max'])->label(false) ?>
                    </div>
                </div>


                <div class="form-group">
                    <?= Html::submitButton('Search', ['id' => 'toggle-more-filters', 'class' => 'text-white']) ?>
                </div>

                <?php ActiveForm::end(); ?>
            </div>
        </div>
        <div class="col-md-9 ps-md-5 col-12 px-3 pe-md-0">
            <?= ListView::widget([
                'dataProvider' => $dataProvider,
                'layout' => '<div class="row row-cols-1 row-cols-lg-4 g-3 ">{items}</div>{pager}',
                'itemView' => '_item',
                'itemOptions' => ['tag' => false],
                'emptyText' => '<h3 class="text-center col-12 my-5">Nothing found</h3>',
                'pager' => [
                    'options' => ['class' => 'pagination justify-content-center mt-4 d-flex col-12 my-4'],
                    'pageCssClass' => 'page-item',
                    'linkOptions' => ['class' => 'page-link'],
                    'disabledPageCssClass' => 'disabled',
                    'activePageCssClass' => 'active',
                    'disabledListItemSubTagOptions' => ['tag' => 'span', 'class' => 'page-link'],
                ],

            ]) ?>
        </div>
    </div>
</div>
<style>
    .pagination .page-item.active .page-link {
        background-color: #47268D;
        border-color: #47268D;
        color: #fff;
    }

    .noUi-target {
        background: #e0e0e0;
        height: 2px;
        border-radius: 2px;
        margin: 20px 0;
        position: relative;
    }

    /* Активный прогресс */
    .noUi-connect {
        background-color: #47268D;
        height: 2px;
        top: 0;
    }

    /* Кружочки (ползунки) */
    .noUi-handle {
        background: #47268D !important;
        width: 22px !important;
        height: 22px !important;
        top: -10px !important;
        border: none !important;
        border-radius: 50% !important;
        margin-left: -11px !important; /* Это важно — выравнивание */
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        position: absolute;
        cursor: pointer;
        display: block;
        z-index: 5;
    }

    /* Убираем стандартные псевдоэлементы, которые могут ломать отображение */
    .noUi-handle::before,
    .noUi-handle::after {
        display: none !important;
        content: none !important;
    }

    /* Подсказки (tooltip) */
    .noUi-tooltip {
        background: #47268D;
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        padding: 4px 6px;
        white-space: nowrap;
    }

    .noUi-wrapper {
        width: 100%;
        padding: 0 5px;
    }

</style>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const priceMinInput = document.getElementById('price-min');
        const priceMaxInput = document.getElementById('price-max');
        const priceSlider = document.getElementById('price-slider');

        if (priceSlider && typeof noUiSlider !== 'undefined') {
            const priceMinStart = parseInt(priceMinInput.value) || 779;
            const priceMaxStart = parseInt(priceMaxInput.value) || 5999;

            noUiSlider.create(priceSlider, {
                start: [priceMinStart, priceMaxStart],
                connect: true,
                tooltips: [true, true],
                step: 1,
                range: {
                    'min': 0,
                    'max': 100000
                },
                format: {
                    to: value => Math.round(value) + '€',
                    from: value => Number(value.replace('€', ''))
                }
            });

            priceSlider.noUiSlider.on('update', (values) => {
                priceMinInput.value = parseInt(values[0]);
                priceMaxInput.value = parseInt(values[1]);
            });
        }

        const durationMinInput = document.getElementById('duration-min');
        const durationMaxInput = document.getElementById('duration-max');
        const durationSlider = document.getElementById('duration-slider');

        if (durationSlider && typeof noUiSlider !== 'undefined') {
            const durationMinStart = parseInt(durationMinInput.value) || 3;
            const durationMaxStart = parseInt(durationMaxInput.value) || 60;

            noUiSlider.create(durationSlider, {
                start: [durationMinStart, durationMaxStart],
                connect: true,
                tooltips: [true, true],
                step: 1,
                range: {
                    'min': 3,
                    'max': 60
                },
                format: {
                    to: value => Math.round(value) + 'd',
                    from: value => Number(value.replace('d', ''))
                }
            });

            durationSlider.noUiSlider.on('update', (values) => {
                durationMinInput.value = parseInt(values[0]);
                durationMaxInput.value = parseInt(values[1]);
            });
        }

        const showMobileFilters = document.getElementById('show-mobile-filters');
        showMobileFilters.addEventListener('click', function (e) {
            e.preventDefault();
            const panel = document.querySelector('.search-panel__side');

            if (panel.classList.contains('active')) {
                panel.classList.remove('active');
                panel.style.opacity = 0;
                panel.style.zIndex = -1;
            } else {
                panel.classList.add('active');
                panel.style.opacity = 1;
                panel.style.zIndex = 1;
            }
        });

        const mobileCloseFilters = document.getElementById('mobile-close-filters');
        mobileCloseFilters.addEventListener('click', function (e) {
            e.preventDefault();
            const panel = document.querySelector('.search-panel__side');
            panel.classList.remove('active');
            panel.style.opacity = 0;
            panel.style.zIndex = -1;
        });
    });
</script>


