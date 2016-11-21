/*
 * @Author: qianlu
 * @Date:   2016-11-16 15:42:57
 * @Last Modified by:   qianlu
 * @Last Modified time: 2016-11-21 17:18:29
 */

'use strict';
import "../../assets/css/style2.scss"
import tpls from './ImgSlider2.tpl';

class ImgSlider {
    constructor(options) {
        this.$el = options.el;
        this.index = 0; // 记录每次滑动图片的下标
    }

    initSelectors() {
        this.$wrap = this.$el.find('.wrap');
        this.imgList = this.$el.find('img');
        this.$slider = this.$el.find('.slider');
        this.oLi = this.$el.find('li');

        this.$prev = this.$el.find('.prev');
        this.$next = this.$el.find('.next');

        return this;
    }

    initEvents() {
        var me = this;

        this.$slider.on('click', 'li', function() {
            me.index = $(this).index() - 1;
            me.autoSlide();
        });

        this.$prev.on('click', () => {
            this.toPrev();
        });

        this.$next.on('click', () => {
            this.toNext();
        });

        this.$wrap.on('mouseover', () => {
            this.stopSlide();
        });

        this.$wrap.on('mouseout', () => {
            this.beginSlide();
        });

        return this;
    }

    init() {
        this.$el.append(tpls());
        this.initSelectors().initEvents();

        // 开启图片自动向右滑动的计时器
        this.beginSlide();
    }

    // 开始滑动
    beginSlide() {
        this.time = setInterval(() => {
            this.autoSlide();
        }, 3000);
    }

    // 停止滑动
    stopSlide() {
        clearInterval(this.time);
    }

    // 滑动实现
    autoSlide() {
        this.index++;
        if (this.index == 4) {
            this.index = 0;
        }

        this.imgList.eq(this.index).fadeIn().siblings().fadeOut();
        this.toggleStyles();
    }

    // 更改序号按钮样式
    toggleStyles() {
        this.oLi.eq(this.index).addClass('cur').siblings().removeClass('cur');
    }

    // 滚到前一幅图片
    toPrev() {
        this.index -= 2;

        // 如果到第一幅图片了，则回滚到最后一幅图片
        if (this.index < -1) {
            this.index = this.oLi.length - 2;
        }

        this.autoSlide();
    }

    // 滚到下一幅图片
    toNext() {

        // 如果到最后一幅图片了，则回滚到第一幅图片
        if (this.index > this.oLi.length) {
            this.index = 0;
        }
        this.autoSlide();
    }
}

export default ImgSlider;