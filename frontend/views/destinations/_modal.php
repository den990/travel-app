<?php
/* @var $this View */
/* @var $tourName string */
/* @var $tourPrice integer */

use yii\web\View;

$tourNameJson = \yii\helpers\Json::encode($tourName);
$tourPriceJson = \yii\helpers\Json::encode($tourPrice);
$js = <<<JS
$(document).ready(function () {
    const tourName = '$tourNameJson';
    const tourPrice = '$tourPriceJson';
    $('#bookModal form').on('submit', function (e) {
        e.preventDefault(); 

        const formData = {
            first_name: $('#id_first_name').val(),
            last_name: $('#id_last_name').val(),
            email: $('#id_email').val(),
            phone: $('#id_phone_number').val(),
            tour_name: tourName,
            tour_price: tourPrice,
        };

        $.ajax({
            url: '/site/send-mail',
            type: 'POST',
            data: formData,
            success: function (res) {
                alert('Application sent!');
                $('#bookModal').modal('hide'); 
                $('#bookModal form')[0].reset(); 
            },
            error: function (xhr) {
                alert('There was an error sending.');
                console.error(xhr.responseText);
            }
        });
    });
});
JS;
$this->registerJs($js);
?>

<div class="modal fade mt-5 mt-md-0" style="" id="bookModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div id="contact-form" class='span7'>
                <button type="button" class="btn-close" id="close-book-modal" aria-label="Close"></button>
                <form class="form-horizontal" method="post">
                    <fieldset>
                        <div id="div_id_first_name" class="control-group">
                            <label for="id_first_name" class="control-label requiredField">
                                First Name<span class="asteriskField">*</span>
                            </label>
                            <div class="controls">
                                <input type="text" name="first_name" class="textinput textInput" required
                                       id="id_first_name">
                            </div>
                        </div>
                        <div id="div_id_last_name" class="control-group">
                            <label for="id_last_name" class="control-label requiredField">
                                Last Name<span class="asteriskField">*</span>
                            </label>
                            <div class="controls">
                                <input type="text" name="last_name" class="textinput textInput" required
                                       id="id_last_name">
                            </div>
                        </div>
                        <div id="div_id_email" class="control-group">
                            <label for="id_email" class="control-label requiredField">
                                E-mail<span class="asteriskField">*</span>
                            </label>
                            <div class="controls">
                                <input type="email" name="email" maxlength="100" class="emailinput" required
                                       id="id_email">
                            </div>
                        </div>
                        <div id="div_id_phone_number" class="control-group">
                            <label for="id_phone_number" class="control-label ">Phone Number
                            </label>
                            <div class="controls">
                                <input type="text" name="phone_number" class="textinput textInput" id="id_phone_number">
                            </div>
                        </div>


                    </fieldset>
                    <div class="form-actions">
                        <input type="submit" name="submit" value="Contact Us" class="btn btn-primary"
                               id="submit-id-submit"/>
                        <p>Our dedicated team of GCOs will be in touch as soon as possible. If you are leaving on your
                            trip within the next 14 days, please get in touch via phone or live chat.</p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<style>
    div#contact-reservations {
        display: none!important;
    }

    /*div#contact-form.span7 {
width: 100%;
}*/
    legend + .control-group {
        margin-top: 0!important;
    }

    .form-horizontal .controls {
        margin-left: 0px!important;
    }

    .form-horizontal .control-group {
        margin-bottom: 0!important;
    }

    fieldset {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 24px;
        grid-row-gap: 20px;
    }

    #div_id_first_name {
        grid-area: 1 / 1 / 2 / 2;
    }

    #div_id_last_name {
        grid-area: 1 / 2 / 2 / 3;
    }

    #div_id_email {
        grid-area: 2 / 1 / 3 / 2;
    }

    #div_id_phone_number {
        grid-area: 2 / 2 / 3 / 3;
    }

    #div_id_country {
        grid-area: 3 / 1 / 4 / 2;
    }

    #div_id_province {
        grid-area: 3 / 2 / 4 / 3;
    }

    #div_id_contact_type {
        grid-area: 4 / 1 / 5 / 2;
    }

    #div_id_booking {
        grid-area: 4 / 2 / 5 / 3;
    }

    #div_id_topic {
        grid-area: 5 / 1 / 6 / 3;
    }

    #div_id_comments {
        grid-area: 6 / 1 / 7 / 3;
    }

    .form-horizontal .control-label {
        float: none!important;
        width: auto!important;
        padding-top: 0!important;
        text-align: left!important;
        font-size: 12px!important;
    }

    .controls input, .controls select {
        width: 100%!important;
    }

    .form-horizontal input + .help-block, .form-horizontal select + .help-block, .form-horizontal textarea + .help-block, .form-horizontal .uneditable-input + .help-block, .form-horizontal .input-prepend + .help-block, .form-horizontal .input-append + .help-block {
        margin-top: 5px!important;
        margin-bottom: 0!important;
        font-size: 12px!important;
    }

    select, input[type="file"] {
        line-height: 28px!important;
    }

    .controls select {
        border-radius: 8px;
        padding: 10px!important;
        height: 48px!important;
        box-sizing: border-box;
        background: url("/images/25fa21a52eb8a__chevron-down.png") no-repeat 96% 50%;
        appearance: none;
        background-color: #fff;
    }

    .controls input {
        border-radius: 8px!important;
        padding: 12px!important;
        height: 48px!important;
        box-sizing: border-box;
    }

    textarea#id_comments {
        border-radius: 8px;
        width: 100%;
        box-sizing: border-box;
    }

    .form-horizontal .form-actions {
        padding-left: 0!important;
        background: none;
        border: none;
    }

    .row:before, .row:after {
        display: none!important;
    }

    /*.container.contact-us {
width: 100%;
}
*/
    .container.contact-us .row {
        display: grid;
        grid-template-columns: 66.66% 33.34%;
        width: 100%;
        margin: 60px auto 0;
        grid-gap: 24px;
        position: relative;
    }

    div#contact-form.span7 {
        float: none!important;
        width: 100%!important;
        margin: 0!important;
        background: #F6F6FA;
        padding: 30px;
        box-sizing: border-box;
        border-radius: 16px;
    }

    div#contact-form.span7 h2 {
        font-size: 24px;
        margin: 0 0 30px 0;
    }

    .container.contact-us .row .span5 {
        width: 100%!important;
        margin: 0!important;
        position: relative;
        z-index: -999;
        background-size: cover;
        background-position: center center;
        border-radius: 16px;
        background-image: url("/images/CostaRicaLaFortunaWaterRapelling.jpg");
    }

    input:focus:invalid:focus, textarea:focus:invalid:focus, select:focus:invalid:focus {
        border: 1px solid #AF9FEB!important;
        box-sizing: border-box;
        box-shadow: 0px 0px 0px 2px #ebeaff!important;
    }

    .form-actions {
        padding: 0 20px 0!important;
        margin-top: 60px!important;
        margin-bottom: 0!important;
    }

    .form-actions #submit-id-submit {
        position: relative;
        background-image: none;
        text-align: center;
        font-family: "DM Sans", sans-serif;
        font-weight: bold;
        font-style: normal;
        font-size: 0.875rem;
        line-height: 1.5rem;
        letter-spacing: inherit;
        padding: 0.5rem 1rem;
        border-radius: 0.75rem;
        text-decoration: none;
        outline: none;
        color: rgb(255, 255, 255);
        background-color: rgb(81, 51, 148);
        margin-bottom: 12px;
    }

    .form-actions #submit-id-submit:hover {
        box-shadow: rgb(36 34 57 / 22%) 0px 0.125rem 1.5rem;
    }
    }

    .form-actions #submit-id-submit:active {
        background-color: rgb(33, 10, 83);
    }

    .form-actions #submit-id-submit:focus::before {
        content: "";
        pointer-events: none;
        position: absolute;
        box-sizing: content-box;
        inset: -0.25rem;
        border: 0.0625rem solid rgb(218, 217, 255);
        border-radius: 1rem;
    }

    .hero.container {
        margin-right: 0px!important;
        margin-left: 40px!important;
        width: unset!important;
    }

    @media only screen and (max-width: 1199px) {
        .container {
            max-width:1170px!important;
            width: unset!important;
            margin-right: auto!important;
            margin-left: 40px!important;
        }
    }

    @media only screen and (max-width: 1079px) {
        .container.contact-us .row .span5 {
            inset: 0px 0px 0px calc((100% - 120rem) / 2 + 48.75rem)!important;
        }
    }

    @media only screen and (max-width: 979px) {
        .container.contact-us, .last.container {
            margin-right: 24px!important;
            margin-left: 24px!important;
        }

        .container.contact-us .row {
            width: 100%;
            grid-template-columns: 100%;
        }

        .contents {
            grid-template-columns: repeat(2, 1fr)!important;
        }

        .container.contact-us .row .span5 {
            display: none!important;
        }
    }

    @media only screen and (max-width: 768px) {
        .container, .hero.container, .container.contact-us, .last.container {
            margin-right: 15px!important;
            margin-left: 15px!important;
        }

        .hoo p {
            grid-column: 1 / 10!important;
        }

        .container.contact-us .row {
            width: auto;
            display: flex;
            flex-direction: column;
            margin: 0px auto;
        }

        fieldset {
            display: grid!important;
        }

        .controls input, .controls select {
            width: 100%!important;
        }
    }

    @media only screen and (max-width: 640px) {
        .hero-left-side {
            margin: 60px auto;
        }

        .container.contact-us {
            margin-right: 0px!important;
            margin-left: 0px!important;
        }

        div#contact-form.span7 {
            padding: 30px 15px;
        }

        fieldset {
            display: block!important;
            padding-left: 0!important;
        }

        .controls input, .controls select {
            width: 100%!important;
        }
    }

    div#leadercontent-15063 {
        margin-top: 0;
    }

    div#breadcrumbs {
        display: none;
    }
</style>