import "../assets/css/style.scss";
import ImgSlider from './imgSlider/imgSlider';

var imgSlider = new ImgSlider({
    el: $('body')
});

imgSlider.init();


/*let $wrap = $('#wrap'),
    $inner = $('#inner'),
    spanList = $('span'),
    $left = $('#left'),
    $right = $('#right');

let clickFlag = true, // 设置左右切换标记位防止连续按
    time, // 主要用来设置自动滑动的计时器
    index = 0; // 记录每次滑动图片的下标

const Distance = $wrap.width(); // 获取展示区的宽度，即每张图片的宽度

function AutoGo() {
    let start = $(inner).position().left, // 获取移动块当前的left的开始坐标
        end = index * Distance * (-1), // 获取移动块移动结束的坐标
        // 计算公式即当移动到第三张图片时，图片下标为2乘以图片的宽度就是块的left值
        change = end - start;

    console.log("start:", start, "end:", end, 'change:', change);

    let timer, // 用计时器为图片添加动画效果
        t = 0,
        maxT = 30;

    $(spanList).removeClass('selected'); // 先把按钮状态清除，再让对应按钮改变状态

    if (index == spanList.length) {
        $(spanList[0]).addClass('selected');
    } else {
        $(spanList[index]).addClass('selected');
    }

    clearInterval(timer); // 开启计时器前先把之前的清除
    timer = setInterval(function() {
        t++;
        if (t >= maxT) { // 当图片达到终点停止计时器
            clearInterval(timer);
            clickFlag = true; // 当图片达到终点才能切换
        }
        inner.style.left = change / maxT * t + start + 'px'; // 每隔17毫秒让块移动
        if (index == spanList.length && t >= maxT) {
            inner.style.left = 0;
            index = 0;
        }
    }, 17);
}

for (var i = 0; i < spanList.length; i++) {
    $(spanList[i]).on('click', function() {
        index = this.innerText - 1;
        AutoGo();
    })
}*/