// 플러그인 등록합니다.
$.fn.imageSlider = function (object) {
    // 변수를 선언합니다.
    var width = object.width || 460;
    var height = object.height || 300;
    var current = 0;
    var k = this;
    // 함수를 선언합니다.
    var moveTo = function () {
//        $(this).find('.images').animate({
        $(k).find('.images').animate({
//        $('.images').animate({
            left: -current * width
        }, 1000);
    };
    // 슬라이더 내부의 이미지 개수를 확인합니다.
    var imageLength = $(this).find('.image').length;
    // 슬라이더 버튼을 추가합니다.
    for (var i = 0; i < imageLength; i++) {
        $('<button></button>')
            .attr('data-position', i)
            .text(i)
            .click(function () {
                current = $(this).attr('data-position');
                moveTo();
            })
            .insertBefore(this);
    }
    // 슬라이더 스타일을 설정합니다.
    $(this).css({
        position: 'relative',
        width: width,
        height: height,
        overflow: 'hidden'
    });
    $(this).find('.images').css({
        position: 'absolute',
        width: width * imageLength,
    });
    $(this).find('.image').css({
        margin: 0,
        padding: 0,
        width: width,
        height: height,
        display: 'block',
        float: 'left'
    });
};

$.fn.imageTouch = function () {
    $(document).ready(function () {
        var box_isclick = false;
        var box_inipos = 0;
        var box_moving = 0;
        var box_origin = 0;
        var myWidth = parseFloat($('.image').css('width'));
        var init = true;
        var iniX;
        var current = 0;

        $('.images').on({
            "touchstart mousedown": function(e) {
                e.preventDefault();
                box_isclick = true; // 이동 시작
                box_origin = $(this).offset().left;
                box_moving = 0;
                if(init) { init = false; iniX = $(this).offset().left; }
            },
            "touchstart": function(e) { // 손가락
                box_inipos = e.originalEvent.touches[0].screenX;
            },
            "mousedown": function(e) { // 마우스
                box_inipos = e.pageX;
            },
            "touchmove": function(e) {
                e.preventDefault();
                if(box_isclick) {
                    box_moving = e.originalEvent.touches[0].screenX - box_inipos;
                    $(this).css('left',`${box_origin+box_moving}px`);
                }
            },
            "mousemove": function(e) {
                if(box_isclick) {
                    box_moving = e.pageX - box_inipos;
                    $(this).css('left',`${box_origin+box_moving}px`);
                }
            },
            "touchend mouseup": function(e) {
                box_isclick = false;
                var pos = parseFloat($(this).css('left'))
                if(pos > 0 || pos < -(this.getBoundingClientRect().width - myWidth)){
                    current = Math.floor(Math.abs(pos / myWidth));
                }
                else {
                    current = Math.abs((box_moving > 0) ? Math.ceil(pos / myWidth) : Math.floor(pos / myWidth));
                }
                $(this).animate({
                    left: -current * myWidth
                }, 500);
            }
        })
   });
}

