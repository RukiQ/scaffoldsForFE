import "../../assets/css/style.scss"

import tpls from './imgSlider.tpl';

function ImgSlider(options) {
    this.$el = options.el;
    this.clickFlag = true; // 设置左右切换标记位防止连续按
    this.index = 0; // 记录每次滑动图片的下标
}

ImgSlider.prototype = {
    constructor: ImgSlider,

    initSelectors: function() {
        this.$wrap = $('#wrap');
        this.$inner = $('#inner');
        this.$slider = $('#slider');
        this.spanList = $('span');
        this.$left = $('#left');
        this.$right = $('#right');

        return this;
    },

    initEvents: function() {
        var me = this;

        this.$slider.on('click', 'span', function() {
            me.index = $(this).text() - 1;
            me.autoGo(me.index);
        });

        return this;
    },

    init: function() {
        this.$el.append(tpls());
        this.initSelectors().initEvents();
    },

    autoGo: function(index) {
        const Distance = this.$wrap.width(); // 获取展示区的宽度，即每张图片的宽度

        let start = $(inner).position().left, // 获取移动块当前的left的开始坐标
            end = index * Distance * (-1), // 获取移动块移动结束的坐标
            // 计算公式即当移动到第三张图片时，图片下标为2乘以图片的宽度就是块的left值
            change = end - start;

        let timer, // 用计时器为图片添加动画效果
            t = 0,
            maxT = 30;

        this.spanList.removeClass('selected'); // 先把按钮状态清除，再让对应按钮改变状态

        if (index == this.spanList.length) {
            $(this.spanList[0]).addClass('selected');
        } else {
            $(this.spanList[this.index]).addClass('selected');
        }

        clearInterval(timer); // 开启计时器前先把之前的清除
        timer = setInterval(function() {
            t++;
            if (t >= maxT) { // 当图片达到终点停止计时器
                clearInterval(timer);
                this.clickFlag = true; // 当图片达到终点才能切换
            }
            inner.style.left = change / maxT * t + start + 'px'; // 每隔17毫秒让块移动
            if (index == this.spanList.length && t >= maxT) {
                inner.style.left = 0;
                this.index = 0;
            }
        }.bind(this), 17);
    }
}

module.exports = ImgSlider;