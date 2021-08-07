/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

(function () {
    // 屏幕自适应
    var lang = "{# LANG #}";
    $(".btn-language").find("span").text(lang == "en" ? "English" : "Español");
    getParam("classic") ? $(".bg-box").addClass("version2") : $(".bg-box").removeClass("version2")

    var adaptViewport = (function () {
        function detectIE() {
            var ua = window.navigator.userAgent;
            var msie = ua.match(/MSIE (\d+)/g);
            if (msie != null) {
                return parseInt(msie[0].match(/\d+/g)[0]);
            }
            return false;
        }
        var minWidth = 1200; // 最小宽度
        var designWidth = 1920; // 设计稿宽度
        var isFirefox = navigator.userAgent.indexOf("Firefox") != -1
        var ieVersion = detectIE();
        var zoom = 1;

        function resize() {
            // doc.clientWidth不包含滚动栏宽度
            var ww = document.documentElement.clientWidth || window.innerWidth;
            var realWid = Math.max(ww, minWidth);
            zoom = realWid / designWidth;
            if (ieVersion && ieVersion < 9) {
                return;
            }
            if (zoom !== 1) {
                if (!$('.wrap').parent().hasClass('wrap-scale')) {
                    $('.wrap').wrap('<div class="wrap-scale"></div>')
                    $('.wrap-scale').css('position', 'relative');
                    $('.wrap').data('originHeight', $('.wrap').outerHeight())
                }
                var transformOrigin = '0% 0%';
                $('.wrap').css({
                    'width': designWidth,
                    'transform': 'scale(' + zoom + ')',
                    'transform-origin': transformOrigin,
                    'margin-left': 0
                })
                $('.wrap-scale').css({
                    'width': (realWid > minWidth ? 'auto' : minWidth),
                    'height': $('.wrap').data('originHeight') * zoom,
                    'overflow': 'hidden'
                })
            }
        }
        resize();
        window.onresize = resize;
        // 当切换tab等情形导致.wrap高度改变时，调用此函数。
        function resizeWrapScale() {
            $('.wrap-scale').css({
                'height': $('.wrap').outerHeight() * zoom
            })
        }
        return {
            resizeWrapScale: resizeWrapScale
        }
    })();
    // 固定使用的对象/变量

    // 固定绑定的页面事件

    // 封装好的方法

    //滚动条方法
    function scrolllBar(scroll, scorll_bar, scorll_black) {
        new CusScrollBar({
            contentSelector: scroll, //滚动内容区
            barSelector: scorll_bar, //滚动条
            sliderSelector: scorll_black //滚动滑块
        });
    }

    //控制滚动条滚动位置
    function scrollZero(num) {
        $(".question-in").animate({
            "scrollTop": num
        });
    }

    //打开弹窗方法
    function openDia(e) { //变量e代表弹窗的ID
        $(".dialog").show();
        $("#" + e).fadeIn();
    }

    //弹窗关闭方法
    function closeDia(e) { //变量e代表当前关闭的按钮
        $(".dialog").hide();
        e.parents(".dia").fadeOut();
    }

    // 页面启动的代码

    //关闭弹窗执行
    $(".dia_close").click(function () {
        closeDia($(this));
    });

    //展开更多语言
    $(".btn-language").hover(function () {
        $(".language-list").fadeIn();
    }, function () {
        $(".language-list").fadeOut();
    });

    //执行滚动条方法
    scrolllBar('#qst_scorll1', '#qst_scorll_bar1', '#qst_scorll_black1');

    //控制滚动条滚动位置执行
    // $(".btn-signup2").click(function () {
    // 	scrollZero("100px");
    // 	// openDia('dia1');
    // });
    $(".language-list li").click(function () {
        var langs = $(this).attr("class");
        var search1 = window.location.search
        if (search1) {
            window.location.href = '/' + langs + '/event/cbt/' + search1
        } else {
            window.location.href = '/' + langs + '/event/cbt/';
        }
        // window.location.href = '/' + langs + '/event/cbt/';
    });


    $(".footer_facebook").click(function () {
        lang == "en" ? window.open("https://www.facebook.com/ContraReturnsOfficial/") : window.open("https://www.facebook.com/ContraReturnslatam-104473988292856")
    })
    //选中按钮参考(仅供页面显示用,开发同学可以去掉)
    // $(".qst-list li").click(function () {
    // 	$(this).addClass('on').siblings().removeClass('on');
    // 	$(this).parent().siblings('.qst-tip').show();
    // });
    var age, contra, mobile, mobileNum = [], iphone = "ios", email, ageSub, emailSub, confirm, confirmTer;
    $(".ageWrap li").click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        $(this).attr('attr_text') == 'Under19' ? age = 'Under19' : age = '19above'
        if (age == 'Under19') {
            $(".Under19").show().siblings(".qst-tip").hide()
            ageSub = false
        } else {
            $(".Under19").hide().siblings(".qst-tip").hide()
            ageSub = true
        }
        btnLight()
    });
    $(".contraWrap li").click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        contra = $(this).attr('attr_text')
        $(this).parent().siblings('.qst-tip').hide()
        btnLight()
    });

    $(".mobileWrap").on("click", "li", function () {
        if ($(this).hasClass("on")) {
            $(this).removeClass("on")
            mobileNum.splice(mobileNum.indexOf($(this).attr("attr_text")), 1)
            if ($(".mobileWrap li.on").length > 0) {
                $(this).parent().siblings('.qst-tip').hide()
                mobile = true
            } else {
                $(this).parent().siblings('.qst-tip').show()
                mobile = false
            }
        } else {
            if ($(this).attr("attr_text") == 4) {
                mobileNum.length = 0
                mobileNum.push($(this).attr("attr_text"))
                $(this).addClass("on").siblings("li").removeClass("on")
                $(this).parent().siblings('.qst-tip').hide()
                mobile = true
            } else {
                if ($(".none").hasClass("on")) {
                    $(this).addClass("on")
                    $(".none").removeClass("on")
                    mobileNum.splice(mobileNum.indexOf(4, 1))
                    mobileNum.push($(this).attr("attr_text"))
                    mobileNum.sort()
                    if ($(".mobileWrap li.on").length > 0) {
                        $(this).parent().siblings('.qst-tip').hide()
                        mobile = true
                    } else {
                        $(this).parent().siblings('.qst-tip').show()
                        mobile = false
                    }
                } else {
                    $(this).addClass("on")
                    mobileNum.push($(this).attr("attr_text"))
                    mobileNum.sort()
                    if ($(".mobileWrap li.on").length > 0) {
                        $(this).parent().siblings('.qst-tip').hide()
                        mobile = true
                    } else {
                        $(this).parent().siblings('.qst-tip').show()
                        mobile = false
                    }
                }
            }

        }
        btnLight()
    })

    $(".iosEnter").show()
    $(".iphone li").click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        iphone = $(this).attr('attr_text')
        email = $("#email").val()
        if (!email) {
            iphone == "ios" ? $(".iosEnter").show().siblings('.qst-tip').hide() : $(".andEnter").show().siblings('.qst-tip').hide()
        } else {
            emailEnter()
        }
        btnLight()
    });
    $(".confirm i").click(function () {
        $(this).parent().addClass('on')
        if ($(".confirm").hasClass("on")) {
            confirm = true
        } else {
            confirm = false
        }
        if (confirm && confirmTer) {
            $(".confirmWrap").siblings('.qst-tip').hide()
        }
        btnLight()
    });
    $(".confirmTer i").click(function () {
        $(this).parent().addClass('on')
        if ($(".confirmTer").hasClass("on")) {
            confirmTer = true
        } else {
            confirmTer = false
        }
        if (confirm && confirmTer) {
            $(".confirmWrap").siblings('.qst-tip').hide()
        }
        btnLight()
    });

    $("#email").on("input", function () {

        emailEnter()
        btnLight()
    })


    function emailEnter() {
        var reg = /^([A-Za-z0-9_\-\])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
        email = $("#email").val()

        if (iphone == "ios") {
            if (email) {
                if (!reg.test(email)) {
                    $(".iosOffer").show().siblings('.qst-tip').hide()
                    emailSub = false
                } else {
                    $(".iosOffer").hide().siblings('.qst-tip').hide()

                    emailSub = true
                }
            } else {
                $(".iosEnter").show().siblings('.qst-tip').hide()
                emailSub = false
            }

        } else {
            if (email) {
                if (reg.test(email) && email.endWith("@gmail.com")) {
                    $(".andOffer").hide().siblings('.qst-tip').hide()
                    emailSub = true
                } else {
                    $(".andOffer").show().siblings('.qst-tip').hide()
                    emailSub = false
                }
            } else {
                $(".andEnter").show().siblings('.qst-tip').hide()
                emailSub = false
            }

        }
    }



    $(".btn-signup2").click(function () {
        if (ageSub && emailSub && confirm && mobile && contra && confirmTer) {
            submit()
        } else {
            if (!age) {
                scrollZero("100");
                $(".agenot").show()
            }
            if (!ageSub && age) {
                if ($(".question-in").is(":animated")) { null } else { scrollZero("100") }
                openDia('dia1');
                $("#dia1").find(".suc").hide().end().find(".fail").show()
                $(".Under19").show()
                dataLayer.push({ 'event': 'Under19', 'event_label': 'Under19' }); fbq('trackCustom', 'Under19', { label: 'Under19' })
            }
            if (!contra) {
                if ($(".question-in").is(":animated")) { null } else { scrollZero("350") }
                $(".contraWrap").siblings('.qst-tip').show()
            }
            if (!mobile) {
                if ($(".question-in").is(":animated")) { null } else { scrollZero("650") }
                $(".mobileWrap").siblings('.qst-tip').show()
            }
            if (!emailSub) {
                if ($(".question-in").is(":animated")) { null } else { scrollZero("1200") }
                iphone == "ios" ? $(".iosOffer").show().siblings().hide() : $(".andOffer").show().siblings().hide()
            }
            if (!confirm) {
                if ($(".question-in").is(":animated")) { null } else { scrollZero("1400") }
                $(".confirmWrap").siblings('.qst-tip').show()
            }
            if (!confirmTer) {
                if ($(".question-in").is(":animated")) { null } else { scrollZero("1400") }
                $(".confirmWrap").siblings('.qst-tip').show()
            }
        }
    });
    function submit() {
        var apply_data = JSON.stringify({ age: age, contra: contra, iphone: iphone, language: lang, mobile: mobileNum })
        var sigkey = "458453cc47797b27a6fec1a735d3c344"
        var subTime = new Date().getTime()
        var dataPost = JSON.stringify({ apply_data: apply_data, email: email })
        var sig = md5("/v1/official/apply" + "?" + "gameid=28018&source=18&ts=" + subTime + "&typeid=1"
            + dataPost + sigkey)
        $.ajax({
            type: 'post',
            url: 'https://us-vas.intlgame.com/v1/official/apply?gameid=28018&source=18&ts=' + subTime + '&typeid=1&sig=' + sig,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: dataPost,
            success: function (data) {
                if (data.ret == 0) {
                    openDia('dia1');
                    $("#dia1").find(".fail").hide().end().find(".suc").show()
                    dataLayer.push({ 'event': 'submit', 'event_label': 'success' }); fbq('trackCustom', 'submit', { label: 'success' })
                } else if (data.ret == 10030203) {
                    scrollZero("1200")
                    $(".emailAlready").show()
                    $(".btn-signup").removeClass("open")
                    dataLayer.push({ 'event': 'email_err', 'event_label': 'emailAlready' }); fbq('trackCustom', 'email_err', { label: 'emailAlready' })
                } else {
                    alert("Submission Failed")
                    dataLayer.push({ 'event': 'err', 'event_label': 'systemErr' }); fbq('trackCustom', 'err', { label: 'systemErr' })
                }
            },
            error: function (err) {
                // console.log(err)
            }
        })


    }

    function btnLight() {
        if (ageSub && emailSub && confirm && mobile && contra && confirmTer) {
            $(".btn-signup").addClass("open")
        } else {
            $(".btn-signup").removeClass("open")
        }
    }


    function getParam(para) {
        var paraArr = location.search.substring(1).split('&');
        for (var i = 0; i < paraArr.length; i++) {
            if (para == paraArr[i].split('=')[0]) {
                return paraArr[i].split('=')[1];
            }
        }
        return '';
    }
    String.prototype.endWith = function (str) {
        var reg = new RegExp(str + "$");
        return reg.test(this);
    }

})();