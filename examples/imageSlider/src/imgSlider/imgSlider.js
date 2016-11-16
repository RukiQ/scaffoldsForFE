/*
 * @Author: qianlu
 * @Date:   2016-11-16 15:42:57
 * @Last Modified by:   qianlu
 * @Last Modified time: 2016-11-16 17:44:16
 */

'use strict';
import "../../assets/css/style.scss"
import tpls from './ImgSlider.tpl';

class ImgSlider {
    constructor(options) {
        this.$el = options.el;
        this.clickFlag = true; // 设置左右切换标记位防止连续按
        this.index = 0; // 记录每次滑动图片的下标
    }

    initSelectors() {
        this.$wrap = $('#wrap');
        this.$inner = $('#inner');
        this.$slider = $('#slider');
        this.spanList = $('span');
        this.spanLen = this.spanList.length;
        this.$prev = $('#prev');
        this.$next = $('#next');

        return this;
    }

    initEvents() {
        var me = this;

        this.$slider.on('click', 'span', function() {
            me.index = $(this).text() - 1;
            me.autoGo();
        });

        this.$prev.on('click', () => {
            this.toPrev();
        });

        this.$next.on('click', () => {
            this.toNext();
        });

        return this;
    }

    init() {
        this.$el.append(tpls());
        this.initSelectors().initEvents();
    }

    autoGo() {
        const Distance = this.$wrap.width(); // 获取展示区的宽度，即每张图片的宽度

        let start = $(inner).position().left, // 获取移动块当前的left的开始坐标
            end = this.index * Distance * (-1), // 获取移动块移动结束的坐标
            // 计算公式即当移动到第三张图片时，图片下标为2乘以图片的宽度就是块的left值
            change = end - start;

        let timer, // 用计时器为图片添加动画效果
            t = 0,
            maxT = 30;

        this.toggleStyles(); // 更改按钮状态

        clearInterval(timer); // 开启计时器前先把之前的清除

        timer = setInterval(() => {
            t++;
            if (t >= maxT) { // 当图片达到终点停止计时器
                clearInterval(timer);
                this.clickFlag = true; // 当图片达到终点才能切换
            }

            // 每隔17毫秒让块移动
            this.$inner.css({
                'left': change / maxT * t + start + 'px',
            });

            if (this.index == this.spanLen && t >= maxT) {
                this.$inner.css({
                    'left': 0,
                });
                this.index = 0;
            }
        }, 17);
    }

    toggleStyles() {
        this.spanList.removeClass('selected'); // 先把按钮状态清除，再让对应按钮改变状态

        if (this.index == this.spanLen) {
            $(this.spanList[0]).addClass('selected');
        } else {
            $(this.spanList[this.index]).addClass('selected');
        }
    }

    toPrev() {
        const Distance = this.$wrap.width(); // 获取展示区的宽度，即每张图片的宽度

        this.index--;
        if (this.index < 0) {
            this.index = this.spanLen - 1;
            this.$inner.css({
                'left': (this.index + 1) * Distance * (-1) + 'px'
            })
        }
        this.autoGo();
    }

    toNext() {
        this.index++;
        if (this.index > this.spanLen) {
            this.index = 0;
        }
        this.autoGo();
    }
}

export default ImgSlider;