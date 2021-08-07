$(function() {
    $("#btnNavSlide").click(function() {
        if($(".G_open").length) {
            $("#commonNav").removeClass("G_open");
            $("#btnNavSlide").removeClass("G_close");

        } else {
            $("#commonNav").addClass("G_open");
            $("#btnNavSlide").addClass("G_close");

        }
    });
    
    /////登录
    $("#signin").click(function(){
        $("#sign").show();
    })
    ////忘记密码
    $(".forget").click(function(){
        $(".tip").fadeOut();
        $("#reget").show();
    })
    
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
    //     $(".tip").fadeOut();
    //     $("#account_done").show();
    //     inter = setInterval(fun, 1000);
    // })
    ////提交user
    $(".submitbtn3").click(function(){
        $(".user_main").hide();
        $(".complete").show();
        inter2 = setInterval(fun2, 1000);
    })
    $("#backbtn").click(function(){
        $(".tip").fadeOut();
        ///
        clearInterval(inter);
        time.html("10");
        t = 10;
    })
    /////////
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
    $(".backbtn").click(function(){
        $(".tip").fadeOut();
    })
    /////media弹层
    $(".video_cont").on("click",function(){
        $(".med_body").html('<video muted width="100%" height="auto" controls="controls" autoplay loop><source src="../images/bg_y.mp4" type="video/mp4" /></video>');
        setTimeout(function(){
            showDialog.show({
                id:'m_pop',
                bgcolor:'#000',
                opacity:80
            });
        },10)
    })
    $(".img_cont").on("click",function(){
        $(".med_body").html('<img src="../images/media_img.jpg" width="100%" height="auto" alt="">');
        setTimeout(function(){
            showDialog.show({
                id:'m_pop',
                bgcolor:'#000',
                opacity:80
            });
        },10)
    })
    $(".closebtn2").click(function(){
        showDialog.hide();
        $(".med_body").html('');
    })
    $(".tab_cont1 .swiper-slide").on("click",function(){
        $(".tab_cont1 .media_big").html('<img src="images/media_img_small.jpg" width="100%" height="auto" alt="">');
    })
    $(".tab_cont2 .swiper-slide").on("click",function(){
        $(".tab_cont2 .media_big").html('<img src="images/media_img_small.jpg" width="100%" height="auto" alt="">');
    })
    $(".tab_cont3 .swiper-slide").on("click",function(){
        $(".tab_cont3 .media_big").html('<img src="images/media_img_small.jpg" width="100%" height="auto" alt="">');
    })
    $(".tab_cont4 .swiper-slide").on("click",function(){
        $(".tab_cont4 .media_big").html('<img src="images/media_img_small.jpg" width="100%" height="auto" alt="">');
    })
    $(".tab_cont5 .swiper-slide").on("click",function(){
        $(".tab_cont5 .media_big").html('<img src="images/media_img_small.jpg" width="100%" height="auto" alt="">');
    })
    ///
})