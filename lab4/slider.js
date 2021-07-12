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
    // 3초마다 슬라이더를 이동시킵니다.
    setInterval(function () {
        current = current + 1;
        current = current % imageLength;
        moveTo();
    }, 3000);
};
