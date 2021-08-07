
/////预注册提交 成功
$("#pre_submit").click(function(){
    showDialog.hide();
    showDialog.show({
        id:'pre_regi_done',
        bgcolor:'#000',
        opacity:80
    });
    inter = setInterval(fun, 1000);
})
/////登录
$(".n1").click(function(){
    showDialog.show({
        id:'sign',
        bgcolor:'#000',
        opacity:80
    });
})
$(".submitbtn").on("click",function(){
    $(".dy_before").hide();
    $(".dy_after").show();
})
/////预注册
$(".regi,.regi2").click(function(){
    showDialog.show({
        id:'Pre_regi',
        bgcolor:'#000',
        opacity:80
    });
})
////忘记密码
$(".forget").click(function(){
    showDialog.hide();
    showDialog.show({
        id:'reget',
        bgcolor:'#000',
        opacity:80
    });
})
///////倒计时10秒关闭
var t = 10;
var time = $(".djs span");
var inter;
function fun() {
    t--;
    time.html(t);
    if(t <= 0) {
        clearInterval(inter);
        showDialog.hide();
        time.html("10");
        t = 10;
    }
}
///倒计时10秒关闭2
var t2 = 10;
var time2 = $(".djs2 span");
var inter2;
function fun2() {
    t2--;
    time2.html(t2);
    if(t2 <= 0) {
        clearInterval(inter2);
        time2.html("10");
        t2 = 10;
        window.location.href="index.html"
    }
}
////提交
// $(".submitbtn2").click(function(){
//     showDialog.hide();
//     showDialog.show({
//         id:'account_done',
//         bgcolor:'#000',
//         opacity:80
//     });
//     inter = setInterval(fun, 1000);
// })
////提交user
$(".submitbtn3").click(function(){
    $(".user_main").hide();
    $(".complete").show();
    inter2 = setInterval(fun2, 1000);
})
$("#backbtn").click(function(){
    showDialog.hide();
    ///
    clearInterval(inter);
    time.html("10");
    t = 10;
})
$(".closebtn,.backbtn").click(function(){
    showDialog.hide();
})
$(".closebtn2").click(function(){
    showDialog.hide();
    $(".med_body").html('');
})
//////
$(".swiper-page a").each(function(){
    $(this).on("click",function(){
        //alert($(this).index());
        $(".swiper-page a").attr("class","");
        $(this).attr("class","cur");
        $(".mediatab").hide();
        $(".mediatab").eq($(this).index()).show();
    });
});
/////
$(".off_menu a").each(function(){
    $(this).on("click",function(){
        //alert($(this).index());
        $(".off_menu a").attr("class","");
        $(this).attr("class","cur");

    });
});
/////
var onOff=1;
$(".agreebtn span").click(function(){
    if(onOff==1){
        $(".agreebtn span").attr("class","yes");
        onOff=0;
    }else{
        $(".agreebtn span").attr("class","");
        onOff=1;
    }
});
/////
var o=1;
$(".agreebtn2 span").click(function(){
    if(o==1){
        $(".agreebtn2 span").attr("class","yes");
        o=0;
    }else{
        $(".agreebtn2 span").attr("class","");
        o=1;
    }
})
/////
var p=1;
$(".agreebtn3 span").click(function(){
    if(p==1){
        $(".agreebtn3 span").attr("class","yes");
        p=0;
    }else{
        $(".agreebtn3 span").attr("class","");
        p=1;
    }
})
/////////
// $('.n_lf a').click(function () {
//     $('html, body').animate({
//         scrollTop: $($.attr(this, 'href')).offset().top
//     }, 500);
//     return false;
// });
//////
$(".regi,.regi2").hover(function(){
    $(".btn_normal").fadeOut(300);
    $(".btn_hover").fadeIn(300);
    clearInterval(s);
    clearTimeout(m);
},function(){
    $(".btn_normal").fadeIn(300);
    $(".btn_hover").fadeOut(300);
    s=setInterval("dsq()",12000);
    $(".screen2").fadeIn();
    $(".screen40").fadeOut();
});
var m;
var s=setInterval("dsq()",12000);
function dsq(){
    $(".screen2").fadeOut();
    $(".screen40").fadeIn();
    
    m = setTimeout(function(){
        $(".screen2").fadeIn();
        $(".screen40").fadeOut();
    },4000)
}
/////
$(".swiper-container2_1 a").on("click",function(){
    $(".med_body").html('<video muted width="100%" height="auto" controls="controls" autoplay loop><source src="images/bg_y.mp4" type="video/mp4" /></video>');
    setTimeout(function(){
        showDialog.show({
            id:'m_pop',
            bgcolor:'#000',
            opacity:80
        });
    },10)
})
$(".swiper-container2_2 a,.swiper-container2_3 a,.swiper-container2_4 a,.swiper-container2_5 a").on("click",function(){
    $(".med_body").html('<img src="images/media_img.jpg" width="100%" height="auto" alt="">');
    setTimeout(function(){
        showDialog.show({
            id:'m_pop',
            bgcolor:'#000',
            opacity:80
        });
    },100)
})
/////
$(".cg").on("click",function(){
    $(".med_body").html('<video muted width="100%" height="auto" controls="controls" autoplay loop><source src="images/bg_y.mp4" type="video/mp4" /></video>');
    setTimeout(function(){
        showDialog.show({
            id:'m_pop',
            bgcolor:'#000',
            opacity:80
        });
    },10)
})