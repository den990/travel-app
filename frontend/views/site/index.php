<?php
/* @var $this yii\web\View */
/* @var $storageFileUploadForm \frontend\models\forms\StorageFileUploadForm */
/* @var $s3FileUploadForm \frontend\models\forms\StorageFileUploadForm */
/* @var $localFiles \common\models\File[] */

/* @var $s3Files \common\models\File[] */

use common\widgets\ActiveForm;
use yii\helpers\Html;

$this->title = 'Home';


?>
<div id="content">


    <div class="page-position section-navigation clearfix" data-position="section-navigation">

    </div>


    <div id="content-head">


        <div class="page-position content-top clearfix" data-position="content-top">


            <section class="groupedcontent None" id="homepage-refactored-hero-group">
                <div class="bg-image-and-search">
                    <div class="groupedcontent None" id="homepage-refactoring-search-carousel">
                        <div class="">
                            <div id="carousel15094" class="carousel slide" data-interval="10000">
                                <div class="carousel-inner">
                                    <div class="active item">
                                        <div class="leadercontent None clearfix" id="leadercontent-16322">
                                            <div class="image"><img
                                                        src="/images/837e817fce08bfa8f2a81a46f03e7f58.webp"
                                                        class="responsive" alt=""
                                                        data-src-small="/images/2c6e982abab2b383e1c438e75813ecd9.webp"
                                                        data-src-medium="/images/1d181dae964eeeb2e16850bb6e75623f.webp"
                                                        data-src-xlarge="/images/f8d7d18af399008b2b5c868ca7053c75.webp"
                                                        data-src-large="/images/837e817fce08bfa8f2a81a46f03e7f58.webp"
                                                        style="visibility: visible;"></div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="leadercontent None clearfix" id="leadercontent-16324">
                                            <div class="image"><img
                                                        src="/images/09e6511fecd31c4738c820f0191d9e70.webp"
                                                        class="responsive" alt=""
                                                        data-src-small="/images/5cb80c86e7683a5ae3dbd3f89961b221.webp"
                                                        data-src-medium="/images/e878446b52591742b0d0b1b0093720fb.webp"
                                                        data-src-xlarge="/images/177830406fd870c9913900972b662ca8.webp"
                                                        data-src-large="/images/09e6511fecd31c4738c820f0191d9e70.webp"
                                                        style="visibility: visible;"></div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="leadercontent None clearfix" id="leadercontent-16323">
                                            <div class="image"><img
                                                        src="/images/360f41ee144a327715e189d3973970ab.webp"
                                                        class="responsive" alt=""
                                                        data-src-small="/images/d6b9a363487becf2ece0f553f19fbc13.webp"
                                                        data-src-medium="/images84572ad63c0f290d090531730b0cb44e.webp"
                                                        data-src-xlarge="/images/c411515b01b8c226aca42c7219c1020a.webp"
                                                        data-src-large="/images/360f41ee144a327715e189d3973970ab.webp"
                                                        style="visibility: visible;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="groupedcontent container hero-search" id="homepage-refactored-h1-header-trip-finder">
                        <div class="search-items">
                            <div class="leadercontent brand clearfix" id="leadercontent-15099">
                                <div class="text"><h1>Bring on the world with small&nbsp;group travel.</h1></div>
                            </div>
                            <?php $form = ActiveForm::begin([
                                'method' => 'get',
                                'action' => ['/destinations'],
                                'options' => ['class' => 'hypersearchform search-container'],
                            ]); ?>

                            <fieldset>
                                <legend><h3></h3></legend>
                                <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span>

                                <?= Html::activeTextInput($searchModel, 'name', [
                                    'maxlength' => 128,
                                    'class' => 'hypersearch ui-autocomplete-input',
                                    'placeholder' => "Where's your next adventure?",
                                    'ceid' => 'Navigation Search',
                                ]) ?>

                                <?= Html::hiddenInput('ref', 'navsearch') ?>

                                <button type="submit" class="btn">Search</button>
                            </fieldset>

                            <a href="/search/" class="advanced-search">
                                <span class="icon-search icon-white"></span> View all tours
                            </a>

                            <?php ActiveForm::end(); ?>


                        </div>
                    </div>
                </div>
            </section>


        </div>


    </div>


    <div class="page-position subsection-navigation clearfix" data-position="subsection-navigation">

    </div>


    <div class="page-position content-main clearfix" data-position="content-main">

        <div class="leadercontent None clearfix" id="leadercontent-16343">
            <div class="text">
                <div class="container">
                    <div class="canadawlogo"><img
                                src="/images/1dd602165aace__ga-25-02-049-gl-_project_maple_flavour_scalled-down_purple.png"
                                style="" class="CAcontent ">
                        <div><h3 class="canadah3 CAcontent">Canada: even nicer than you think</h3>
                            <p class="canadap CAcontent">Home has never looked so good. From snowshoeing wintry fjords
                                to spotting breaching whales, rediscover your own backyard with the folks who know it
                                best. </p></div>
                    </div>
                    <h3 class="canadah3 OUTSIDE">Canada: the nicest place on Earth</h3>
                    <p class="canadap OUTSIDE">Everyone knows Canadians are really nice — but the niceness doesn’t stop
                        there. From wild landscapes and rugged coastlines, to culture-packed cities, discover just how
                        far this niceness goes.
                    </p></div>
                <div class="fivetripscontainer">
                    <div class="panel"><img src="/images/canadaday1.webp" alt="Northern Lights">
                        <div class="canadacardcontent"><h3>Snowshoe along jaw-dropping fjords</h3>
                            <div class="tripinfo">
                                <div class="badge">NEW</div>
                                <h2>Northern Quebec: Winter Lodge Escape</h2><a class=""
                                                                                href="<?= \yii\helpers\Url::to(['/destinations/north-america'])?>">
                                    <div class="destbtn">View tour</div>
                                </a></div>
                        </div>
                    </div>
                    <div class="panel"><img src="/images/canadaday2.webp" alt="Winter Cabin">
                        <div class="canadacardcontent"><h3>Stroll the ocean floor at Hopewell Rocks</h3>
                            <div class="tripinfo">
                                <div class="badge">NEW</div>
                                <h2>Coastal Treasures of the Canadian Maritimes</h2><a class=""
                                                                                       href="<?= \yii\helpers\Url::to(['/destinations/central-america'])?>">
                                    <div class="destbtn">View tour</div>
                                </a></div>
                        </div>
                    </div>
                    <div class="panel"><img src="/images/canadaday3.webp" alt="Coastal View">
                        <div class="canadacardcontent"><h3>Step into the heart of Métis culture</h3>
                            <div class="tripinfo">
                                <div class="badge">NEW</div>
                                <h2>Canadian Rockies: Northern Lights Winter Explorer</h2><a class=""
                                                                                             href="<?= \yii\helpers\Url::to(['/destinations/europe/iceland'])?>">
                                    <div class="destbtn">View tour</div>
                                </a></div>
                        </div>
                    </div>
                    <div class="panel"><img src="/images/canadaday4.webp" alt="Mountain Road">
                        <div class="canadacardcontent"><h3>Witness the magic of breaching whales</h3>
                            <div class="tripinfo">
                                <div class="badge">NEW</div>
                                <h2>Across the North Atlantic: Iceland, Greenland &amp; Labrador</h2><a class=""
                                                                                                        href="<?= \yii\helpers\Url::to(['/destinations/europe'])?>">
                                    <div class="destbtn">View tour</div>
                                </a></div>
                        </div>
                    </div>
                    <div class="panel"><img src="/images/canadaday5.webp" alt="Iceberg">
                        <div class="canadacardcontent"><h3>Dine on seafood straight from the ocean</h3>
                            <div class="tripinfo">
                                <div class="badge">NEW</div>
                                <h2>Newfoundland Adventure: From Deer Lake to Saint Johns</h2><a class=""
                                                                                                 href="<?= \yii\helpers\Url::to(['/destinations/central-america/mexico'])?>">
                                    <div class="destbtn">View tour</div>
                                </a></div>
                        </div>
                    </div>
                </div>
                <style>
                    .CAcontent {
                        display: none;
                    }

                    .localization-canada .CAcontent {
                        display: block;
                    }

                    .localization-canada .OUTSIDE {
                        display: none;
                    }

                    #leadercontent-16343 {
                        padding-top: 80px;
                    }

                    .canadawlogo {
                        display: grid;
                        grid-template-columns: 100px auto;
                        grid-gap: 24px
                    }

                    .canadatop {
                        margin: 40px auto 80px auto;
                    }

                    .canadatop h1 {
                        font-size: 20px;
                        line-height: 28px;
                        margin: 0;
                        text-transform: none;
                        text-align: left;
                    }

                    .canadatop h2 {
                        font-size: 48px;
                        line-height: 56px;
                        margin: 8px 0 24px 0;
                        width: 80%;
                    }

                    .canadatop p {
                        width: 80%;
                        font-size: 16px;
                        line-height: 24px;
                        color: #242239;
                        font-family: DM Sans;
                        margin-top: 24px;
                    }

                    .canadah3 {
                        font-size: 32px;
                        line-height: 40px;
                        margin: 0
                    }

                    .canadap {
                        font-size: 16px;
                        line-height: 24px;
                        color: #242239;
                        font-family: DM Sans;
                        margin: 16px 0 40px 0;
                        width: 80%;
                    }

                    .fivetripscontainer {
                        display: flex;
                        width: 100%;
                        height: 640px;
                        margin-bottom: -8px;
                    }

                    .panel {
                        position: relative;
                        flex: 1;
                        overflow: hidden;
                        transition: flex 0.5s ease;
                    }

                    .panel img {
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                        object-position: center;
                    }

                    .panel:hover {
                        flex: 3;
                    }

                    .panel:not(:hover) {
                        flex: 1;
                    }

                    .badge {
                        background-color: #fceeee;
                        color: #d0021b;
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-weight: bold;
                        font-size: 12px;
                        line-height: 16px;
                        z-index: 2;
                        text-shadow: none !important;
                        text-align: center;
                        text-align: -webkit-center;
                    }

                    .canadacardcontent {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        padding: 16px 16px 32px 16px;
                        color: white;
                        transform: translateY(0);
                        transition: transform 0.3s ease;
                        text-align: center;
                        text-align: -webkit-center;
                        max-width: 240px;
                        margin: 0 auto;
                    }

                    .panel:hover .canadacardcontent {
                        transform: translateY(0);
                    }

                    .canadacardcontent h3 {
                        color: #ffffff;
                        font-size: 24px;
                        line-height: 32px;
                        position: absolute;
                        top: -64%;
                        padding-right: 16px;
                    }

                    .canadacardcontent .tripinfo {
                        height: 192px;
                        align-content: end;
                    }

                    .canadacardcontent h2 {
                        font-size: 16px !important;
                        line-height: 24px !important;
                        text-align: center;
                        color: #ffffff !important;
                        margin: 8px 0 24px 0 !important;
                    }

                    .canadacardcontent .destbtn {
                        width: -webkit-fit-content;
                        width: -moz-fit-content;
                        width: fit-content;
                        padding: 8px 16px;
                        border-radius: 8px;
                        font-weight: 700;
                        font-size: 14px;
                        line-height: 24px;
                        letter-spacing: 0.5px;
                        color: #fff;
                        background: #513394 !important;
                        margin-top: 24px;
                        text-align: center;
                        text-align: -webkit-center;
                    }

                    .canadacardcontent .destbtn:hover {
                        -webkit-transition: .2s ease-out;
                        -o-transition: .2s ease-out;
                        transition: .2s ease-out;
                        box-shadow: rgb(36 34 57 / 22%) 0px 0.125rem 1.5rem;
                        text-decoration: none !important;
                    }

                    @media (min-width: 1499px) {
                    }

                    @media (max-width: 1199px) {
                    }

                    @media (max-width: 979px) {
                        .canadacardcontent h3 {
                            position: unset;
                        }
                    }

                    @media (max-width: 768px) {
                        #leadercontent-16343 {
                            padding-top: 40px;
                        }

                        .canadawlogo {
                            display: inherit;
                        }

                        .canadawlogo img {
                            width: 128px;
                            padding: 0 20px 20px 20px;
                        }

                        .fivetripscontainer {
                            position: relative;
                            list-style-type: none;
                            list-style: none;
                            display: flex;
                            overflow-x: auto !important;
                            overflow-y: hidden !important;
                            scroll-behavior: smooth;
                            -webkit-overflow-scrolling: touch;
                            /*margin: 0 0 40px 0;*/
                        }

                        /* Custom scrollbar styling */
                        .fivetripscontainer::-webkit-scrollbar {
                            height: 8px;
                        }

                        .fivetripscontainer::-webkit-scrollbar-track {
                            background: #f1f1f1;
                            border-radius: 4px;
                        }

                        .fivetripscontainer::-webkit-scrollbar-thumb {
                            background: #513394;
                            border-radius: 4px;
                        }

                        .fivetripscontainer::-webkit-scrollbar-thumb:hover {
                            background: #3d2470;
                        }

                        /* Firefox scrollbar styling */
                        .fivetripscontainer {
                            scrollbar-width: thin;
                            scrollbar-color: #513394 #f1f1f1;
                        }

                        .canadatop {
                            margin: 40px auto 56px auto;
                        }

                        .canadatop h1 {
                            padding: 0 20px;
                            text-align: left;
                        }

                        .canadatop h2 {
                            font-size: 32px;
                            line-height: 40px;
                            text-align: left;
                            padding: 0 20px;
                        }

                        .trustpilot-widget {
                            padding: 0 20px;
                        }

                        .canadatop p {
                            width: unset;
                            padding: 0 20px;
                        }

                        .canadah3 {
                            font-size: 24px;
                            line-height: 32px;
                            width: unset;
                            padding: 0 20px;
                        }

                        .canadap {
                            padding: 0 20px;
                        }

                        /* Panel sizing for mobile - make second card peek */
                        .panel {
                            flex: none;
                            width: 85vw;
                            min-width: 85vw;
                            transition: none !important;
                        }

                        .panel:last-child {
                        }

                        .panel:hover {
                            flex: none !important;
                            width: 85vw !important;
                        }

                        .panel:not(:hover) {
                            flex: none !important;
                            width: 85vw !important;
                        }

                        .canadacardcontent {
                            max-width: unset;
                            padding: 16px 16px 16px 16px;
                            /*position: unset;*/
                            transition: none !important;
                        }

                        .canadacardcontent h3 {
                            top: -40px;
                        }

                        .canadacardcontent .tripinfo {
                            height: 156px;
                        }

                        .panel:hover .canadacardcontent {
                            transform: unset;
                        }

                        .canadacardcontent .destbtn:hover {
                            transition: none !important;
                            box-shadow: none !important;
                        }
                    }

                    @media (max-width: 480px) {
                        .panel {
                            width: 85vw;
                            min-width: 85vw;
                        }

                        .panel:hover {
                            width: 85vw !important;
                        }

                        .panel:not(:hover) {
                            width: 85vw !important;
                        }

                        .fivetripscontainer {
                            height: 420px;
                        }
                    }

                </style>
                <script>
                    document.addEventListener("DOMContentLoaded", () => {
                        const panels = document.querySelectorAll(".panel")

                        // Add click functionality for mobile devices
                        panels.forEach((panel) => {
                            panel.addEventListener("click", () => {
                                // Remove active class from all panels
                                panels.forEach((p) => p.classList.remove("active"))

                                // Add active class to clicked panel
                                panel.classList.add("active")
                            })
                        })
                    })
                </script>
            </div>
        </div>


        <div class="leadercontent container clearfix" id="leadercontent-16325">
            <div class="text">

                <style>

                    .polar2placesin .bigp {
                        font-size: 18px;
                        line-height: 30px;
                        color: #242239;
                        font-family: 'DM Sans';
                        width: 80%
                    }

                    .destbtn {
                        width: -webkit-fit-content;
                        width: -moz-fit-content;
                        width: fit-content;
                        padding: 12px 24px;
                        border-radius: 1rem;
                        font-weight: 700;
                        font-size: 16px;
                        line-height: 1.5;
                        letter-spacing: 0.5px;
                        color: #fff;
                        background: #513394 !important;
                        margin-top: 24px;
                    }

                    .destbtn:hover {
                        -webkit-transition: .2s ease-out;
                        -o-transition: .2s ease-out;
                        transition: .2s ease-out;
                        box-shadow: rgb(36 34 57 / 22%) 0px 0.125rem 1.5rem;
                    }

                    .destbtnwhite {
                        color: #513394;
                        background: #ffffff !important;
                    }


                    .polar2placesout {
                        background-image: url(/images/polarLP2destbg.jpg);
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: cover;
                    }

                    .polar2placesin {
                        margin: 80px 0;
                        display: grid;
                        grid-template-columns: auto;
                        grid-gap: 40px;
                    }

                    .polar2placesin h2 {
                        margin: 0 0 16px 0
                    }

                    .polar2places {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        grid-gap: 24px;
                    }

                    .polarplace {
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center;
                        border-radius: 16px;
                        padding: 240px 32px 32px 32px;
                        align-content: end;
                    }

                    .polarplace1 {
                        background-image: url(/images/polardest1.webp);
                    }

                    .polarplace2 {
                        background-image: url(/images/polardest2.webp);
                    }

                    .polarplace3 {
                        background-image: url(/images/polarsubscribebg-2.webp);
                    }

                    .polarplace h3, .polarplace p {
                        color: #ffffff !important;
                    }

                    .polar2places h3 {
                        font-size: 32px;
                        line-height: 40px
                    }

                    .polarplace p {
                        font-size: 16px;
                        line-height: 24px;
                    }

                    @media (min-width: 1499px) {
                        .polar2placesin {
                            max-width: 1200px;
                            margin: 80px auto
                        }
                    }

                    @media (max-width: 1199px) {

                    }

                    @media (max-width: 979px) {
                        .polar2placesin {
                            grid-template-columns: auto;
                            grid-gap: 24px;
                            padding: 24px 24px;
                            margin-bottom: 0;
                        }
                    }

                    @media (max-width: 767px) {
                        .polar2placesin .bigp {
                            width: unset
                        }

                        .polar2placesout {
                            background-image: none;
                        }

                        .polar2placesin {
                            padding: 0px 15px 80px 15px;
                            grid-template-columns: auto;
                            grid-gap: 16px;
                        }

                        .polar2places {
                            grid-template-columns: auto;
                            grid-gap: 16px;
                        }

                        .polarplace {
                            padding: 160px 24px 24px 24px;
                        }

                        .polar2placesin h2 {
                            font-size: 32px;
                            line-height: 40px;
                            padding: 0
                        }

                        .polar2places h3 {
                            font-size: 24px;
                            line-height: 32px;
                            padding: 0
                        }
                    }


                </style>
            </div>
        </div>


        <div class="leadercontent None clearfix" id="leadercontent-16246">
            <div class="text">
                <div id="dy_Rail_homepage_banner">
                    <div class="dy_unit dy_smart_object_2904714 dyother dyMonitor"
                         data-adid="smart_object_2904714||2113|||" data-dy-exp-id="2125669" data-dy-var-id="29897527"
                         data-dy-ver-data="14620559::0:1751387942795:2960:73286:1:0:0:0.424908506218344"
                         data-dy-att-method="2" data-dy-att-seq="73286"></div>
                </div>
                <style>
                    #dy_Rail_homepage_banner {
                        margin-top: 0px
                    }

                    .railhpwithtripout {
                        margin-top: 0px
                    }

                    .railhpleft h2, .railhpcontent h2 {
                        color: #ffffff !important
                    }

                    .dy-widget-tile-item-20392462:nth-child(1) {
                        margin: 0 8px 20px 4px !important;
                    }

                    @media (min-width: 1280px) {
                        .dy-widget-tile-item-20392462 {
                            max-width: 45%;
                            flex: 0 0 45%;
                        }
                    }

                    @media (max-width: 640px) {

                        #dy_Rail_homepage_banner {
                            margin-top: 80px
                        }

                        .railhpwithtripout {
                            margin-top: -80px;
                        }

                        .dy-widget-tile-item-20392462:nth-child(1) {
                            margin: 0 8px 20px 4px !important;
                        }

                        .dy-widget-tile-item-20392462 {
                            max-width: 90%;
                            -webkit-box-flex: 0;
                            -ms-flex: 0 0 90%;
                            flex: 0 0 90%;
                        }

                        /*.railhpleft h2, .railhpcontent h2 {color:#242239!important}*/

                    }
                </style>
            </div>
        </div>


        <div class="leadercontent None clearfix" id="leadercontent-15106">
            <div class="text">
                <section class="why-g-block">
                    <div class="content-container container">
                        <div class="why-g-intro"><h2>Why travel with CanadaWay?</h2>
                            <p>As the leader in small group adventure travel for 30+ years, we've redefined the way
                                travellers see the world. Check out how we’re creating the future of travel.</p>
                            <div class="button ghost"><a href="/about-us/why-travel-with-canadaway/" class="">Learn
                                    more</a></div>
                        </div>
                        <div class="reasons-items-block">
                            <div class="reason-item">
                                <div class="card-header"><img src="/images/whygblock1.png" alt="Small groups" width="60"
                                                              height="60" loading="lazy"><h6>Small groups</h6></div>
                                <p>Join a small group of like-minded travellers that, like you, are eager to safely and
                                    confidently experience all the things that make our world worth exploring. </p>
                            </div>
                            <div class="reason-item">
                                <div class="card-header"><img src="/images/whyblock22024.png" alt="Guaranteed departures"
                                                              width="60" height="60" loading="lazy"><h6>100% guaranteed
                                        departures</h6></div>
                                <p>Pack those bags and don't break a sweat because we guarantee every single one of our
                                    departures. As long as it's safe, you're going!</p></div>
                            <div class="reason-item">
                                <div class="card-header"><img src="/images/whygblock3.png" alt="Locally based guides"
                                                              width="60" height="60" loading="lazy"><h6>Locally based
                                        guides</h6></div>
                                <p>At CanadaWay, we don’t have tour guides — we have Chief Experience Officers. And
                                    they are all locally based, meaning they know the area you’re exploring like the
                                    back of their well-travelled hand. </p></div>
                            <div class="reason-item">
                                <div class="card-header"><img src="/images/whygblock4.png"
                                                              alt="Built to support local communities" width="60"
                                                              height="60" loading="lazy"><h6>Built to support local
                                        communities</h6></div>
                                <p>We have always created our tours by building meaningful relationships with local
                                    communities, directly benefiting the people and places we visit.</p></div>
                            <div class="reason-item">
                                <div class="card-header"><img src="/images/whygblock5.png" alt="Flexibility, freedom, fun"
                                                              width="60" height="60" loading="lazy"><h6>Flexibility,
                                        freedom, fun</h6></div>
                                <p>No matter the Travel Style, our tours balance well-planned itineraries with the
                                    flexibility to do your own thing and make the experience your own. </p></div>
                            <div class="reason-item ">
                                <div class="card-header"><img src="/images/whygblock6.png" alt="G for Good" width="60"
                                                              height="60" loading="lazy"><h6>G for Good</h6></div>
                                <p>When you travel with us, you experience first-hand our commitment to making travel a
                                    force for good is in everything we do. </p></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>


    </div>


    <div class="page-position content-bottom clearfix" data-position="content-bottom">

    </div>


