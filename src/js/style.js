// //禁止键盘f1-f12
// function testKeyDown(event)
// {
//     if ((event.keyCode == 112) || //屏蔽 F1
//         (event.keyCode == 113) || //屏蔽 F2
//         (event.keyCode == 114) || //屏蔽 F3
//         (event.keyCode == 115) || //屏蔽 F4
//         //(event.keyCode == 116) || //屏蔽 F5
//         (event.keyCode == 117) || //屏蔽 F6
//         (event.keyCode == 118) || //屏蔽 F7
//         (event.keyCode == 119) || //屏蔽 F8
//         (event.keyCode == 120) || //屏蔽 F9
//         (event.keyCode == 121) || //屏蔽 F10
//         (event.keyCode == 122) || //屏蔽 F11
//         (event.keyCode == 123)) //屏蔽 F12
//     {
//         event.keyCode = 0;
//         event.returnValue = false;
//     }
// }
// document.onkeydown = function(){testKeyDown(event);}
// window.onhelp = function(){return false;}
//
// //禁止鼠标右击
// document.oncontextmenu = function(){
//     event.returnValue = false;
//     return false;
// }

function myBrowser(){
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "Firefox";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE<11浏览器
}

window.onload = function () {
    $('body').addClass('loaded');
    (new WOW).init();
    $('body,html').animate({scrollTop: 0}, 1,callback=setflag);
}//页面刷新

//music
$('.music').click(function(){
    if($('.music').hasClass("cdPause")|| !$('.music').hasClass("cdStart"))
    {
        $('#music').get(0).play();
        $('.music').removeClass("cdPause");
        $('.music').addClass("cdStart");
    }
    else if($('.music').hasClass("cdStart")){
        $('#music').get(0).pause();
        $('.music').removeClass("cdStart");
        $('.music').addClass("cdPause");
    }
})

//menu
function myMenu(){
    let t = $("#menu").attr("data-mark");
    t === "false" ? ($("#menu").removeClass("menu_open").addClass("menu_close"),
        $("#navgation").removeClass("navgation_close").addClass("navgation_open"),
        $("#menu").attr({
            "data-mark": "true"
        })) : ($("#menu").removeClass("menu_close").addClass("menu_open"),
        $("#navgation").removeClass("navgation_open").addClass("navgation_close"),
        $("#menu").attr({
            "data-mark": "false"
        }))
}
$("#menu").on("click", function() {
    myMenu();
})

/* next */
$(".next").click(function() {
    hide();
});

/* 回到top */
$("#toTop").on("click", function() {
    $(".dot").removeClass("dot1");
    $(".dot").eq(0).addClass("dot1");
    count = 0;
    pageScroll(count+1);
    goto();
})

// myMouse
myMouse(".music","play-tx");
myMouse(".img","play-tx");

function myMouse(e,reveal){
    $(e).mouseover(function(){
        $(this).addClass(reveal);
    });
    $(e).mouseout(function(){
        $(this).removeClass(reveal);
    });
}

var scrollFunc = function (e) {
    e = e || window.event;
    if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
        if (e.wheelDelta > 0) { //当滑轮向上滚动时
            hide2();
        }
        if (e.wheelDelta < 0) { //当滑轮向下滚动时
            hide();
        }
    }
    else if (e.detail) {  //Firefox滑轮事件
        if (e.detail> 0) { //当滑轮向上滚动时
            hide();
        }
        if (e.detail< 0) { //当滑轮向下滚动时
            hide2();
        }
    }
}

// 给页面绑定滑轮滚动事件
if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
}
// //滚动滑轮触发scrollFunc方法

//以下是调用上面的函数
let browser = myBrowser();
if ("IE" == browser) {
    document.onmousewheel = scrollFunc;
}else{
    window.onmousewheel= scrollFunc;
}

var count = 0;
let num = 6;
let flag = true;
function hide() {
    if(count<num-1){
        if(flag){
            flag = false;
            $(".dot").eq(count).removeClass("dot1");
            count++;
            $(".dot").eq(count).addClass("dot1");
            pageScroll(count+1);
        }
    }
    goto();
}

function hide2() {
    if(count>0){
        if(flag){
            flag = false;
            $(".dot").eq(count).removeClass("dot1");
            count--;
            $(".dot").eq(count).addClass("dot1");
            pageScroll(count+1);
        }
        goto();
    }
}

function goto() {
    if(count!=0){
        $("#toTop").css("display","block");
    }else{
        $("#toTop").css("display","none");
    }
}

