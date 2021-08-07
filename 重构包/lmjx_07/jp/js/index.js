// 屏幕自适应
var zoomChange = 1;
var adaptViewport = (function() {
    function detectIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.match(/MSIE (\d+)/g);
        if (msie != null) {
            return parseInt(msie[0].match(/\d+/g)[0]);
        }
        // IE 11
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        return false;
    }
    var minWidth = 800; // 最小宽度
    var designWidth = 1920; // 设计稿宽度
    var isFirefox = navigator.userAgent.indexOf("Firefox") != -1
    var ieVersion = detectIE();
    var zoom = 1;

    function resize() {
        // doc.clientWidth不包含滚动栏宽度
        var ww = document.documentElement.clientWidth || window.innerWidth;
        var realWid = Math.max(ww, minWidth);
        zoom = realWid / designWidth;
        zoomChange = zoom;
        if (ieVersion && ieVersion < 9) {
            return;
        }
        // firefox不支持zoom. ie9,10,11 zoom表现奇怪
        if (isFirefox || ieVersion >= 9) {
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
                $('.pop').css({
                    'transform': 'scale(' + zoom + ')',
                    'transform-origin': transformOrigin,
                })
                $('.wrap-scale').css({
                    'width': (realWid > minWidth ? 'auto' : minWidth),
                    'height': $('.wrap').data('originHeight') * zoom,
                    'overflow': 'hidden'
                })
            }
        } else {
            $('.wrap').css({
                'width': designWidth,
                'zoom': zoom
            });
            $('.pop').css({
                'zoom': zoom
            });
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

//弹窗  调用方法试例：TGDialogS('pop1')
function TGDialogS(e) {
    $("#" + e).css("display", "block");
    $(".pop_mask").remove();
    $("body").append("<div class='pop_mask'></div>");
    $("#" + e).css({
        "position": "fixed",
        "left": "50%",
        "top": "50%",
        "z-index": "999",
    })
    $("#" + e).addClass("pop_block")
}

function closeDialog() {
    $(".pop_block").css("display", "none");
    $(".pop_mask").remove();
}
$("body").on("click", ".pop_mask", function() {
    closeDialog();
})

//视频播放
var tag = null,
    firstScriptTag = null;
var player;
var firstPlay = true;

function initVideo() {
    tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'TdRM4ec8hrA',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}
var done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        // setTimeout(stopVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}

//关闭视频
$(".pop_close1").click(function() {
    player.pauseVideo();
});

$(".video").click(function() {
    TGDialogS("pop_video");
    if (firstPlay) {
        initVideo();
        firstPlay = false;
    } else {
        player.playVideo();
    }
});


if ($(".swiper-container").length) {
    var swiper = new Swiper(".swiper-container", {
        effect: 'coverflow',
        slidesPerView: 'auto',
        centeredSlides: true,
        coverflow: {
            rotate: 0,
            stretch: 10,
            depth: 5,
            modifier: 95,
            slideShadows: false
        },
        autoplayDisableOnInteraction: false,
        loop: true,
        loopedSlides: 3,
        initialSlide: 1,
        watchSlidesProgress: true,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev"
    })
}

var iphone = null;
var email = null,
    emailAndrSub = false,
    emailIosSub = false,
    seletClick = false,
    confirm = false,
    selectSystem = false;

//判断当前选择的是IOS还是android
$('.twoiosan a').click(function() {
    var idx = $(this).index();
    selectSystem = true;
    if (idx == 0) {
        iphone = "ios";
        $(".emailAddress").html("3. iOS端末をご利用の場合は、受信可能なメールアドレスをご入力ください");
        $("#email").attr("placeholder", "メールアドレス");
    } else {
        iphone = "android";
        $(".emailAddress").html("3. Android端末をご利用の場合は、受信可能なGoogleメールアドレスをご入力ください");
        $("#email").attr("placeholder", "@gmail.com");
    }
    $(this).addClass('on').siblings().removeClass('on');
})

//判断是否输入了指定系统下的邮箱地址
$("#email").on("input", function() {
    var reg = /^([A-Za-z0-9_\-\])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    email = $("#email").val();
    if (email) {
        if (iphone == "ios") {
            if (reg.test(email)) {
                emailIosSub = true;
            } else {
                emailIosSub = false;
            }
        } else {
            if (reg.test(email) && email.endWith("@gmail.com")) {
                emailAndrSub = true;
            } else {
                emailAndrSub = false;
            }
        }
    }
})

//判断是否选择了游戏
$(".played li").click(function() {
    var len = $(".played li").length;
    var _idx = $(this).index();
    if (!$(this).hasClass("on")) {
        $(this).addClass("on");
    } else {
        $(this).removeClass("on");
    }
    $(".played li.on").length > 0 ? seletClick = true : seletClick = false;
});

//判断是否同意了协议
$(".bxche .che").click(function() {
    if ($(this).hasClass("on")) {
        $(this).removeClass("on");
        confirm = false;
    } else {
        $(this).addClass("on");
        confirm = true;
    }
});


//自定义了endwith方法
String.prototype.endWith = function(str) {
    var reg = new RegExp(str + "$");
    return reg.test(this);
}

//提交
$(".btnsubmit").click(function() {
    if ((emailIosSub || emailAndrSub) && seletClick && selectSystem && confirm) {
        TGDialogS('pop1');
        $(".btnsubmitgrayon").show();
        $(".btnsubmit").hide();
    } else {
        if ($(".played li.on").length == 0) {
            TGDialogS('pop4');
            return;
        }
        if (selectSystem == false) {
            TGDialogS('pop6');
            return;
        }
        if (!emailIosSub && !emailAndrSub) {
            TGDialogS('pop5');
            return;
        }
        if (confirm == false) {
            TGDialogS('pop7');
        };
    }
});