</div>
<style>
    .ui-autocomplete li:has(a[data-insights-object-id="26507"]),
    .ui-autocomplete li:has(a[data-insights-object-id="26505"]) {
        display: none !important;
    }

    .recently-viewed {    padding: 40px 0 64px 20px!important;}
    /*------ for admin  -----*/

    #homepage-refactored-hero-group .content-admin { position: inherit;}
    .content-main .text {margin-bottom: 0;}


    .leadercontent, .simpletext {
        margin-top:0!important;
    }


    .leadercontent{
        margin-top:0!important;
    }



    #content h2 {
        /*font-size: 48px;*/
        font-weight: 700;
        color: #242239;
        font-family: 'DM Sans', sans-serif;
    }



    /*------ hide why travel with G in footer -----*/
    #footer {
        margin-top: 0;
    }

    #footer .footer-usp {
        display: none;
    }



    /*---h3 title size, buttons, body title and text margin ---*/


    .content-container p {

    }


    .button.main a {
        color: #fff;
    }

    .button.ghost a {
        color: #513394;
        padding: 12px 0;
    }

    a {
        text-decoration: none
    }

    a:focus,
    a:hover {
        color: #c7c7c7;
        text-decoration: none
    }



    .button {
        margin-top: 24px;
        font-weight: 700;

        font-size: 16px;
        line-height: 1.5;
        letter-spacing: 0.5px;
    }


    .main {
        width: -webkit-fit-content;
        width: -moz-fit-content;
        width: fit-content;

        padding: 12px 24px;
        border-radius: 1rem;


        color:#fff;
        background-color: #513394;
        position: relative;
    }


    .main:hover {
        -webkit-transition: .2s ease-out;
        -o-transition: .2s ease-out;
        transition: .2s ease-out;

        box-shadow: rgb(36 34 57 / 22%) 0px 0.125rem 1.5rem;
    }


    .main:active, .content-top .hypersearchform .btn:active {
        background: #210a53;
    }



    .main.button:focus::before {
        content: "";
        pointer-events: none;
        position: absolute;
        box-sizing: content-box;
        border: 4px solid #dad9ff;
        border-radius: 1rem;
        inset: -0.175rem;
    }



    .content-top .hypersearchform .btn:focus {
        color: #fff;
    }




    .ghost {
        padding: .5rem 0;
    }




    .ghost a:hover {
        border-bottom: 2px solid #af9feb;
    }

    .ghost:active {
        box-shadow:none !important;
    }

    .ghost a:focus {
        background: rgba(235, 234, 255, 0.1);
        border: 2px dashed #af9feb;
        border-radius: 4px;}









    /*------ hero section -----*/

    .content-top section {
        position: relative;
        margin-bottom: 0;
        overflow: hidden

    }





    .bg-image-and-search {
        display: -ms-grid;
        display: grid;
        -align-items: center;
    }




    .brand h1 {
        text-transform: none;
        font-size: 52px;
        color: #fff;
        line-height: 1;
    }

    form.hypersearchform.search-container {
        margin-left: 0;
        padding: 0;
        float: none;
        margin-top: 0;
        background: 0 0;
        margin-bottom: 0;
    }


    .hero-image-slide {
        margin-top: 0!important;
        z-index: -1;
    }

    .hero-image-slide .image img {
        width: 100%;
        /* min-height: 505px; */
        max-height: 505px;
        -o-object-fit: cover;
        object-fit: cover;
        z-index: -1;
    }



    .content-top .hypersearchform .btn:hover {
        background: #513394;

        -webkit-transition: .2s ease-out;
        -o-transition: .2s ease-out;
        transition: .2s ease-out;
        box-shadow: rgb(36 34 57 / 22%) 0px 0.125rem 1.5rem;
    }

    /*------ seach form and text  group ----*/


    .hero-search {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        position: absolute;
        top: 60%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        -o-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }



    .hero-search .brand h1 {
        text-align:center;
    }


    .search-items {
        grid-area: 2 / 3 / 3 / 11;
        -ms-flex-item-align: center;
        -ms-grid-row-align: center;
        align-self: center;
    }

    .advanced-search {
        display: none!important;
    }

    .hypersearchform.search-container fieldset {
        width: 100%;
        background: #fff;
        border-radius: 18px;
        padding: 12px 10px 12px 15px;
        margin: 20px auto 0;
        display:flex;
        box-sizing: border-box;

    }


    .hypersearchform.search-container legend {
        display: none;
    }

    #homepage-refactored-h1-header-trip-finder .hypersearchform.search-container input {
        border: 0;
        box-shadow: none;
        background-color: unset;
        margin: 0;
        font-size: 16px;
        font-style:normal;
        width: 100%;
        padding: 10px 15px;
    }


    .content-top .hypersearchform .btn {
        border-radius:60px;
        height: 50px;
        font-size: 16px;
        letter-spacing: .5px;
        font-weight: 500;
        padding: 16px 34px;
        background: #513394;
        display: flex;
        align-items: center;
        align-content: center;

    }

    form.hypersearchform fieldset button:before {
        content: '';
        background-image: url(img/Search-icon.svg);
        width: 24px;
        height: 24px;
        display: inline-block;
        margin-right: 12px;
        vertical-align: text-top;
        background-repeat: no-repeat;
        background-size: contain;
    }


    /*-------Where to travel covid section-----*/

    .content-container {
        margin: 0px auto 80px;
        box-sizing: border-box;
    }

    .parent {
        display: grid;
        grid-template-columns: calc(50% - -10px) calc(50% - 30px);

        grid-gap: 20px;
        padding: 0;
        border-radius: 16px;
        background: #F6F6FA;
    }

    .wheretohpdes {
        padding: 60px 0 90px 60px;
    }

    .wheretohpdes p {
        font-size: 16px;
    }




    .wheretohpimg {
        background-image:url(img/wheretohpimg1.jpg);
        border-radius: 0 16px 16px 0;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }





    @media (max-width: 1080px) {
        .content-container ul.tabs {
            white-space: nowrap;
            margin-left: -40px;
            margin-right: -40px;
            padding-left: 40px;
            padding-right: 40px;
        }

    }

    @media (max-width: 768px) {
        .content-container {
            margin: 60px auto 0;
            padding: 0 24px;
        }

        .content-container ul.tabs {
            margin-left: -32px;
            margin-right: -24px;
            padding-left: 24px;
            padding-right: 24px;
        }

        .tab-section.tour-recos {
            margin-right: -24px;
        }

    }

    @media (max-width: 640px) {

        .content-container h3 {
            font-size: 24px;
            padding: 0;
        }


        .promo-intro, .why-g-intro {
            width: 100%!important;
        }

    }





    /*-------Trip recos seciton-----*/

    p.eye-icon {
        padding:0!important;
        white-space: nowrap;
    }

    .per_person {
        white-space: nowrap;
    }

    p.trip-title {
        padding-top:0!important;
    }




    .tour-sale {
        position: relative;

    }

    .tour-sale .recos-container {    text-decoration: none;
        display: block;
        position: relative;
        list-style-type: none;
        margin-left: 0px !important;
        list-style: none;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        overflow-x: auto !important;
        overflow-y: hidden !important;
        margin-block-end: 1em;}

    .tour-sale .tile-image-container {    border-radius: 15px;
    }

    .tour-sale .dy-text { }




    .content-container .promo-intro {
        width: 65%;
    }

    .promo-intro p {
        font-size: 16px;
        line-height: 1.5;
    }


    /*------BWC and TWC------*/

    .pomtcontainer {
        padding: 40px 35px 25px 35px;
        align-self: normal;
        border-radius: 16px;
        text-align: left;

        display: grid;
        grid-template-columns: calc(80% - 26px) calc(30% - 45px);
        grid-gap: 20px;
    }

    .pomtcontainer.wtg {
        background-color: #E4F6F1; }

    .pomtcontainer.bwc {
        background-color: #f6f6fa; }


    .pomtcontainer.twc {
        background-color: #fdf9e5; }


    .pomtgrid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr;
        grid-column-gap: 0;

        grid-row-gap: 0;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        grid-gap: 20px;
        margin-bottom: 0;
    }

    .pomttopicon {
        background-color: #fff;
        height: 70px;
        box-shadow: 0 0 4px rgba(81, 51, 148, 0.2);

        border-radius: 100px;
        width: 70px;
    }

    .pomttopicon img {
        margin: 11px 12px 11px 12px; width: 50px;
    }

    .pomtgrid p { font-size: 16px; line-height: 1.5; margin: 0px 0 24px 0 !important;}
    .pomtgrid p a {text-decoration:underline; color:#ffffff !important}


    @media only screen and (min-width: 961px) and (max-width: 1149px)  {

        .pomtcontainer {
            padding: 40px 24px 25px 24px;
        }

        .pomttopicon {
            height: 56px;
            width: 56px;
        }

        .pomttopicon img {
            width: 32px;
        }

        .promcontent h3 {
            font-size: 24px;
        }


        .pomtgrid p {
            margin: 0px -50% 24px 0 !important;
        }

    }




    /*----retravel section----*/

    .retravel-section-bg  {
        background: -webkit-linear-gradient(90deg, #fff 45%, #210a53 12%);
        margin-bottom: 0px;
        margin-top: 90px;
    }


    .retravel-section-bg .promo-intro, .retravel-section-bg .promo-intro h3 {
        color:#fff;
    }

    .retravel-section-bg .content-container, .why-g-block .content-container  {
        padding-top: 90px;
    }


    /*---why G block---*/

    .why-g-block {
        background-color:#f6f6fa;
        margin-bottom:0;
        /* margin-top:90px; */
    }



    .content-container .why-g-intro {
        width: 60%;
    }

    .content-container .why-g-intro p{
        font-size:16px;
    }

    .reasons-items-block {
        display: grid;
        -ms-grid-columns: 25% 15px 1fr 15px 1fr 15px 1fr;
        grid-template-columns: repeat(3,1fr);
        grid-gap: 24px;
        margin-top:48px;
        margin-bottom: 90px;
    }

    .reason-item {

        display: flex;
        flex-direction: column;
        row-gap: 24px;

        align-items: flex-start;
        padding: 24px;

        background: #FFFFFF;
        border-radius: 16px;
    }


    .reason-item p{
        padding-top: 0px;
    }


    .reason-item .card-header  {
        display: flex;
        flex-direction: row;

        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;

        grid-gap: 12px;
        margin-bottom:0;
    }


    .reason-item .card-header img {
        max-width: 60px;
    }


    .reason-item .card-header h6 {
        font-size: 18px;
        line-height: 1.45;
        color: #242239;
        margin:0;
    }






    @media (max-width:1199px) {

        ul.tabs li {margin-right:15px;}

        .pomtcontainer {width:unset;}

        .pomtgrid {-webkit-box-align: start;-ms-flex-align: start;align-items: start;}

        .pomtgrid h2 { text-align:center !important;}
    }


    @media (max-width:1080px) {

        .content-container ul.tabs {
            overflow-x: auto;
            white-space: nowrap;
            margin-left: -40px;
            margin-right: -40px;
            padding-left: 40px;
            padding-right: 40px;

        }
        .pomtcontainer {padding: 20px 20px 14px 20px;
            grid-template-columns: calc(80% - 30px) calc(30% - 45px);
            grid-gap: 15px;}
    }



    @media (max-width:979px) {

        .pomtgrid h2 {font-size: 2.4em; padding: 0; text-align:center !important;}

        ul.tabs li {
            margin-right:15px;}

        .parent {
            grid-template-columns: 54% auto;
            grid-gap: 10px;}

        .hero-container {
            padding: 0 0 0 24px
        }




    }

    @media (max-width:960px) {

        .pomtgrid {-ms-grid-columns: auto;grid-template-columns: auto; grid-gap: 20px;}
        .pomtcontainer { padding: 32px; }

    }




    @media (max-width:768px) {

        .content-top .hypersearchform {
            display: block;
        }

        .content-container .promo-intro {
            width: 80%;
        }


        #pomtpromo-terms h3 {padding:0}
        .pomtblue, .pomtpurple { padding: 20px;}
        .pomtgrid h2 {text-align:center !important;}


        .parent {grid-template-columns: auto; grid-gap: 10px;}

        .wheretohpdes {padding: 60px 30px 0 30px;}

        .wheretohpimg {height: 220px; border-radius: 0 0 16px 16px;}


        .content-container {
            margin: 60px auto 0;
            padding: 0 24px;
        }

        #content h2 {
            padding:0;
            font-size: 32px;
            line-height: 40px;
        }



        .content-container h3 {
            padding: 0;
        }


        .content-container ul.tabs {
            margin-left: -24px;
            margin-right: -24px;
            padding-left: 24px;
            padding-right: 24px;

        }

        #dy_Summer_sale_Central_America_-_uk, .tab-section.tour-recos{
            margin-right: -24px;
        }


        .reasons-items-block {
            grid-template-columns: repeat(2,1fr); }

    }




    @media (max-width:640px) {

        .hero {
            padding: 0 !important
        }

        .hero-container {
            padding: 0 !important;
            margin-top: 0;
        }


        .hero-search {
            margin: 0 24px;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            transform: none;
        }

        .brand h1 {
            font-size: 30px;
            line-height: 1em;
        }

        .search-items {
            grid-area: 2 / 1 / 2 / 13;
            margin-bottom: 40px;
        }

        form.hypersearchform.search-container {
            display:block;
        }

        .content-top .hypersearchform .btn {
            height: 44px;
            font-size: 0px;
            padding: 14px;
            display: block;
        }

        .hypersearchform.search-container fieldset {
            padding: 7px 10px 7px 20px;}

        #homepage-refactored-h1-header-trip-finder .hypersearchform.search-container input {
            padding: 7px 0px;
        }

        form.hypersearchform fieldset button:before {
            width: 16px;
            height: 16px;
            margin-right: 0px;
        }

        .content-container h3 { font-size: 24px;}

        .wheretohpdes {
            padding: 60px 30px 30px 30px;
        }


        .pomtgrid {
            grid-gap: 20px;
        }


        .pomtcontainer {
            padding: 40px 24px;
        }



        .promo-intro p {
            font-size: 16px;
        }


        .pomttopicon {
            height: 60px;
            width: 60px;
        }

        .pomttopicon img{
            width: 36px!important;
            margin: 12px!important;
        }


        .retravel-section-bg {
            background: -webkit-linear-gradient(90deg, #fff 40%, #210a53 12%);
            margin-bottom: 0px;
            margin-top: 60px;
        }

        .promo-intro, .why-g-intro {
            width: 100%!important;
        }


        .why-g-block {
            margin: 0 auto;
        }

        .why-g-block .content-container {
            padding-top: 64px;
            margin-top:0;
        }

        .why-g-block .why-g-intro h2 {
            padding-top: 0px;
        }

        .reasons-items-block {
            grid-template-columns: repeat(1,1fr);
            grid-auto-rows: 1fr;
        }



    }
    div#breadcrumbs { display: none; }

    .content-top .hypersearchform .btn {
        border-radius: 60px;
        height: 50px;
        font-size: 16px;
        letter-spacing: .5px;
        font-weight: 500;
        padding: 16px 34px;
        background: #513394;
        display: flex;
        align-items: center;
        align-content: center;
    }

    form.hypersearchform fieldset button:before {
        content: '';
        background-image: url(images/Search-icon.svg);
        width: 24px;
        height: 24px;
        display: inline-block;
        margin-right: 12px;
        vertical-align: text-top;
        background-repeat: no-repeat;
        background-size: contain;
    }
</style>