function setflag() {
    flag = true;
}

function pageScroll(index){
    $('body,html').animate({scrollTop: $('#page'+index).offset().top}, 500,callback=setflag);
}

$(".dot").click(function () {
    var index = $(this).index(".dot");
    $(".dot").eq(count).removeClass("dot1");
    $(this).addClass("dot1");
    count = index;
    pageScroll(count+1);
    goto();
})//模块跳转

$(".list").click(function () {
    var index = $(this).index(".list");
    $(".dot").eq(count).removeClass("dot1");
    $(".dot").eq(index).addClass("dot1");
    count = index;
    pageScroll(count+1);
    myMenu();
    goto();
})//模块跳转


/* 鼠标特效 */
var a_idx = 0;
$(document).ready(function ($) {
    $("body>*:not(#menu)").click(function (e) {
        var a = [
            "HTML", "CSS3", "JavaScript","jQuery","Ajax","MySQL",
            "photoshop","Sass","Vue","Angular","React","TypeScript"
            ,"SVN", "GIT", "Node.js","Webpack","Bootstrap","Layui"
        ];
        var b = [
            "#109085","#4a5b8a","#53af60","#4b849f","#356da4","#d7da10",
            "#10da29","#da7710","#da2c10","#004eff","#9100ff","#ff0081",
            "#901010","#901057","#5f1090","#7c9010","#c732c3","#c70d41"
        ];
        var a_index = Math.floor((Math.random() * a.length));
        var b_index = Math.floor((Math.random() * b.length));

        var color = b[b_index];
        var $i = $("<span/>").text(a[a_index]);
        var x = e.pageX,
            y = e.pageY;

        $i.css({
            "z-index": 999,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": color,
        });
        $("body").append($i);
        $i.animate({
            "top": y - 180,
            "opacity": 0
        }, 1500, function () {
            $i.remove();
        });
    });
});
/* 轮播特效 */
var pos = 0;
var totalSlides = $('#slider-wrap ul li').length;
var sliderWidth = $('#slider-wrap').width();
$(document).ready(function(){
    $('#slider-wrap ul#slider').width(sliderWidth*totalSlides);
    $('#next').click(function(){
        slideRight();
    });
    $('#previous').click(function(){
        slideLeft();
    });
    var autoSlider = setInterval(slideRight, 3000);
    $.each($('#slider-wrap ul li'), function() {
        var c = $(this).attr("data-color");
        $(this).css("background",c);
        var li = document.createElement('li');
        $('#pagination-wrap ul').append(li);
    });

    countSlides();//当前页数

    pagination();

    $('#slider-wrap').hover(
        function(){
            $(this).addClass('active');
            clearInterval(autoSlider);
            },
        function(){
            $(this).removeClass('active');
            autoSlider = setInterval(slideRight, 3000);
        }
    );

});

function slideLeft(){
    pos--;
    if(pos==-1){ pos = totalSlides-1; }
    $('#slider-wrap ul#slider').css('left', -(sliderWidth*pos));
    countSlides();
    pagination();
}

function slideRight(){
    pos++;
    if(pos==totalSlides){ pos = 0; }
    $('#slider-wrap ul#slider').css('left', -(sliderWidth*pos));
    countSlides();
    pagination();
}

function countSlides(){
    $('#counter').html(pos+1 + ' / ' + totalSlides);
}

function pagination(){
    $('#pagination-wrap ul li').removeClass('active');
    $('#pagination-wrap ul li:eq('+pos+')').addClass('active');
}

var startX, startY, moveEndX, moveEndY, X, Y;
$('body,html').on('touchstart', function(e) {
    startX = e.originalEvent.changedTouches[0].pageX,
    startY = e.originalEvent.changedTouches[0].pageY;
});
$('body,html').on('touchmove', function(e) {
    e.preventDefault()
});
$('body,html').on("touchend",function (e) {

    moveEndX = e.originalEvent.changedTouches[0].pageX
    moveEndY = e.originalEvent.changedTouches[0].pageY
    X = moveEndX - startX;
    Y = moveEndY - startY;
    if(Y>0){
        hide2()
    }else if(Y<0){
        hide()
    }
})

console.log("欢迎大佬到此网站！！！");
console.log("膜拜膜拜!!!");
console.log("联系邮箱：1871321876@qq.com");
console.log("手机号码：15914967410");
console.log("\n\n");
console.log("follow me  %chttps://github.com/Junquan-Guo/text", "color:#6bc30d");
