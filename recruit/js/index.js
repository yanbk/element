$(function() {
    var genres = []
    var mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    var email, age, country, genres = [], shooter, steam, testClient, terms = []

    $('#email').on('blur', function() {
        email = $('#email').val();
        if (!mailReg.test(email)) {
            $('.email-tip').show()
        } else {
            $('.email-tip').hide()
        }
    })

    $('.selectAge input[name="age"]').on('change', function(e) {
        age = $('.selectAge input[name="age"]:checked').val();
        console.log(age)
    })

    $('.selectCountry input[name="country"]').on('change', function(e) {
        country = $('.selectCountry input[name="country"]:checked').val();
        console.log(country)
    })
    $('.otherCountry').on('blur', function() {
        if (country == 'others') {
            country = $('.otherCountry').val();
        }
        console.log(country)
    })

    $('.genres input[type="checkbox"]').on('change', function(e) {
        genres = []
        $.each($('.genres input[type="checkbox"]:checkbox:checked'),function(){
            genres.push($(this).val())
        });
        if (genres.length > 3) {
            $('input[name="' + genres[0] + '"]').prop('checked', false)
            genres.splice(0, 1)
        }
        console.log(genres)
    })
    $('.otherGenres').on('blur', function() {
        var otherGenre = $('.otherGenres').val();
        if (otherGenre != '') {
            genres.push(otherGenre)
        }
        console.log(genres)
    })

    $('.shooter input[name="shooter"]').on('change', function(e) {
        shooter = $('.shooter input[name="shooter"]:checked').val();
        console.log(shooter)
    })
    $('.otherShooter').on('blur', function() {
        if (shooter == 'others') {
            shooter = $('.otherShooter').val();
        }
        console.log(shooter)
    })

    $('.steam input[name="steam"]').on('change', function(e) {
        steam = $('.steam input[name="steam"]:checked').val();
        console.log(steam)
    })

    $('.testClient input[name="testClient"]').on('change', function(e) {
        testClient = $('.testClient input[name="testClient"]:checked').val();
        console.log(testClient)
    })

    $('input[name="terms"]').on('change', function(e) {
        terms = []
        $.each($('input[name="terms"]:checkbox:checked'),function(){
            terms.push($(this).val())
        });
        if (terms.length == 3) {
            $('.terms-tip').hide()
        }
        console.log(terms)
    })
    
    $('.submit').click(function() {
        if (!email) {
            $('.email-tip').show()
            $('.submit-tip').show()
        }
        if (terms.length < 3) {
            $('.terms-tip').show()
            $('.submit-tip').show()
            return;
        }

        if (
            !age ||
            !country || country == '' || country == 'others' ||
            genres.length == 0 ||
            !shooter || shooter == '' || shooter == 'others' ||
            !steam ||
            !testClient
        ) {
            $('.submit-tip').show()
            return;
        }


        $('.submit-tip').hide()

        console.log(email, age, country, genres, shooter, steam, testClient, terms)

        // $.ajax()
        setTimeout(function() {
            // window.location.href = "/case/2020/recruit/result.shtml"
        }, 2000)
        
    })

    // $('.selectCountry input[name="country"]').click(function() {
    //     var $radio = $(this);
    //     if ($radio.data('checked')){
    //         $radio.prop('checked', false);
    //         $radio.data('checked', false);
    //         $('.otherCountry').prop('disabled', false)
    //         country = ''
    //     } else {
    //         $radio.prop('checked', true);
    //         $radio.data('checked', true);
    //     }
    // })
    // $('.shooter input[name="shooter"]').click(function() {
    //     var $radio = $(this);
    //     if ($radio.data('checked')){
    //         $radio.prop('checked', false);
    //         $radio.data('checked', false);
    //         $('.otherShooter').prop('disabled', false)
    //         shooter = ''
    //     } else {
    //         $radio.prop('checked', true);
    //         $radio.data('checked', true);
    //     }
    // })

})