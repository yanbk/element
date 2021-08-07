/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

(function () {
// 固定使用的对象/变量
var lang = "{# LANG #}";
$(".btn-language").find("span").text(lang == "en" ? "English" : "Español");
getParam("classic") ? $(".bg-box").addClass("version2") : $(".bg-box").removeClass("version2")
// 固定绑定的页面事件

// 封装好的方法

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
$(".btn-language").click(function () {
event.stopPropagation();
$(".language-list").show();
});
$('html,body').click(function () {
$(".language-list").hide();
});

//滚动条
var swiper = new Swiper('.swiper-container', {
direction: 'vertical',
roundLengths: true,
slidesPerView: 'auto',
freeMode: true,
observer: true,
observeParents: true,
scrollbar: {
el: '.swiper-scrollbar',
},
});

// $(".btn-signup2").click(function() {
// 	openDia('dia1');
// 	//滚动指定位置
// 	swiper.setTransition(200);
// 	swiper.translateTo(-200);
// });

//选中按钮参考(仅供页面显示用,开发同学可以去掉)
// $(".qst-list li").click(function() {
// 	$(this).addClass('on').siblings().removeClass('on');
// 	$(this).parent().siblings('.qst-tip').show();
// 	swiper.update();
// });
$(".language-list li").click(function () {
var langs = $(this).attr("class");
var search1 = window.location.search
if (search1) {
window.location.href = '/' + langs + '/event/cbt/m/' + search1
} else {
window.location.href = '/' + langs + '/event/cbt/m/';
}
});
$(".footer_facebook").click(function(){
lang == "en" ? window.open("https://www.facebook.com/ContraReturnsOfficial/") :  window.open("https://www.facebook.com/ContraReturnslatam-104473988292856")
})
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
btnLight();
swiper.update();
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
swiper.update();
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
swiper.update();
});
$("#email").on("input", function () {

emailEnter()
btnLight();
swiper.update();
})

function emailEnter() {
var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
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
// email = $("#email").val()
if (email) {
if (reg.test(email) && email.endsWith("@gmail.com")) {
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
var late = false;

if (!age) {
swiper.translateTo(-50, 50, late = true)
// swiper.setTransition(100)
$(".agenot").show()
}
if (!ageSub && age) {
if (late) { null } else { swiper.translateTo(-50, 50, late = true) }

openDia('dia1');
$("#dia1").find(".suc").hide().end().find(".fail").show()
$(".Under19").show()
dataLayer.push({ 'event': 'Under19', 'event_label': 'Under19' }); fbq('trackCustom', 'Under19', { label: 'Under19' })
}
if (!contra) {
if (late) { null } else { swiper.translateTo(-180, 180, late = true) }

$(".contraWrap").siblings('.qst-tip').show()
}
if (!mobile) {
if (late) { null } else { swiper.translateTo(-360, 360, late = true) }

$(".mobileWrap").siblings('.qst-tip').show()
}
if (!emailSub) {
if (late) { null } else { swiper.translateTo(-530, 530, late = true) }
iphone == "ios" ? $(".iosOffer").show().siblings().hide() : $(".andOffer").show().siblings().hide()

}
if (!confirm) {
if (late) { null } else { swiper.translateTo(-800, 500, late = true) }

$(".confirmWrap").siblings('.qst-tip').show()
}
if (!confirmTer) {
if (late) { null } else { swiper.translateTo(-800, 500, late = true) }

$(".confirmWrap").siblings('.qst-tip').show()
}
}
swiper.update();
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
swiper.update();
dataLayer.push({ 'event': 'submit', 'event_label': 'success' }); fbq('trackCustom', 'submit', { label: 'success' })
} else if (data.ret == 10030203) {
swiper.translateTo(-530, 180)
swiper.update();
$(".emailAlready").show()
$(".btn-sign2").removeClass("open")
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
$(".btn-sign2").addClass("open")
} else {
$(".btn-sign2").removeClass("open")
}

swiper.update();
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
})();