//swiper
var swiperPics = new Swiper('.part1 .swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

var swiperScroll = new Swiper('.scrollBox .swiper-container', {
	direction: 'vertical',
	roundLengths: true,
	slidesPerView: 'auto',
	freeMode: true,
	observer: true,
	observeParents: true,
	scrollbar: {
		el: '.swiper-scrollbar',
	},
	mousewheel: true,
});



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
		videoId: 'Q_9lyIeGB6c',
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

//注册提交
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
		$(".emailAddress").html("3. If you are using an iOS system, please enter a valid email address");
		$("#email").attr("placeholder", "Email Address");
	} else {
		iphone = "android";
		$(".emailAddress").html("3. If you are using an Android system, please enter a valid Gmail address");
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
$(".btn_sub").click(function() {
	if ((emailIosSub || emailAndrSub) && seletClick && selectSystem && confirm) {
		TGDialogS('pop1');
		$(".btn_sub").addClass("btn-zhih");
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