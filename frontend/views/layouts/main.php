<?php
/* @var $this \yii\web\View */

/* @var $content string */

use frontend\assets\AppAsset;
use common\widgets\Alert;
use yii\bootstrap5\Breadcrumbs;
use yii\helpers\Html;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
    <!DOCTYPE html>
    <html lang="<?= Yii::$app->language ?>" class="h-100">
    <head>
        <meta charset="<?= Yii::$app->charset ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <?php $this->registerCsrfMetaTags() ?>
        <title><?= Yii::$app->name . ' | ' . Html::encode($this->title) ?></title>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,200;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;1,9..40,300&amp;family=Poppins:wght@100;300;400;500;600&amp;display=swap"
              rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.13.6/underscore-min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.4.1/backbone-min.js"></script>
        <script>(function () {
                var h = document.getElementsByTagName('html')[0];
                h.className = h.className.replace('no-js', 'js');
            })();
            ;(function (w, d, u) {
                w.readyQ = [];
                w.bindReadyQ = [];

                function p(x, y) {
                    if (x == "ready") {
                        w.bindReadyQ.push(y);
                    } else {
                        w.readyQ.push(x);
                    }
                };var a = {ready: p, bind: p};
                w.$ = w.jQuery = function (f) {
                    if (f === d || f === u) {
                        return a
                    } else {
                        p(f)
                    }
                }
            })(window, document);
            ;</script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nouislider@15.7.0/dist/nouislider.min.css">
        <script src="https://cdn.jsdelivr.net/npm/nouislider@15.7.0/dist/nouislider.min.js"></script>
        <?php $this->head() ?>


    </head>
    <body>
    <?php $this->beginBody() ?>

    <header>
        <div data-testid="nav-container" class="styles_parent_nav_wrapper__rVxUu">
            <div class="styles_nav_wrapper__hImpE">
                <div class="styles_nav_wrapper_inner__ZvwOI">
                    <nav data-testid="nav" class="styles_nav__OwJwl container__8nRk6">
                        <ul class="col-desktop-10 col-tablet-lg-7 col-tablet-7 col-desktop-lg-10">
                            <li><a data-testid="logo" class="styles_logo_wrapper__6Axh_" href="/"><img
                                            alt="CanadaWay-Tours logo" width="140" height="32" decoding="async"
                                            data-nimg="1" class="styles_logo__ktGwM" src="/images/logo.png"
                                            style="color: transparent; visibility: visible"></a></li>
                            <li><a data-testid="link-component" id="destinations_menu_button"
                                   class="styles_nav_list_item__gXRu_" href="#">
                                    <button class="styles_button__9Iy0U styles_button_sm__bg1VW styles_hide_focus_outline__f8HVo styles_hide_under_line_on_hover__5QnP2 styles_button_ghost__cuQN3"
                                            type="button">
                                        Destinations
                                        <div class="icon icon_chevronDownGrey" role="presentation"
                                             style="width: 16px; height: 16px">
                                            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 6L8 10L12 6" stroke="#BEB8C4" stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                </a></li>

                            <li><a data-testid="link-component" class="styles_nav_list_item__gXRu_" href="#"
                                   id="why_g_menu_button">
                                    <button class="styles_button__9Iy0U styles_button_sm__bg1VW styles_hide_focus_outline__f8HVo styles_hide_under_line_on_hover__5QnP2 styles_button_ghost__cuQN3"
                                            type="button">
                                        Why CanadaWay
                                        <div class="icon icon_chevronDownGrey" role="presentation"
                                             style="width: 16px; height: 16px">
                                            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 6L8 10L12 6" stroke="#BEB8C4" stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                </a></li>
                            <li><a href="/work" data-testid="link-component"
                                   class="styles_button__9Iy0U styles_button_sm__bg1VW styles_hide_focus_outline__f8HVo styles_hide_under_line_on_hover__5QnP2 styles_button_ghost__cuQN3">Work
                                    with us</a></li>

                        </ul>
                        <div data-testid="user-controls"
                             class="styles_user_controls__A_KJn col-desktop-2 col-tablet-lg-1 col-desktop-lg-2 col-tablet-1">
                            <a data-testid="link-component"
                               class="styles_user_control__NlZo_"
                               href="/contact-us/">
                                <div class="icon icon_call" role="presentation">
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.0001 15.9211V18.9211C21.0012 19.1996 20.9441 19.4752 20.8326 19.7304C20.721 19.9856 20.5574 20.2147 20.3521 20.4029C20.1469 20.5912 19.9046 20.7346 19.6408 20.8238C19.377 20.913 19.0974 20.9461 18.8201 20.9211C15.7429 20.5867 12.7871 19.5352 10.1901 17.8511C7.77388 16.3157 5.72539 14.2672 4.19006 11.8511C2.50003 9.24228 1.4483 6.27207 1.12006 3.18107C1.09507 2.90454 1.12793 2.62583 1.21656 2.3627C1.30518 2.09956 1.44763 1.85776 1.63482 1.65269C1.82202 1.44763 2.04986 1.28378 2.30385 1.1716C2.55783 1.05941 2.8324 1.00133 3.11006 1.00107H6.11006C6.59536 0.996297 7.06585 1.16815 7.43382 1.48461C7.80179 1.80106 8.04213 2.24052 8.11005 2.72107C8.23668 3.68114 8.47151 4.6238 8.81006 5.53107C8.9446 5.889 8.97372 6.27799 8.89396 6.65195C8.81421 7.02592 8.62892 7.36918 8.36005 7.64107L7.09006 8.91107C8.51361 11.4146 10.5865 13.4875 13.0901 14.9111L14.3601 13.6411C14.6319 13.3722 14.9752 13.1869 15.3492 13.1072C15.7231 13.0274 16.1121 13.0565 16.4701 13.1911C17.3773 13.5296 18.32 13.7644 19.2801 13.8911C19.7658 13.9596 20.2095 14.2043 20.5266 14.5786C20.8437 14.9529 21.0122 15.4306 21.0001 15.9211Z"
                                              stroke="#513394" stroke-width="2" stroke-linecap="round"
                                              stroke-linejoin="round"></path>
                                    </svg>
                                </div>
                                <span class="sr-only">Contact Us</span></a>
                            <div class="styles_user_control_profile_wrapper__wrzvd">
                                <button type="button" id="profile_dropdown_button"
                                        class="styles_user_control__NlZo_ styles_user_control_profile_button__wjFdG">

                                    <span class="sr-only">Profile</span></button>
                                <div style="display: none"
                                     class="styles_profile_avatar_dropdown__XEkpK styles_profile_avatar_dropdown_active__uxmkl"
                                     data-testid="profile-avatar-dropdown"><a data-testid="link-component"
                                                                              href="/tours?list=upcoming"><p
                                                class="styles_profile_avatar_dropdown_link__bADCJ">
                                            Tours
                                        </p></a>
                                    <a data-testid="link-component" href="/profile/great-adventure-perks"><p
                                                class="styles_profile_avatar_dropdown_link__bADCJ">
                                            Great Adventurers Club
                                        </p></a><a data-testid="link-component" href="/settings/personal-info"><p
                                                class="styles_profile_avatar_dropdown_link__bADCJ">
                                            Settings
                                        </p></a>
                                    <div class="styles_profile_avatar_dropdown_border__c5kf_"></div>
                                    <a data-testid="link-component" href="/contact-us/"><p
                                                class="styles_profile_avatar_dropdown_link__bADCJ">Help</p></a><a
                                            data-testid="link-component" href="/accounts/logout/" rel="nofollow"><p
                                                class="styles_profile_avatar_dropdown_link__bADCJ">
                                            Log out
                                        </p></a></div>
                                <div style="display: none;"
                                     class="styles_profile_avatar_dropdown__XEkpK styles_profile_avatar_dropdown_active__uxmkl"
                                     data-testid="profile-avatar-dropdown-non-logged-in"><a data-testid="link-component"
                                                                                            href="/accounts/register/">
                                        <p class="styles_profile_avatar_dropdown_link__bADCJ">Register</p></a><a
                                            data-testid="link-component" href="/accounts/login/"><p
                                                class="styles_profile_avatar_dropdown_link__bADCJ">Log in</p></a></div>
                            </div>
                        </div>
                    </nav>
                </div><!-- Search Modal Container -->
                <div id="search_modal_container" style="display: none" class="container__8nRk6">
                    <div data-testid="nav-drop-down"
                         class="jollof_desktop_nav_dropdown styles_nav_dropdown_wrapper__I9voU styles_search_dropdown__WrufZ col-desktop-2 col-tablet-lg-1 col-desktop-lg-2 col-tablet-1"
                         style="display: block">
                        <div class="Search_search_header_container__5jbL4">
                            <div>
                                <div class="Search_search_header_top_focus__7CE6E">
                                    <div class="styles_search_input_container__8dcKA" role="search"><a
                                                data-testid="link-component" href="/search/">
                                            <div id="desktop_search_header_button"
                                                 class="styles_search_input_search_icon__pGrGh styles_search_input_search_icon_right__h1ovH">
                                                <div class="icon icon_searchGlass" role="presentation"
                                                     style="width: 16px; height: 16px">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                              d="M11.0002 17.6668C14.6821 17.6668 17.6668 14.6821 17.6668 11.0002C17.6668 7.31826 14.6821 4.3335 11.0002 4.3335C7.31826 4.3335 4.3335 7.31826 4.3335 11.0002C4.3335 14.6821 7.31826 17.6668 11.0002 17.6668Z"
                                                              stroke="#513394" stroke-width="2" stroke-linecap="round"
                                                              stroke-linejoin="round"></path>
                                                        <path d="M19.6665 19.667L15.7139 15.7144" stroke="#513394"
                                                              stroke-width="2" stroke-linecap="round"
                                                              stroke-linejoin="round"></path>
                                                    </svg>
                                                </div>
                                                <span>Search</span></div>
                                        </a><label for="navSearch" class="styles_search_input_label__s3F3p">
                                            Label used just for aria compliance</label>
                                        <form id="nav_search_mobile" method="get" action="/search/"
                                              class="hypersearchform  hypersearchmobile"><span role="status"
                                                                                               aria-live="polite"
                                                                                               class="ui-helper-hidden-accessible"></span><input
                                                    type="search" maxlength="128" name="q" ceid="Navigation Search"
                                                    data-testid="search-input"
                                                    placeholder="Where’s your next adventure?"
                                                    data-source="/search/autocomplete/" autocomplete="off"
                                                    class="hypersearch Search_search_header_input__0S5Il hypersearch-header ui-autocomplete-input"
                                                    id="navSearch" role="searchbox" value=""><input type="hidden"
                                                                                                    name="ref"
                                                                                                    value="navsearch">
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div id="searchInputTarget">
                                <ul class="ui-autocomplete ui-front ui-menu ui-widget ui-widget-content ui-corner-all"
                                    id="ui-id-1" tabindex="0" style="display: none;"></ul>
                            </div>
                            <div><a data-testid="link-component" href="/search/">
                                    <button class="styles_button__9Iy0U styles_button_sm__bg1VW styles_button_ghost__cuQN3"
                                            type="button"><p class="ViewAll_viewAll-text__Ksuru">
                                            View all tours
                                        </p>
                                        <div class="icon icon_arrowForward" role="presentation">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <rect width="16" height="16" rx="8" fill="white"></rect>
                                                <path d="M6 12L10 8L6 4" stroke="#504E61" stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                </a></div>
                        </div>
                    </div>
                </div><!--Destinations -->
                <div id="destinations_dropdown_panel" style="display: none" class="">
                    <div data-testid="nav-drop-down"
                         class="container__8nRk6 styles_nav_dropdown_wrapper__I9voU col-desktop-2 col-tablet-lg-1 col-desktop-lg-2 col-tablet-1"
                         style="display: block">
                        <div class="styles_destination_explorer_wrapper__wOiK8">
                            <div class="styles_nav_dropdown_navigator_wrapper__3gNU1">
                                <div class="styles_nav_dropdown_selector__OTc81">
                                    <button type="button" id="North America"
                                            class="styles_nav_dropdown_navigation_button__DMXKE styles_selected__dZWqb">
                                        <span>North America</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <button type="button" id="Central America &amp; Caribbean"
                                            class="styles_nav_dropdown_navigation_button__DMXKE"><span>Central America &amp; Caribbean</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <button type="button" id="South America"
                                            class="styles_nav_dropdown_navigation_button__DMXKE">
                                        <span>South America</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <button type="button" id="Europe"
                                            class="styles_nav_dropdown_navigation_button__DMXKE"><span>Europe</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <button type="button" id="North Africa &amp; Middle East"
                                            class="styles_nav_dropdown_navigation_button__DMXKE"><span>North Africa &amp; Middle East</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <button type="button" id="Africa"
                                            class="styles_nav_dropdown_navigation_button__DMXKE"><span>Africa</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <button type="button" id="Asia"
                                            class="styles_nav_dropdown_navigation_button__DMXKE"><span>Asia</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <button type="button" id="Oceania"
                                            class="styles_nav_dropdown_navigation_button__DMXKE"><span>Oceania</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>

                                </div>
                            </div>
                            <div id="swaps"><!-- swaps -->
                                <div data-testid="North America" class="styles_continent_destinations_wrapper__5ssDy">
                                    <div class="styles_continent_destination_wrapper__Fl_Hb"><i>All destinations
                                            in</i><span class="h3">North America</span>
                                        <ul class="styles_destinations_lists_wrapper__VJPol"><a
                                                    data-testid="link-component"
                                                    href="/destinations/north-america/canada">Canada</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/north-america/united-states">United States</a>
                                        </ul>
                                        <a data-testid="link-component" target="_self" rel="noopener noreferrer"
                                           href="/destinations/north-america">
                                            <button class="styles_button__9Iy0U styles_button_sm__bg1VW styles_button_ghost__cuQN3"
                                                    type="button"><span>View all North America</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504e61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <div class="styles_display_image__XdATL"><img alt="North America" width="280"
                                                                                  height="360" decoding="async"
                                                                                  data-nimg="1"
                                                                                  src="/images/north-america-desktop.webp"
                                                                                  style="color: transparent; visibility: visible; border-radius: 10px;">
                                    </div>
                                </div>
                                <div data-testid="Central America &amp; Caribbean" style="display: none"
                                     class="styles_continent_destinations_wrapper__5ssDy">
                                    <div class="styles_continent_destination_wrapper__Fl_Hb"><i>All destinations
                                            in</i><span class="h3">Central America &amp; Caribbean</span>
                                        <ul class="styles_destinations_lists_wrapper__VJPol"><a
                                                    data-testid="link-component"
                                                    href="/destinations/central-america/belize">Belize</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/central-america/costa-rica">Costa Rica</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/central-america/cuba">Cuba</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/central-america/el-salvador">El Salvador</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/central-america/guatemala">Guatemala</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/central-america/honduras">Honduras</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/central-america/mexico">Mexico</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/central-america/nicaragua">Nicaragua</a></ul>
                                        <a data-testid="link-component" target="_self" rel="noopener noreferrer"
                                           href="/destinations/central-america">
                                            <button class="styles_button__9Iy0U styles_button_sm__bg1VW styles_button_ghost__cuQN3"
                                                    type="button"><span>View all Central America &amp; Caribbean</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504e61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <div class="styles_display_image__XdATL"><img alt="Central America &amp; Caribbean"
                                                                                  width="280" height="360"
                                                                                  decoding="async" data-nimg="1"
                                                                                  src="/images/central-america-and-caribbean-desktop.webp"
                                                                                  style="color: transparent; visibility: visible; border-radius: 10px;">
                                    </div>
                                </div>
                                <div data-testid="South America" style="display: none"
                                     class="styles_continent_destinations_wrapper__5ssDy">
                                    <div class="styles_continent_destination_wrapper__Fl_Hb"><i>All destinations
                                            in</i><span class="h3">South America</span>
                                        <ul class="styles_destinations_lists_wrapper__VJPol"><a
                                                    data-testid="link-component"
                                                    href="/destinations/south-america/argentina">Argentina</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/south-america/bolivia">Bolivia</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/south-america/brazil">Brazil</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/south-america/chile">Chile</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/south-america/colombia">Colombia</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/south-america/ecuador">Ecuador</a><a
                                                    data-testid="link-component"
                                                    href="/travel-styles/active/hiking-trekking/patagonia">Patagonia</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/south-america/galapagos">Galápagos
                                                Islands</a><a data-testid="link-component"
                                                              href="/travel-styles/active/hiking-trekking/inca-trail">Inca
                                                Trail</a><a data-testid="link-component"
                                                            href="/destinations/south-america/machu-picchu">Machu
                                                Picchu</a><a data-testid="link-component"
                                                             href="/destinations/south-america/peru">Peru</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/south-america/uruguay">Uruguay</a></ul>
                                        <a data-testid="link-component" target="_self" rel="noopener noreferrer"
                                           href="/destinations/south-america">
                                            <button class="styles_button__9Iy0U styles_button_sm__bg1VW styles_button_ghost__cuQN3"
                                                    type="button"><span>View all South America</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504e61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <div class="styles_display_image__XdATL"><img alt="South America" width="280"
                                                                                  height="360" decoding="async"
                                                                                  data-nimg="1"
                                                                                  src="/images/south-america-desktop.webp"
                                                                                  style="color: transparent; visibility: visible; border-radius: 10px;">
                                    </div>
                                </div>
                                <div data-testid="Europe" style="display: none"
                                     class="styles_continent_destinations_wrapper__5ssDy">
                                    <div class="styles_continent_destination_wrapper__Fl_Hb"><i>Top destinations
                                            in</i><span class="h3">Europe</span>
                                        <ul class="styles_destinations_lists_wrapper__VJPol"><a
                                                    data-testid="link-component"
                                                    href="/destinations/europe/canary-islands">Canary Islands</a><a
                                                    data-testid="link-component" href="/destinations/europe/croatia">Croatia </a><a
                                                    data-testid="link-component" href="/destinations/europe/france">France</a><a
                                                    data-testid="link-component" href="/destinations/europe/germany">Germany</a><a
                                                    data-testid="link-component" href="/destinations/europe/greece">Greece</a><a
                                                    data-testid="link-component" href="/destinations/europe/iceland">Iceland</a><a
                                                    data-testid="link-component" href="/destinations/europe/ireland">Ireland</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/europe/italy">Italy</a><a
                                                    data-testid="link-component" href="/destinations/europe/portugal">Portugal</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/europe/spain">Spain</a><a
                                                    data-testid="link-component" href="/destinations/europe/turkey">Turkey</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/europe/united-kingdom">United Kingdom</a></ul>
                                        <a data-testid="link-component" target="_self" rel="noopener noreferrer"
                                           href="/destinations/europe">
                                            <button class="styles_button__9Iy0U styles_button_sm__bg1VW styles_button_ghost__cuQN3"
                                                    type="button"><span>View all Europe</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504e61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <div class="styles_display_image__XdATL"><img alt="Europe" width="280" height="360"
                                                                                  decoding="async" data-nimg="1"
                                                                                  src="/images/europe-desktop.webp"
                                                                                  style="color: transparent; visibility: visible; border-radius: 10px;">
                                    </div>
                                </div>
                                <div data-testid="North Africa &amp; Middle East" style="display: none"
                                     class="styles_continent_destinations_wrapper__5ssDy">
                                    <div class="styles_continent_destination_wrapper__Fl_Hb"><i>All destinations
                                            in</i><span class="h3">North Africa &amp; Middle East</span>
                                        <ul class="styles_destinations_lists_wrapper__VJPol"><a
                                                    data-testid="link-component"
                                                    href="/destinations/north-africa-middle-east/egypt">Egypt</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/north-africa-middle-east/jordan">Jordan</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/north-africa-middle-east/morocco">Morocco</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/north-africa-middle-east/oman">Oman</a></ul>
                                        <a data-testid="link-component" target="_self" rel="noopener noreferrer"
                                           href="/destinations/north-africa-middle-east">
                                            <button class="styles_button__9Iy0U styles_button_sm__bg1VW styles_button_ghost__cuQN3"
                                                    type="button"><span>View all North Africa &amp; Middle East</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504e61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <div class="styles_display_image__XdATL"><img alt="North Africa &amp; Middle East"
                                                                                  width="280" height="360"
                                                                                  decoding="async" data-nimg="1"
                                                                                  src="/images/africa.webp"
                                                                                  style="color: transparent; visibility: visible; border-radius: 10px;">
                                    </div>
                                </div>
                                <div data-testid="Africa" style="display: none"
                                     class="styles_continent_destinations_wrapper__5ssDy">
                                    <div class="styles_continent_destination_wrapper__Fl_Hb"><i>All destinations
                                            in</i><span class="h3">Africa</span>
                                        <ul class="styles_destinations_lists_wrapper__VJPol"><a
                                                    data-testid="link-component" href="/destinations/africa/botswana">Botswana</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/africa/kenya">Kenya</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/africa/madagascar">Madagascar</a><a
                                                    data-testid="link-component" href="/destinations/africa/malawi">Malawi</a><a
                                                    data-testid="link-component" href="/destinations/africa/namibia">Namibia</a><a
                                                    data-testid="link-component" href="/destinations/africa/rwanda">Rwanda</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/africa/south-africa">South Africa</a><a
                                                    data-testid="link-component" href="/destinations/africa/tanzania">Tanzania</a><a
                                                    data-testid="link-component" href="/destinations/africa/uganda">Uganda</a><a
                                                    data-testid="link-component" href="/destinations/africa/zambia">Zambia</a><a
                                                    data-testid="link-component" href="/destinations/africa/zimbabwe">Zimbabwe</a>
                                        </ul>
                                        <a data-testid="link-component" target="_self" rel="noopener noreferrer"
                                           href="/destinations/africa">
                                            <button class="styles_button__9Iy0U styles_button_sm__bg1VW styles_button_ghost__cuQN3"
                                                    type="button"><span>View all Africa</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504e61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <div class="styles_display_image__XdATL"><img alt="Africa" width="280" height="360"
                                                                                  decoding="async" data-nimg="1"
                                                                                  src="/images/africa-desktop.webp"
                                                                                  style="color: transparent; visibility: visible; border-radius: 10px;">
                                    </div>
                                </div>
                                <div data-testid="Asia" style="display: none"
                                     class="styles_continent_destinations_wrapper__5ssDy">
                                    <div class="styles_continent_destination_wrapper__Fl_Hb"><i>Top destinations
                                            in</i><span class="h3">Asia</span>
                                        <ul class="styles_destinations_lists_wrapper__VJPol"><a
                                                    data-testid="link-component"
                                                    href="/destinations/asia/bali">Bali</a><a
                                                    data-testid="link-component" href="/destinations/asia/cambodia">Cambodia</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/asia/china">China</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/asia/india">India</a><a
                                                    data-testid="link-component" href="/destinations/asia/indonesia">Indonesia</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/asia/japan">Japan</a><a
                                                    data-testid="link-component" href="/destinations/asia/maldives">Maldives</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/asia/nepal">Nepal</a><a
                                                    data-testid="link-component" href="/destinations/asia/south-korea">South
                                                Korea</a><a data-testid="link-component"
                                                            href="/destinations/asia/sri-lanka">Sri Lanka</a><a
                                                    data-testid="link-component" href="/destinations/asia/thailand">Thailand</a><a
                                                    data-testid="link-component" href="/destinations/asia/vietnam">Vietnam</a>
                                        </ul>
                                        <a data-testid="link-component" target="_self" rel="noopener noreferrer"
                                           href="/destinations/asia">
                                            <button class="styles_button__9Iy0U styles_button_sm__bg1VW styles_button_ghost__cuQN3"
                                                    type="button"><span>View all Asia</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504e61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <div class="styles_display_image__XdATL"><img alt="Asia" width="280" height="360"
                                                                                  decoding="async" data-nimg="1"
                                                                                  src="/images/asia-desktop.webp"
                                                                                  style="color: transparent; visibility: visible; border-radius: 10px;">
                                    </div>
                                </div>
                                <div data-testid="Oceania" style="display: none"
                                     class="styles_continent_destinations_wrapper__5ssDy">
                                    <div class="styles_continent_destination_wrapper__Fl_Hb"><i>All destinations
                                            in</i><span class="h3">Oceania</span>
                                        <ul class="styles_destinations_lists_wrapper__VJPol"><a
                                                    data-testid="link-component"
                                                    href="/destinations/oceania/australia">Australia</a><a
                                                    data-testid="link-component"
                                                    href="/destinations/oceania/new-zealand">New Zealand</a></ul>
                                        <a data-testid="link-component" target="_self" rel="noopener noreferrer"
                                           href="/destinations/oceania">
                                            <button class="styles_button__9Iy0U styles_button_sm__bg1VW styles_button_ghost__cuQN3"
                                                    type="button"><span>View all Oceania</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504e61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <div class="styles_display_image__XdATL"><img alt="Oceania" width="280" height="360"
                                                                                  decoding="async" data-nimg="1"
                                                                                  src="/images/oceania-desktop.webp"
                                                                                  style="color: transparent; visibility: visible; border-radius: 10px;">
                                    </div>
                                </div>
                                <div data-testid="Polar" style="display: none"
                                     class="styles_continent_destinations_wrapper__5ssDy">
                                    <div class="styles_continent_destination_wrapper__Fl_Hb"><i>All destinations
                                            in</i><span class="h3">Polar</span>
                                        <ul class="styles_destinations_lists_wrapper__VJPol"><a
                                                    data-testid="link-component" href="/destinations/antarctica-tours">Antarctica</a><a
                                                    data-testid="link-component" href="/destinations/arctic-tours">Arctic</a>
                                        </ul>
                                        <a data-testid="link-component" target="_self" rel="noopener noreferrer"
                                           href="/travel-styles/cruising/polar">
                                            <button class="styles_button__9Iy0U styles_button_sm__bg1VW styles_button_ghost__cuQN3"
                                                    type="button"><span>View all Polar</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504e61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <div class="styles_display_image__XdATL"><img alt="Polar" width="280" height="360"
                                                                                  decoding="async" data-nimg="1"
                                                                                  src="/images/polar-desktop.webp"
                                                                                  style="color: transparent; visibility: visible; border-radius: 10px;">
                                    </div>
                                </div><!-- /swaps --></div>
                        </div>
                    </div>
                </div><!-- /Destination --><!-- Travel Styles -->
                <div id="travel_styles_dropdown_panel" style="display: none" class="">
                    <div data-testid="nav-drop-down"
                         class="container__8nRk6 styles_nav_dropdown_wrapper__I9voU col-desktop-2 col-tablet-lg-1 col-desktop-lg-2 col-tablet-1"
                         style="display: block">
                        <div class="styles_ways_to_travel_wrapper__On0BU">
                            <div class="styles_nav_dropdown_navigator_wrapper__3gNU1">
                                <div class="styles_nav_dropdown_selector__OTc81">
                                    <button type="button" id="CanadaWay Land"
                                            class="styles_nav_dropdown_navigation_button__DMXKE styles_selected__dZWqb">
                                        <span>CanadaWay Land</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <button type="button" id="CanadaWay Sailing &amp; Cruises"
                                            class="styles_nav_dropdown_navigation_button__DMXKE"><span>CanadaWay Sailing &amp; Cruises</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <button type="button" id="Solo-ish_Adventures"
                                            class="styles_nav_dropdown_navigation_button__DMXKE"><span>Solo-ish Adventures</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <button type="button" id="CanadaWay Private Travel"
                                            class="styles_nav_dropdown_navigation_button__DMXKE"><span>CanadaWay Private Travel</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <button type="button" id="The_Geluxe_Collection"
                                            class="styles_nav_dropdown_navigation_button__DMXKE"><span>The Geluxe Collection</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <button type="button" id="National Geographic Journeys"
                                            class="styles_nav_dropdown_navigation_button__DMXKE"><span>National Geographic Journeys</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <button type="button" id="National Geographic Family Journeys"
                                            class="styles_nav_dropdown_navigation_button__DMXKE"><span>National Geographic Family Journeys</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <button type="button" id="Jane Goodall Collection"
                                            class="styles_nav_dropdown_navigation_button__DMXKE"><span>Jane Goodall Collection</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <button type="button" id="Rail Collection"
                                            class="styles_nav_dropdown_navigation_button__DMXKE">
                                        <span>Rail Collection</span><span class="new_nav_span">New</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div id="swaps">
                                <div data-testid="CanadaWay Land" class="styles_ways_to_travel_info_wrapper__GkJYI">
                                    <div><span class="h3">CanadaWay Land</span>
                                        <div>
                                            <div class="styles_ways_group_wrapper__Pqrca">
                                                <ul class="styles_ways_lists_wrapper__6dYe3"><a
                                                            data-testid="link-component" href="/travel-styles/classic">Classic</a><a
                                                            data-testid="link-component"
                                                            href="/travel-styles/wellness">Wellness</a><a
                                                            data-testid="link-component"
                                                            href="/travel-styles/local-living">Local Living</a><a
                                                            data-testid="link-component"
                                                            href="/travel-styles/18-to-30somethings/">18-to-Thirtysomethings</a><a
                                                            data-testid="link-component" href="/travel-styles/active/">Active</a><a
                                                            data-testid="link-component" href="/travel-styles/roamies/">Roamies
                                                        by Hostelworld</a><a data-testid="link-component"
                                                                             href="/travel-styles/family/">Family</a>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <img alt="CanadaWay Land" loading="lazy" width="280" height="316"
                                         decoding="async" data-nimg="1" class="styles_display_image__LzFyK"
                                         src="/images/land-tours-desktop.webp"
                                         style="color: transparent; visibility: visible"></div>
                                <div data-testid="CanadaWay Sailing &amp; Cruises" style="display: none"
                                     class="styles_ways_to_travel_info_wrapper__GkJYI">
                                    <div><span class="h3">CanadaWay Sailing &amp; Cruises</span>
                                        <div>
                                            <div class="styles_ways_group_wrapper__Pqrca">
                                                <ul class="styles_ways_lists_wrapper__6dYe3"><a
                                                            data-testid="link-component"
                                                            href="/travel-styles/cruising/galapagos/">Galápagos
                                                        Cruises</a><a data-testid="link-component"
                                                                      href="/travel-styles/cruising/polar/">Polar
                                                        Cruises</a><a data-testid="link-component"
                                                                      href="/travel-styles/cruising/sailing/">Sailing</a><a
                                                            data-testid="link-component"
                                                            href="/travel-styles/cruising/river/amazon/">Amazon River
                                                        Cruises</a><a data-testid="link-component"
                                                                      href="/destinations/europe/scotland-tours/">Scottish
                                                        Isles Cruises</a></ul>
                                            </div>
                                        </div>
                                    </div>
                                    <img alt="CanadaWay Sailing &amp; Cruises" loading="lazy" width="280"
                                         height="316" decoding="async" data-nimg="1" class="styles_display_image__LzFyK"
                                         src="/images/sailing-cruises-desktop.webp"
                                         style="color: transparent; visibility: visible"></div>
                                <div data-testid="Solo-ish_Adventures" style="display: none"
                                     class="styles_ways_to_travel_info_wrapper__GkJYI">
                                    <div><span class="h3">Solo-ish Adventures</span>
                                        <p class="styles_description__dSZb_">
                                            Travel for yourself, not by yourself with our brand new, solo-only
                                            adventures designed to get you and your group-mates feeling connected right
                                            from day one.
                                        </p><a data-testid="link-component" href="/solo-travel-tours/">
                                            <button class="styles_learn_more_button__nnCDV" type="button"><span>Learn more</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504E61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <img alt="Solo-ish Adventures" loading="lazy" width="280" height="316"
                                         decoding="async" data-nimg="1" class="styles_display_image__LzFyK"
                                         src="/images/solo-ish.webp" style="color: transparent; visibility: visible">
                                </div>
                                <div data-testid="CanadaWay Private Travel" style="display: none"
                                     class="styles_ways_to_travel_info_wrapper__GkJYI">
                                    <div><span class="h3">CanadaWay Private Travel</span>
                                        <p class="styles_description__dSZb_">
                                            Whether it’s a family retreat or a girls trip, you can surround yourself
                                            with a hand-picked crew and customize a tour that fits you all perfectly.
                                        </p><a data-testid="link-component" href="/travel-styles/private-travel/">
                                            <button class="styles_learn_more_button__nnCDV" type="button"><span>Learn more</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504E61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <img alt="CanadaWay Private Travel" loading="lazy" width="280" height="316"
                                         decoding="async" data-nimg="1" class="styles_display_image__LzFyK"
                                         src="/images/private-travel-desktop.png"
                                         style="color: transparent; visibility: visible"></div>
                                <div data-testid="The_Geluxe_Collection" style="display: none"
                                     class="styles_ways_to_travel_info_wrapper__GkJYI">
                                    <div><span class="h3">The Geluxe Collection</span>
                                        <p class="styles_description__dSZb_">
                                            Our new line of premium active adventures is officially here. With perfectly
                                            paced itineraries, one-of-a-kind accommodations and elevated dining, this is
                                            adventure at its finest.
                                        </p><a data-testid="link-component" href="/travel-styles/geluxe/">
                                            <button class="styles_learn_more_button__nnCDV" type="button"><span>Learn more</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504E61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <img alt="The Geluxe Collection" loading="lazy" width="280" height="316"
                                         decoding="async" data-nimg="1" class="styles_display_image__LzFyK"
                                         src="/images/geluxe.webp" style="color: transparent; visibility: visible">
                                </div>
                                <div data-testid="National Geographic Journeys" style="display: none"
                                     class="styles_ways_to_travel_info_wrapper__GkJYI">
                                    <div><span class="h3">National Geographic Journeys</span>
                                        <p class="styles_description__dSZb_">
                                            Go deeper into the cultures and habitats of the places we explore. More is
                                            included and you’ll enjoy greater hands-on exploration, interactions with
                                            local experts, and freedom to roam.
                                        </p><a data-testid="link-component"
                                               href="/travel-styles/national-geographic-journeys/">
                                            <button class="styles_learn_more_button__nnCDV" type="button"><span>Learn more</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504E61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <img alt="National Geographic Journeys" loading="lazy" width="280" height="316"
                                         decoding="async" data-nimg="1" class="styles_display_image__LzFyK"
                                         src="/images/national-geographic-journey-desktop.webp"
                                         style="color: transparent; visibility: visible"></div>
                                <div data-testid="National Geographic Family Journeys" style="display: none"
                                     class="styles_ways_to_travel_info_wrapper__GkJYI">
                                    <div><span class="h3">National Geographic Family Journeys</span>
                                        <p class="styles_description__dSZb_">
                                            Are you an adventure-loving family in search of meaningful ways to discover
                                            the world together? These tours are specially designed for travellers seven
                                            and up and their inquisitive families.
                                        </p><a data-testid="link-component"
                                               href="/travel-styles/national-geographic-journeys/family/">
                                            <button class="styles_learn_more_button__nnCDV" type="button"><span>Learn more</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504E61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <img alt="National Geographic Family Journeys" loading="lazy" width="280"
                                         height="316" decoding="async" data-nimg="1" class="styles_display_image__LzFyK"
                                         src="/images/national-geographic-family-journey-desktop.webp"
                                         style="color: transparent; visibility: visible"></div>
                                <div data-testid="Jane Goodall Collection" style="display: none"
                                     class="styles_ways_to_travel_info_wrapper__GkJYI">
                                    <div><span class="h3">Jane Goodall Collection</span>
                                        <p class="styles_description__dSZb_">
                                            Step deeper into the animal kingdom while respecting all of its inhabitants.
                                            Our incredible collection of wildlife-focused tours is endorsed by the
                                            world-renowned ethologist.
                                        </p><a data-testid="link-component" href="/jane-goodall/">
                                            <button class="styles_learn_more_button__nnCDV" type="button"><span>Learn more</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504E61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <img alt="Jane Goodall Collection" loading="lazy" width="280" height="316"
                                         decoding="async" data-nimg="1" class="styles_display_image__LzFyK"
                                         src="/images/jane-goodall-desktop.webp"
                                         style="color: transparent; visibility: visible"></div>
                                <div data-testid="Rail Collection" style="display: none"
                                     class="styles_ways_to_travel_info_wrapper__GkJYI">
                                    <div><span class="h3">Rail Collection</span>
                                        <p class="styles_description__dSZb_">
                                            See the world differently on train-based adventures where the journey is
                                            part of the story. Iconic rail routes meet locally-led exploration for a
                                            more meaningful, responsible way to travel.
                                        </p><a data-testid="link-component" href="/rail-collection/">
                                            <button class="styles_learn_more_button__nnCDV" type="button"><span>Learn more</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504E61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <img alt="Rail Collection" loading="lazy" width="280" height="316" decoding="async"
                                         data-nimg="1" class="styles_display_image__LzFyK"
                                         src="/images/rail-desktop.png"
                                         style="color: transparent; visibility: visible"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="why_g_dropdown_panel" style="display: none" class="">
                    <div data-testid="nav-drop-down"
                         class="container__8nRk6 styles_nav_dropdown_wrapper__I9voU col-desktop-2 col-tablet-lg-1 col-desktop-lg-2 col-tablet-1"
                         style="display: block">
                        <div class="styles_why_travel_with_g_wrapper__J7xT4">
                            <div class="styles_nav_dropdown_navigator_wrapper__3gNU1">
                                <div class="styles_nav_dropdown_selector__OTc81">
                                    <button type="button" id="Why choose us"
                                            class="styles_nav_dropdown_navigation_button__DMXKE styles_selected__dZWqb">
                                        <span>Why Choose Us</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <button type="button" id="G for Good"
                                            class="styles_nav_dropdown_navigation_button__DMXKE"><span>G for Good</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <button type="button" id="Planeterra"
                                            class="styles_nav_dropdown_navigation_button__DMXKE"><span>Planeterra</span>
                                        <div class="icon icon_chevronRight" role="presentation">
                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 9L5 5L1 1" stroke="#BEB8C4 " stroke-width="1.5"
                                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div id="swaps">
                                <div data-testid="Why choose us" style="display: none"
                                     class="styles_why_g_info_wrapper__anbdZ">
                                    <div><span class="h3">Why choose us</span>
                                        <p class="styles_description__5Yj4u">
                                            As the leader in small group travel for 30 years, we know how to do it
                                            right: flexible itineraries, freedom to roam, safety, peace of mind, and
                                            locally based guides.
                                        </p><a data-testid="link-component"
                                               href="/about-us/why-travel-with-canadaway/">
                                            <button class="styles_learn_more_button__7kukR" type="button"><span>Learn more</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504E61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <img alt="travel-reason" loading="lazy" width="280" height="280" decoding="async"
                                         data-nimg="1" class="styles_display_image__8aXvF"
                                         src="/images/why-travel-with-g-1.png"
                                         style="color: transparent; visibility: visible"></div>
                                <div data-testid="G for Good" style="display: none"
                                     class="styles_why_g_info_wrapper__anbdZ">
                                    <div><span class="h3">G for Good</span>
                                        <p class="styles_description__5Yj4u">
                                            Change the world just by having the time of your life. When you travel with
                                            us, you become a force for good by acting responsibly and creating positive
                                            impact.
                                        </p><a data-testid="link-component" href="/about-us/responsible-travel/">
                                            <button class="styles_learn_more_button__7kukR" type="button"><span>Learn more</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504E61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <img alt="travel-reason" loading="lazy" width="280" height="280" decoding="async"
                                         data-nimg="1" class="styles_display_image__8aXvF"
                                         src="/images/g-for-good-desktop.png"
                                         style="color: transparent; visibility: visible"></div>
                                <div data-testid="Planeterra" style="display: none"
                                     class="styles_why_g_info_wrapper__anbdZ">
                                    <div><span class="h3">Planeterra</span>
                                        <p class="styles_description__5Yj4u">
                                            Together with our non-profit partner, Planeterra, we ensure local
                                            communities touched by our tours benefit from our visits in as many ways
                                            possible.
                                        </p><a data-testid="link-component" href="https://planeterra.org/">
                                            <button class="styles_learn_more_button__7kukR" type="button"><span>Learn more</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504E61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <img alt="travel-reason" loading="lazy" width="280" height="280" decoding="async"
                                         data-nimg="1" class="styles_display_image__8aXvF"
                                         src="/images/planettera-desktop.png"
                                         style="color: transparent; visibility: visible"></div>
                                <div data-testid="Trees for Days" style="display: none"
                                     class="styles_why_g_info_wrapper__anbdZ">
                                    <div><span class="h3">Trees for Days</span>
                                        <p class="styles_description__5Yj4u">
                                            Leave your destination even greener than you found it! For every day on
                                            tour, we’ll plant a tree in your honour and ensure that our forests get to
                                            live their best lives.
                                        </p><a data-testid="link-component" href="/community-tourism/trees-for-days">
                                            <button class="styles_learn_more_button__7kukR" type="button"><span>Learn more</span>
                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L5 5L1 1" stroke="#504E61" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </a></div>
                                    <img alt="travel-reason" loading="lazy" width="280" height="280" decoding="async"
                                         data-nimg="1" class="styles_display_image__8aXvF"
                                         src="/images/trees-desktop.png"
                                         style="color: transparent; visibility: visible"></div>
                                <div data-testid="Travel resources" style="display: none"
                                     class="styles_why_g_info_wrapper__anbdZ">
                                    <div><span class="h3">Travel resources</span>
                                        <div>
                                            <div class="styles_why_group_wrapper__QQY8V">
                                                <ul class="styles_why_lists_wrapper__ul_cn"><a
                                                            data-testid="link-component"
                                                            href="/travel-resources/travel-credits/">How to use your
                                                        travel credits</a><a data-testid="link-component"
                                                                             href="/travel-resources/prepare-for-your-tour/">Preparing
                                                        for your trip</a></ul>
                                            </div>
                                        </div>
                                    </div>
                                    <img alt="travel-reason" loading="lazy" width="280" height="280" decoding="async"
                                         data-nimg="1" class="styles_display_image__8aXvF"
                                         src="/images/travel-resource-desktop.png"
                                         style="color: transparent; visibility: visible"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <div aria-labelledby="mobileheader" class="Mobile_mobile_container__AwGM8">
            <div class="Mobile_mobile_logo__UqXxy"><a href="/"><img alt="CanadaWay-Tours logo" data-testid="mobile-logo"
                                                                    width="140" height="32" decoding="async"
                                                                    data-nimg="1"
                                                                    src="/images/logo.png"
                                                                    style="color: transparent; visibility: visible"></a>
            </div>
            <div class="Mobile_mobile_right_side__xvgES">
                <div role="presentation" data-testid="mobile-avatar-section">
                </div>
            </div>
        </div>
        <nav aria-labelledby="mobilenavheader" class="MobileNav_mobile_nav_container__Pj1id">
            <div class="BottomIcons_bottom_icons_container___42eI">
                <div tabindex="0" role="button" class="BottomIcons_bottom_icons_shared__ZuqOJ">
                    <div class="icon icon_destinations" data-testid="mobile-nav-destinations" role="presentation"
                         style="width: auto; height: auto">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </div>
                    <span data-testid="Destinations"><ya-tr-span data-index="1-0" data-translated="false"
                                                                 data-source-lang="en" data-target-lang="ru"
                                                                 data-value="Destinations"
                                                                 data-translation="Пункты назначения" data-ch="0"
                                                                 data-type="trSpan"
                                                                 style="visibility: inherit !important;">Destinations</ya-tr-span></span>
                </div>
                <div role="button" tabindex="0" id="jollof_menu_button"
                     class="BottomIcons_bottom_icons_shared__ZuqOJ BottomIcons_bottom_icons_menu__Pw8fJ">
                    <div class="icon icon_menu" data-testid="mobile-nav-destinations" role="presentation"
                         style="width: auto; height: auto">
                        <svg width="22" height="24" viewBox="0 0 22 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 3L1 3C0.447715 3 2.39636e-09 3.44772 5.35241e-09 4C8.30847e-09 4.55228 0.447715 5 1 5L2 5C2.55228 5 3 4.55228 3 4C3 3.44772 2.55228 3 2 3Z"></path>
                            <path d="M2 11L1 11C0.447715 11 2.39636e-09 11.4477 5.35241e-09 12C8.30847e-09 12.5523 0.447715 13 1 13L2 13C2.55228 13 3 12.5523 3 12C3 11.4477 2.55228 11 2 11Z"></path>
                            <path d="M2 19L1 19C0.447715 19 2.39636e-09 19.4477 5.35241e-09 20C8.30847e-09 20.5523 0.447715 21 1 21L2 21C2.55228 21 3 20.5523 3 20C3 19.4477 2.55228 19 2 19Z"></path>
                            <path d="M21 3L6 3C5.44772 3 5 3.44772 5 4C5 4.55228 5.44772 5 6 5L21 5C21.5523 5 22 4.55228 22 4C22 3.44772 21.5523 3 21 3Z"></path>
                            <path d="M21 11L6 11C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13L21 13C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11Z"></path>
                            <path d="M21 19L6 19C5.44772 19 5 19.4477 5 20C5 20.5523 5.44772 21 6 21L21 21C21.5523 21 22 20.5523 22 20C22 19.4477 21.5523 19 21 19Z"></path>
                        </svg>
                    </div>
                    <span data-testid="Menu"><ya-tr-span data-index="3-0" data-translated="false" data-source-lang="en"
                                                         data-target-lang="ru" data-value="Menu" data-translation="Меню"
                                                         data-ch="0" data-type="trSpan"
                                                         style="visibility: inherit !important;">Menu</ya-tr-span></span>
                </div>
            </div>
            <div data-testid="Destinations" style="display: none;" class="Modal_modal_overlay__bCKGC">
                <div class="Modal_modal_container__SpUvL DropdownSelect_dropdown-select-modal__95CRV"
                     role="presentation">
                    <div class="Modal_modal_has_text__RVir6 Modal_modal_has_title_text__XzqC8">
                        <div class="TopSection_top_section__9sJj1" role="presentation"><h4></h4></div>
                        <div class="Modal_close_btn__qn_on">
                            <div class="icon icon_close" data-testid="modal-close-icon" role="presentation"
                                 style="width: 16px; height: 16px">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18" stroke="#513394" stroke-width="2" stroke-linecap="round"
                                          stroke-linejoin="round"></path>
                                    <path d="M6 6L18 18" stroke="#504E61" stroke-width="2" stroke-linecap="round"
                                          stroke-linejoin="round"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="Destinations_destination_container__Wff2N"><h3 class="Title_title__hJHmB"
                                                                               id="mobilenavheader">Destinations</h3>
                        <div data-testid="accordionItem"
                             class="styles_accordion_item__z982c styles_accordion_item_compact__LN9LC destination-regions">
                            <button id="heading-:r17:" type="button" class="styles_accordion_toggle__nMAeY"
                                    aria-expanded="false" aria-controls="collapse-:r17:">
                                <div class="styles_accordion_title__AWtJE">North America</div>
                                <div class="styles_accordion_collapse_icon__cyx6r">
                                    <div class="icon icon_chevronDown" role="presentation"
                                         style="width: 16px; height: 16px">
                                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="#242239" stroke-width="1.5"
                                                  stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                            <div id="collapse-:r17:" class="styles_accordion_collapse__9YZG7"
                                 aria-labelledby="heading-:r17:" style="height: 0px">
                                <div data-testid="accordion_body" class="styles_accordion_body__4vvJA">
                                    <ul><a data-testid="link-component" href="/destinations/north-america/canada">
                                            <li>Canada</li>
                                        </a><a data-testid="link-component"
                                               href="/destinations/north-america/united-states">
                                            <li>United States</li>
                                        </a></ul>
                                </div>
                            </div>
                        </div>
                        <div data-testid="accordionItem"
                             class="styles_accordion_item__z982c styles_accordion_item_compact__LN9LC destination-regions">
                            <button id="heading-:r19:" type="button" class="styles_accordion_toggle__nMAeY"
                                    aria-expanded="false" aria-controls="collapse-:r19:">
                                <div class="styles_accordion_title__AWtJE">
                                    Central America &amp; Caribbean
                                </div>
                                <div class="styles_accordion_collapse_icon__cyx6r">
                                    <div class="icon icon_chevronDown" role="presentation"
                                         style="width: 16px; height: 16px">
                                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="#242239" stroke-width="1.5"
                                                  stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                            <div id="collapse-:r19:" class="styles_accordion_collapse__9YZG7"
                                 aria-labelledby="heading-:r19:" style="height: 0px">
                                <div data-testid="accordion_body" class="styles_accordion_body__4vvJA">
                                    <ul><a data-testid="link-component" href="/destinations/central-america/belize">
                                            <li>Belize</li>
                                        </a><a data-testid="link-component"
                                               href="/destinations/central-america/costa-rica">
                                            <li>Costa Rica</li>
                                        </a><a data-testid="link-component" href="/destinations/central-america/cuba">
                                            <li>Cuba</li>
                                        </a><a data-testid="link-component"
                                               href="/destinations/central-america/el-salvador">
                                            <li>El Salvador</li>
                                        </a><a data-testid="link-component"
                                               href="/destinations/central-america/guatemala">
                                            <li>Guatemala</li>
                                        </a><a data-testid="link-component"
                                               href="/destinations/central-america/honduras">
                                            <li>Honduras</li>
                                        </a><a data-testid="link-component"
                                               href="/destinations/central-america/mexico">
                                            <li>Mexico</li>
                                        </a><a data-testid="link-component"
                                               href="/destinations/central-america/nicaragua">
                                            <li>Nicaragua</li>
                                        </a></ul>
                                </div>
                            </div>
                        </div>
                        <div data-testid="accordionItem"
                             class="styles_accordion_item__z982c styles_accordion_item_compact__LN9LC destination-regions">
                            <button id="heading-:r1b:" type="button" class="styles_accordion_toggle__nMAeY"
                                    aria-expanded="false" aria-controls="collapse-:r1b:">
                                <div class="styles_accordion_title__AWtJE">South America</div>
                                <div class="styles_accordion_collapse_icon__cyx6r">
                                    <div class="icon icon_chevronDown" role="presentation"
                                         style="width: 16px; height: 16px">
                                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="#242239" stroke-width="1.5"
                                                  stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                            <div id="collapse-:r1b:" class="styles_accordion_collapse__9YZG7"
                                 aria-labelledby="heading-:r1b:" style="height: 0px">
                                <div data-testid="accordion_body" class="styles_accordion_body__4vvJA">
                                    <ul><a data-testid="link-component" href="/destinations/south-america/argentina">
                                            <li>Argentina</li>
                                        </a><a data-testid="link-component" href="/destinations/south-america/bolivia">
                                            <li>Bolivia</li>
                                        </a><a data-testid="link-component" href="/destinations/south-america/brazil">
                                            <li>Brazil</li>
                                        </a><a data-testid="link-component" href="/destinations/south-america/chile">
                                            <li>Chile</li>
                                        </a><a data-testid="link-component"
                                               href="/destinations/south-america/colombia">
                                            <li>Colombia</li>
                                        </a><a data-testid="link-component" href="/destinations/south-america/ecuador">
                                            <li>Ecuador</li>
                                        </a><a data-testid="link-component"
                                               href="/travel-styles/active/hiking-trekking/patagonia">
                                            <li>Patagonia</li>
                                        </a><a data-testid="link-component"
                                               href="/destinations/south-america/galapagos">
                                            <li>Galápagos Islands</li>
                                        </a><a data-testid="link-component"
                                               href="/travel-styles/active/hiking-trekking/inca-trail">
                                            <li>Inca Trail</li>
                                        </a><a data-testid="link-component"
                                               href="/destinations/south-america/machu-picchu">
                                            <li>Machu Picchu</li>
                                        </a><a data-testid="link-component" href="/destinations/south-america/peru">
                                            <li>Peru</li>
                                        </a><a data-testid="link-component" href="/destinations/south-america/uruguay">
                                            <li>Uruguay</li>
                                        </a></ul>
                                </div>
                            </div>
                        </div>
                        <div data-testid="accordionItem"
                             class="styles_accordion_item__z982c styles_accordion_item_compact__LN9LC destination-regions">
                            <button id="heading-:r1d:" type="button" class="styles_accordion_toggle__nMAeY"
                                    aria-expanded="false" aria-controls="collapse-:r1d:">
                                <div class="styles_accordion_title__AWtJE">Europe</div>
                                <div class="styles_accordion_collapse_icon__cyx6r">
                                    <div class="icon icon_chevronDown" role="presentation"
                                         style="width: 16px; height: 16px">
                                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="#242239" stroke-width="1.5"
                                                  stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                            <div id="collapse-:r1d:" class="styles_accordion_collapse__9YZG7"
                                 aria-labelledby="heading-:r1d:" style="height: 0px">
                                <div data-testid="accordion_body" class="styles_accordion_body__4vvJA">
                                    <ul>
                                        <li><a data-testid="link-component" href="/destinations/europe/canary-islands">Canary Islands</a></li>
                                        <li><a data-testid="link-component" href="/destinations/europe/croatia">Croatia </a></li>
                                        <li><a data-testid="link-component" href="/destinations/europe/france">France</a></li>
                                        <li><a data-testid="link-component" href="/destinations/europe/germany">Germany</a></li>
                                        <li><a data-testid="link-component" href="/destinations/europe/greece">Greece</a></li>
                                        <li><a data-testid="link-component" href="/destinations/europe/iceland">Iceland</a></li>
                                        <li><a data-testid="link-component" href="/destinations/europe/ireland">Ireland</a></li>
                                        <li><a data-testid="link-component" href="/destinations/europe/italy">Italy</a></li>
                                        <li><a data-testid="link-component" href="/destinations/europe/portugal">Portugal</a></li>
                                        <li><a data-testid="link-component" href="/destinations/europe/spain">Spain</a></li>
                                        <li><a data-testid="link-component" href="/destinations/europe/turkey">Turkey</a></li>
                                        <li><a data-testid="link-component" href="/destinations/europe/united-kingdom">United Kingdom</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div data-testid="accordionItem"
                             class="styles_accordion_item__z982c styles_accordion_item_compact__LN9LC destination-regions">
                            <button id="heading-:r1f:" type="button" class="styles_accordion_toggle__nMAeY"
                                    aria-expanded="false" aria-controls="collapse-:r1f:">
                                <div class="styles_accordion_title__AWtJE">
                                    North Africa &amp; Middle East
                                </div>
                                <div class="styles_accordion_collapse_icon__cyx6r">
                                    <div class="icon icon_chevronDown" role="presentation"
                                         style="width: 16px; height: 16px">
                                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="#242239" stroke-width="1.5"
                                                  stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                            <div id="collapse-:r1f:" class="styles_accordion_collapse__9YZG7"
                                 aria-labelledby="heading-:r1f:" style="height: 0px">
                                <div data-testid="accordion_body" class="styles_accordion_body__4vvJA">
                                    <ul><a data-testid="link-component"
                                           href="/destinations/north-africa-middle-east/egypt">
                                            <li>Egypt</li>
                                        </a><a data-testid="link-component"
                                               href="/destinations/north-africa-middle-east/jordan">
                                            <li>Jordan</li>
                                        </a><a data-testid="link-component"
                                               href="/destinations/north-africa-middle-east/morocco">
                                            <li>Morocco</li>
                                        </a><a data-testid="link-component"
                                               href="/destinations/north-africa-middle-east/oman">
                                            <li>Oman</li>
                                        </a></ul>
                                </div>
                            </div>
                        </div>
                        <div data-testid="accordionItem"
                             class="styles_accordion_item__z982c styles_accordion_item_compact__LN9LC destination-regions">
                            <button id="heading-:r1h:" type="button" class="styles_accordion_toggle__nMAeY"
                                    aria-expanded="false" aria-controls="collapse-:r1h:">
                                <div class="styles_accordion_title__AWtJE">Africa</div>
                                <div class="styles_accordion_collapse_icon__cyx6r">
                                    <div class="icon icon_chevronDown" role="presentation"
                                         style="width: 16px; height: 16px">
                                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="#242239" stroke-width="1.5"
                                                  stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                            <div id="collapse-:r1h:" class="styles_accordion_collapse__9YZG7"
                                 aria-labelledby="heading-:r1h:" style="height: 0px">
                                <div data-testid="accordion_body" class="styles_accordion_body__4vvJA">
                                    <ul><a data-testid="link-component" href="/destinations/africa/botswana">
                                            <li>Botswana</li>
                                        </a><a data-testid="link-component" href="/destinations/africa/kenya">
                                            <li>Kenya</li>
                                        </a><a data-testid="link-component" href="/destinations/africa/madagascar">
                                            <li>Madagascar</li>
                                        </a><a data-testid="link-component" href="/destinations/africa/malawi">
                                            <li>Malawi</li>
                                        </a><a data-testid="link-component" href="/destinations/africa/namibia">
                                            <li>Namibia</li>
                                        </a><a data-testid="link-component" href="/destinations/africa/rwanda">
                                            <li>Rwanda</li>
                                        </a><a data-testid="link-component" href="/destinations/africa/south-africa">
                                            <li>South Africa</li>
                                        </a><a data-testid="link-component" href="/destinations/africa/tanzania">
                                            <li>Tanzania</li>
                                        </a><a data-testid="link-component" href="/destinations/africa/uganda">
                                            <li>Uganda</li>
                                        </a><a data-testid="link-component" href="/destinations/africa/zambia">
                                            <li>Zambia</li>
                                        </a><a data-testid="link-component" href="/destinations/africa/zimbabwe">
                                            <li>Zimbabwe</li>
                                        </a></ul>
                                </div>
                            </div>
                        </div>
                        <div data-testid="accordionItem"
                             class="styles_accordion_item__z982c styles_accordion_item_compact__LN9LC destination-regions">
                            <button id="heading-:r1j:" type="button" class="styles_accordion_toggle__nMAeY"
                                    aria-expanded="false" aria-controls="collapse-:r1j:">
                                <div class="styles_accordion_title__AWtJE">Asia</div>
                                <div class="styles_accordion_collapse_icon__cyx6r">
                                    <div class="icon icon_chevronDown" role="presentation"
                                         style="width: 16px; height: 16px">
                                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="#242239" stroke-width="1.5"
                                                  stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                            <div id="collapse-:r1j:" class="styles_accordion_collapse__9YZG7"
                                 aria-labelledby="heading-:r1j:" style="height: 0px">
                                <div data-testid="accordion_body" class="styles_accordion_body__4vvJA">
                                    <ul><a data-testid="link-component" href="/destinations/asia/bali/">
                                            <li>Bali</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/bhutan">
                                            <li>Bhutan</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/borneo">
                                            <li>Borneo</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/cambodia">
                                            <li>Cambodia</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/china">
                                            <li>China</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/india">
                                            <li>India</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/indonesia">
                                            <li>Indonesia</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/japan">
                                            <li>Japan</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/laos">
                                            <li>Laos</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/maldives">
                                            <li>Maldives</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/malaysia">
                                            <li>Malaysia</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/mongolia">
                                            <li>Mongolia</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/nepal">
                                            <li>Nepal</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/singapore">
                                            <li>Singapore</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/south-korea">
                                            <li>South Korea</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/sri-lanka">
                                            <li>Sri Lanka</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/thailand">
                                            <li>Thailand</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/turkmenistan">
                                            <li>Turkmenistan</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/uzbekistan">
                                            <li>Uzbekistan</li>
                                        </a><a data-testid="link-component" href="/destinations/asia/vietnam">
                                            <li>Vietnam</li>
                                        </a></ul>
                                </div>
                            </div>
                        </div>
                        <div data-testid="accordionItem"
                             class="styles_accordion_item__z982c styles_accordion_item_compact__LN9LC destination-regions">
                            <button id="heading-:r1l:" type="button" class="styles_accordion_toggle__nMAeY"
                                    aria-expanded="false" aria-controls="collapse-:r1l:">
                                <div class="styles_accordion_title__AWtJE">Oceania</div>
                                <div class="styles_accordion_collapse_icon__cyx6r">
                                    <div class="icon icon_chevronDown" role="presentation"
                                         style="width: 16px; height: 16px">
                                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="#242239" stroke-width="1.5"
                                                  stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                            <div id="collapse-:r1l:" class="styles_accordion_collapse__9YZG7"
                                 aria-labelledby="heading-:r1l:" style="height: 0px">
                                <div data-testid="accordion_body" class="styles_accordion_body__4vvJA">
                                    <ul><a data-testid="link-component" href="/destinations/oceania/australia">
                                            <li>Australia</li>
                                        </a><a data-testid="link-component" href="/destinations/oceania/new-zealand">
                                            <li>New Zealand</li>
                                        </a></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div data-testid="Search" style="display: none" class="Modal_modal_overlay__bCKGC">
                <div class="Modal_modal_container__SpUvL DropdownSelect_dropdown-select-modal__95CRV"
                     role="presentation">
                    <div class="Modal_modal_has_text__RVir6 Modal_modal_has_title_text__XzqC8">
                        <div class="TopSection_top_section__9sJj1" role="presentation"><h4></h4></div>
                        <div class="Modal_close_btn__qn_on">
                            <div class="icon icon_close" data-testid="modal-close-icon" role="presentation"
                                 style="width: 16px; height: 16px">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18" stroke="#513394" stroke-width="2" stroke-linecap="round"
                                          stroke-linejoin="round"></path>
                                    <path d="M6 6L18 18" stroke="#504E61" stroke-width="2" stroke-linecap="round"
                                          stroke-linejoin="round"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="Search_search_mobile_container__fiykU">
                        <div><h3 class="Title_title__hJHmB jollof_search_header" id="mobilenavheader">Search</h3>
                            <div class="Search_search_mobile_top_focus__cbNAo">
                                <div class="Search_search_mobile_input_close_button__FqyPl">
                                    <div class="icon icon_arrowLeft " data-testid="arrow-left" role="presentation"
                                         style="width: 16px; height: 16px;">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 12H5" stroke="#504E61" stroke-width="1.5"
                                                  stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M12 19L5 12L12 5" stroke="#504E61" stroke-width="1.5"
                                                  stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="styles_search_input_container__8dcKA" role="search"><a
                                            data-testid="link-component" href="/search/">
                                        <div class="styles_search_input_search_icon__pGrGh styles_search_input_search_icon_left__tascK">
                                            <div class="icon icon_searchGlass" role="presentation"
                                                 style="width: 16px; height: 16px">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                          d="M11.0002 17.6668C14.6821 17.6668 17.6668 14.6821 17.6668 11.0002C17.6668 7.31826 14.6821 4.3335 11.0002 4.3335C7.31826 4.3335 4.3335 7.31826 4.3335 11.0002C4.3335 14.6821 7.31826 17.6668 11.0002 17.6668Z"
                                                          stroke="#513394" stroke-width="2" stroke-linecap="round"
                                                          stroke-linejoin="round"></path>
                                                    <path d="M19.6665 19.667L15.7139 15.7144" stroke="#513394"
                                                          stroke-width="2" stroke-linecap="round"
                                                          stroke-linejoin="round"></path>
                                                </svg>
                                            </div>
                                            <span>Search</span></div>
                                    </a><label for="navSearch" class="styles_search_input_label__s3F3p">Label used just
                                        for aria compliance</label>
                                    <form id="nav_search" method="get" action="/search/" class="hypersearchform "><span
                                                role="status" aria-live="polite"
                                                class="ui-helper-hidden-accessible"></span><input type="search"
                                                                                                  maxlength="128"
                                                                                                  name="q"
                                                                                                  ceid="Navigation Search"
                                                                                                  data-testid="search-input"
                                                                                                  placeholder="Where’s your next adventure?"
                                                                                                  data-source="/search/autocomplete/"
                                                                                                  autocomplete="off"
                                                                                                  class="hypersearch hypersearch-mobile Search_search_mobile_input__Tlp4P ui-autocomplete-input"
                                                                                                  id="navSearch"
                                                                                                  role="searchbox"
                                                                                                  value=""><input
                                                type="hidden" name="ref" value="navsearch"></form>
                                </div>
                            </div>
                        </div>
                        <div style="margin-top: 16px;"><a data-testid="link-component" href="/search/">
                                <button class="styles_button__9Iy0U styles_button_sm__bg1VW styles_button_ghost__cuQN3"
                                        type="button"><p class="ViewAll_viewAll-text__Ksuru">View all tours&nbsp;</p>
                                    <div class="icon icon_arrowForward" role="presentation">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <rect width="16" height="16" rx="8" fill="white"></rect>
                                            <path d="M6 12L10 8L6 4" stroke="#504E61" stroke-width="1.5"
                                                  stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </div>
                                </button>
                            </a></div>
                    </div>
                </div>
            </div>
            <div data-testid="Menu" id="jollof_menu" style="display: none" class="Modal_modal_overlay__bCKGC">
                <div class="Modal_modal_container__SpUvL DropdownSelect_dropdown-select-modal__95CRV"
                     role="presentation">
                    <div class="Modal_modal_has_text__RVir6 Modal_modal_has_title_text__XzqC8">
                        <div class="TopSection_top_section__9sJj1" role="presentation"><h4></h4></div>
                        <div class="Modal_close_btn__qn_on">
                            <div class="icon icon_close" data-testid="modal-close-icon" role="presentation"
                                 style="width: 16px; height: 16px">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18" stroke="#513394" stroke-width="2" stroke-linecap="round"
                                          stroke-linejoin="round"></path>
                                    <path d="M6 6L18 18" stroke="#504E61" stroke-width="2" stroke-linecap="round"
                                          stroke-linejoin="round"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="Menu_menu_container__c_7f1"><h3 class="Title_title__hJHmB" id="mobilenavheader">
                            Menu</h3>
                        <div id="jollof_jump_to_destinations" data-testid="accordionItem"
                             class="styles_accordion_item__z982c styles_accordion_item_compact__LN9LC menu-items">
                            <button id="heading-:r1p:" type="button" class="styles_accordion_toggle__nMAeY"
                                    aria-expanded="false" aria-controls="collapse-:r1p:">
                                <div class="styles_accordion_title__AWtJE">Destinations</div>
                                <div class="styles_accordion_collapse_icon__cyx6r">
                                    <div class="icon icon_chevronDown" role="presentation"
                                         style="width: 16px; height: 16px">
                                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="#242239" stroke-width="1.5"
                                                  stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div data-testid="accordionItem"
                             class="styles_accordion_item__z982c styles_accordion_item_compact__LN9LC menu-items">
                            <button id="heading-:r1t:" type="button" class="styles_accordion_toggle__nMAeY"
                                    aria-expanded="false" aria-controls="collapse-:r1t:">
                                <div class="styles_accordion_title__AWtJE">Why CanadaWay</div>
                                <div class="styles_accordion_collapse_icon__cyx6r">
                                    <div class="icon icon_chevronDown" role="presentation"
                                         style="width: 16px; height: 16px">
                                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="#242239" stroke-width="1.5"
                                                  stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                            <div id="collapse-:r1t:" class="styles_accordion_collapse__9YZG7"
                                 aria-labelledby="heading-:r1t:" style="height: 0px">
                                <div data-testid="accordion_body" class="styles_accordion_body__4vvJA">
                                    <ul>
                                        <li><a data-testid="link-component"
                                               href="/about-us/why-travel-with-canadaway/">Why Choose us</a></li>
                                        <li><a data-testid="link-component" href="/about-us/responsible-travel/">G for
                                                Good</a></li>
                                        <li><a data-testid="link-component"
                                               href="https://planeterra.org/">Planeterra</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div data-testid="accordionItem"
                             class="styles_accordion_item__z982c styles_accordion_item_compact__LN9LC menu-items">
                            <button id="heading-:r21:" type="button" class="styles_accordion_toggle__nMAeY"
                                    aria-expanded="false" aria-controls="collapse-:r21:">
                                <div class="styles_accordion_title__AWtJE">Contact Us</div>
                                <div class="styles_accordion_collapse_icon__cyx6r">
                                    <div class="icon icon_chevronDown" role="presentation"
                                         style="width: 16px; height: 16px">
                                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="#242239" stroke-width="1.5"
                                                  stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                            <div id="collapse-:r21:" class="styles_accordion_collapse__9YZG7"
                                 aria-labelledby="heading-:r21:" style="height: 0px">
                                <div data-testid="accordion_body" class="styles_accordion_body__4vvJA">
                                    <ul>
                                        <li><a data-testid="link-component" href="/contact-us/">Call, chat or email
                                                us</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div data-testid="accordionItem"
                             class="styles_accordion_item__z982c styles_accordion_item_compact__LN9LC menu-items">
                            <button id="heading-:r21:" type="button" class="styles_accordion_toggle__nMAeY"
                                    aria-expanded="false" aria-controls="collapse-:r21:">
                                <div class="styles_accordion_title__AWtJE">Work with us</div>
                                <div class="styles_accordion_collapse_icon__cyx6r">
                                    <div class="icon icon_chevronDown" role="presentation"
                                         style="width: 16px; height: 16px">
                                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="#242239" stroke-width="1.5"
                                                  stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                            <div id="collapse-:r21:" class="styles_accordion_collapse__9YZG7"
                                 aria-labelledby="heading-:r21:" style="height: 0px">
                                <div data-testid="accordion_body" class="styles_accordion_body__4vvJA">
                                    <ul>
                                        <li><a data-testid="link-component" href="/work/">Work with us</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    </header>

    <main role="main">
        <div class="pt-4 pb-5">
            <?= Breadcrumbs::widget([
                'homeLink' => false,
                'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
            ]) ?>
            <?= Alert::widget() ?>
            <?= $content ?>
        </div>
    </main>

    <footer class="styles_footer__EFoWO">
        <div class="styles_container__58Mr5">
            <div class="styles_col-4__UpNem col-tablet-2 col-desktop-2">
                <div class="styles_links_tablet__YzBVB">
                    <p class="styles_links_title__Xi82e">CanadaWay</p>
                    <ul class="styles_links__Qprg4">
                        <li><a data-testid="link-component" href="/about-us/">About us</a></li>
                        <li><a data-testid="link-component" href="/about-us/lgbtq-travel/">LGBTQ+ inclusivity</a></li>
                        <li><a data-testid="link-component" href="/careers/">Careers</a></li>

                    </ul>
                </div>
                <div class="styles_links_mobile__v_Dus">
                    <div data-testid="accordionItem"
                         class="styles_accordion_item__z982c styles_accordion_item_compact__LN9LC undefined">
                        <button id="heading-:R11sm:" type="button" class="styles_accordion_toggle__nMAeY"
                                aria-expanded="false" aria-controls="collapse-:R11sm:">
                            <div class="styles_accordion_title__AWtJE">CanadaWay</div>
                            <div class="styles_accordion_collapse_icon__cyx6r">
                                <div class="icon icon_chevronDown" style="width: 16px; height: 16px;"
                                     role="presentation">
                                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 6L8 10L12 6" stroke="#242239" stroke-width="1.5"
                                              stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </div>
                            </div>
                        </button>
                        <div id="collapse-:R11sm:" class="styles_accordion_collapse__9YZG7" style="height: 0;"
                             aria-labelledby="heading-:R11sm:">
                            <div data-testid="accordion_body" class="styles_accordion_body__4vvJA">
                                <ul class="styles_links__Qprg4">
                                    <li><a data-testid="link-component" href="/about-us/">About us</a></li>
                                    <li><a data-testid="link-component" href="/about-us/lgbtq-travel/">LGBTQ+ inclusivity</a></li>
                                    <li><a data-testid="link-component" href="/careers/">Careers</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="styles_col-4__UpNem col-tablet-2 col-desktop-2">
                <div class="styles_links_tablet__YzBVB">
                    <p class="styles_links_title__Xi82e">Support</p>
                    <ul class="styles_links__Qprg4">
                        <li><a data-testid="link-component" href="/contact-us/">Contact us</a></li>
                    </ul>
                </div>
                <div class="styles_links_mobile__v_Dus">
                    <div data-testid="accordionItem"
                         class="styles_accordion_item__z982c styles_accordion_item_compact__LN9LC undefined">
                        <button id="heading-:R12sm:" type="button" class="styles_accordion_toggle__nMAeY"
                                aria-expanded="false" aria-controls="collapse-:R12sm:">
                            <div class="styles_accordion_title__AWtJE">Support</div>
                            <div class="styles_accordion_collapse_icon__cyx6r">
                                <div class="icon icon_chevronDown" style="width: 16px; height: 16px;"
                                     role="presentation">
                                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 6L8 10L12 6" stroke="#242239" stroke-width="1.5"
                                              stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </div>
                            </div>
                        </button>
                        <div id="collapse-:R12sm:" class="styles_accordion_collapse__9YZG7" style="height: 0;"
                             aria-labelledby="heading-:R12sm:">
                            <div data-testid="accordion_body" class="styles_accordion_body__4vvJA">
                                <ul class="styles_links__Qprg4">
                                    <li><a data-testid="link-component" href="/contact-us/">Contact us</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="styles_col-4__UpNem col-tablet-2 col-desktop-2">
                <div class="styles_links_tablet__YzBVB">
                    <p class="styles_links_title__Xi82e">Work with us</p>
                    <ul class="styles_links__Qprg4">
                        <li><a data-testid="link-component" href="/work/">Work with us</a></li>
                    </ul>
                </div>
                <div class="styles_links_mobile__v_Dus">
                    <div data-testid="accordionItem"
                         class="styles_accordion_item__z982c styles_accordion_item_compact__LN9LC undefined">
                        <button id="heading-:R12sm:" type="button" class="styles_accordion_toggle__nMAeY"
                                aria-expanded="false" aria-controls="collapse-:R12sm:">
                            <div class="styles_accordion_title__AWtJE">Work with us</div>
                            <div class="styles_accordion_collapse_icon__cyx6r">
                                <div class="icon icon_chevronDown" style="width: 16px; height: 16px;"
                                     role="presentation">
                                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 6L8 10L12 6" stroke="#242239" stroke-width="1.5"
                                              stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </div>
                            </div>
                        </button>
                        <div id="collapse-:R12sm:" class="styles_accordion_collapse__9YZG7" style="height: 0;"
                             aria-labelledby="heading-:R12sm:">
                            <div data-testid="accordion_body" class="styles_accordion_body__4vvJA">
                                <ul class="styles_links__Qprg4">
                                    <li><a data-testid="link-component" href="/work/">Work with us</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="styles_col-4__UpNem col-tablet-8 col-desktop-4">
                <div class="styles_social__Gft7c">
                    <p class="styles_links_title__Xi82e">CANADAWAY NATION</p>
                </div>
            </div>


            <div class="styles_divider__KzmyH styles_col-4__UpNem col-tablet-5 col-desktop-12"></div>
            <div class="styles_col-4__UpNem col-tablet-8 col-desktop-4">
                <div class="styles_copyright__WhwLF">

                    © <?= date('Y') ?> CanadaWay. All rights reserved.
                </div>
            </div>
            <div class="styles_legal__hNG_p styles_col-4__UpNem col-tablet-8 col-desktop-8">
                <ul class="styles_legal__hNG_p">
                    <li>Terms and Conditions</li>
                    <li>Privacy Policy</li>
                    <li>Manage Cookies</li>
                    <li>API</li>
                </ul>
            </div>
        </div>
    </footer>

    <?php $this->endBody() ?>
    </body>
    </html>
<?php $this->endPage() ?>