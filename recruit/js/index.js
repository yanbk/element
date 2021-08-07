$(function() {
    var genres = []
    
    $('.submit').click(function() {
        var otherCountry = $('.otherCountry').val();
        var otherGenres = $('.otherGenres').val();
        var otherShooter = $('.otherShooter').val();

        var age = $('.selectAge input[name="age"]:checked').val();
        console.log(age)

        $.each($('input:checkbox:checked'),function(){
            genres.push($(this).val())
        });
        console.log(genres)

        var shooter = $('.shooter input[name="shooter"]:checked').val();
        console.log(shooter)

        var steam = $('.steam input[name="steam"]:checked').val();
        console.log(steam)

        var testClient = $('.testClient input[name="testClient"]:checked').val();
        console.log(testClient)

        var value1 = $('input[name="value1"]:checked').val();
        console.log(value1)

        var value2 = $('input[name="value2"]:checked').val();
        console.log(value2)

        var value3 = $('input[name="value3"]:checked').val();
        console.log(value3)
    })

    $('input[name="value1"]').click(function() {
        var $radio = $(this);
        radioSwitch($radio)
    })
    $('input[name="value2"]').click(function() {
        var $radio = $(this);
        radioSwitch($radio)
    })
    $('input[name="value3"]').click(function() {
        var $radio = $(this);
        radioSwitch($radio)
    })

    function radioSwitch($radio) {
        if ($radio.data('checked')){
            $radio.prop('checked', false);
            $radio.data('checked', false);
        } else {
            $radio.prop('checked', true);
            $radio.data('checked', true);
        }
    }
})