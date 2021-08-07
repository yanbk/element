$(function () {
    /////预注册提交 成功
    $("#pre_submit").click(function(){
        $(".tip").hide();
        $("#pre_regi_done").show();
        inter = setInterval(fun, 1000);
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
            $(".tip").fadeOut();
            time.html("10");
            t = 10;
        }
    }
    $("#pre_back").click(function(){
        $(".tip").fadeOut();
        ///
        clearInterval(inter);
        time.html("10");
        t = 10;
    })
    /////注册
    $(".yuyuebtn").click(function(){
        $("#pre_regi").show();
    })
    /////
    $(".submitbtn").on("click",function(){
        $(".dy_before").hide();
        $(".dy_after").show();
    })
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
    /////
    $(".cg").on("click",function(){
        $(".med_body").html('<video muted width="100%" height="auto" controls="controls" autoplay loop><source src="../images/bg_y.mp4" type="video/mp4" /></video>');
        setTimeout(function(){
            showDialog.show({
                id:'m_pop',
                bgcolor:'#000',
                opacity:80
            });
        },10)
    })
    $(".tab a").each(function(){
        $(this).on("click",function(){
            $(".tab a").removeClass("cur");
            $(this).addClass("cur");
            console.log($(this).index());
            $(".tabbody").hide();
            $(".tabbody").eq($(this).index()).show();
        })
    });
    //////////
    $(".tab2 a").each(function(){
        $(this).on("click",function(){
            $(".tab2 a").removeClass("cur");
            $(this).addClass("cur");
            console.log($(this).index());
        })
    });
    var swiper = new Swiper('.swiper-container', {
        loop : true,
        navigation: {
          nextEl: '.rt-button-next',
          prevEl: '.rt-button-prev',
        },
    });
    /////
    var swiper_m1 = new Swiper('.swiper-container1_1', {
        loop : true,
        observer: true,
        observeParents: true,
        slideToClickedSlide: true,
        centeredSlides: true,
        slidesPerView: 3,
        spaceBetween: 20,
        on: {
            slideChangeTransitionEnd: function(){
                console.log(this.activeIndex);
                $(".tab_cont1 .media_big").html($(".swiper-container1_1 .swiper-slide-active").html());
            },
        },
    });
    var swiper_m2 = new Swiper('.swiper-container1_2', {
        loop : true,
        observer: true,
        observeParents: true,
        slideToClickedSlide: true,
        centeredSlides: true,
        slidesPerView: 3,
        spaceBetween: 20,
        on: {
            slideChangeTransitionEnd: function(){
                console.log(this.activeIndex);
                $(".tab_cont2 .media_big").html($(".swiper-container1_2 .swiper-slide-active").html());
            },
        },
    });
    var swiper_m3 = new Swiper('.swiper-container1_3', {
        loop : true,
        observer: true,
        observeParents: true,
        slideToClickedSlide: true,
        centeredSlides: true,
        slidesPerView: 3,
        spaceBetween: 20,
        on: {
            slideChangeTransitionEnd: function(){
                console.log(this.activeIndex);
                $(".tab_cont3 .media_big").html($(".swiper-container1_3 .swiper-slide-active").html());
            },
        },
    });
    var swiper_m4 = new Swiper('.swiper-container1_4', {
        loop : true,
        observer: true,
        observeParents: true,
        slideToClickedSlide: true,
        centeredSlides: true,
        slidesPerView: 3,
        spaceBetween: 20,
        on: {
            slideChangeTransitionEnd: function(){
                console.log(this.activeIndex);
                $(".tab_cont4 .media_big").html($(".swiper-container1_4 .swiper-slide-active").html());
            },
        },
    });
    var swiper_m5 = new Swiper('.swiper-container1_5', {
        loop : true,
        observer: true,
        observeParents: true,
        slideToClickedSlide: true,
        centeredSlides: true,
        slidesPerView: 3,
        spaceBetween: 20,
        on: {
            slideChangeTransitionEnd: function(){
                console.log(this.activeIndex);
                $(".tab_cont5 .media_big").html($(".swiper-container1_5 .swiper-slide-active").html());
            },
        },
    });
    ////
    setInterval(dsq,12000);
    function dsq(){
        $(".screen2").fadeOut();
        $(".screen40").fadeIn();
        
        setTimeout(function(){
            $(".screen2").fadeIn();
            $(".screen40").fadeOut();
        },4000)
    }
})