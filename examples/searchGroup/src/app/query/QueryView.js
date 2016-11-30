import Global from '../../common/global.js';
import tpl from './query.tpl';

let QueryView = Backbone.View.extend({
    el: '#query-form',

    events: {
        'click #btn-query': 'groupQuery',
        'click #btn-reset': 'infoReset',
        'click .all-region + .biz-label': 'allRegion',
        'click .sel-region + .biz-label': 'selRegion'
    },

    //----------------------------
    //------------init methods
    //----------------------------
    initialize(options) {
        this.render();
    },

    init(params) {
        this.renderParams(params);
    },

    initSelectors: function() {
        this.$groupName = this.$el.find('.group-name');
        this.$channel = this.$el.find('.channel');

        this.$price = this.$el.find('.price');
        this.$priceLow = this.$el.find('.price-low');
        this.$priceUp = this.$el.find('.price-up');

        this.$calendar = this.$el.find('.calendar');
        this.$timeBegin = this.$el.find('.time-begin');
        this.$timeEnd = this.$el.find('.time-end');

        this.$region = this.$el.find('input[name="region"]');
        this.$city = this.$el.find('input[name="city"]');
        this.$ckItem = this.$el.find('.ck-item');

        this.$bizButton = this.$el.find('.biz-button');
        this.$btnQuery = this.$el.find('#btn-query');
        this.$btnReset = this.$el.find('#btn-reset');

        return this;
    },

    initComponents: function() {
        this.$groupName.bizInput();
        this.$price.bizInput();
        this.$channel.bizSelect();
        this.$region.bizRadio();
        this.$city.bizCheckbox();
        this.$calendar.bizCalendar({
            todayHighlight: true,
            todayBtn: 'linked',
            startDate: '2010-01-01',
            endDate: '2020-01-01',
            onSort: function(data, e) {}
        });
        this.$bizButton.bizButton();

        this.$allRegion = $('.all-region + .biz-label');
        this.$selRegion = $('.sel-region + .biz-label');

        return this;
    },

    //----------------------------
    //------------public methods
    //----------------------------
    render() {
        this.$el.html(tpl());
        this.initSelectors().initComponents();
    },

    /**
     * 实现路由数据渲染
     * @param  {object} params 查询参数
     */
    renderParams(params) {
        let groupName = params.groupName || '',
            channel = params.channel || '',
            lowPrice = params.lowPrice || '',
            upPrice = params.upPrice || '',
            beginTime = params.beginTime || '',
            endTime = params.endTime || '';

        this.$groupName.val(groupName);
        this.$channel.bizSelect('val', channel);
        this.$priceLow.val(lowPrice);
        this.$priceUp.val(upPrice);
        this.$timeBegin.val(beginTime);
        this.$timeEnd.val(endTime);

        if (params.region) {
            switch (params.region) {
                case '10':
                    this.$region.bizRadio('get', 'sel-region').check();
                    this.$city.bizCheckbox('get', 'bj').check();
                    this.$city.bizCheckbox('get', 'tj').uncheck();
                    this.$ckItem.show();
                    break;
                case '01':
                    this.$region.bizRadio('get', 'sel-region').check();
                    this.$city.bizCheckbox('get', 'bj').uncheck();
                    this.$city.bizCheckbox('get', 'tj').check();
                    this.$ckItem.show();
                    break;
            }
        } else {
            this.$region.bizRadio('get', 'all-region').check();
            this.$ckItem.hide();
        }
    },

    //----------------------------
    //------------event handlers
    //----------------------------
    allRegion() {
        this.$ckItem.hide();
    },

    selRegion() {
        this.$ckItem.show();
    },

    getFormObj() {
        let formObj = {
            region: '11'
        };

        let $allRgLabel = $('.all-region + .biz-label'),
            $selRgLabel = $('.sel-region + .biz-label'),
            $bjLabel = $('#bj + .biz-label'),
            $tjLabel = $('#tj + .biz-label');

        let hasAllRg = Boolean($allRgLabel.hasClass('biz-radio-checked')),
            hasSelRg = Boolean($selRgLabel.hasClass('biz-radio-checked')),
            hasBJ = Boolean($bjLabel.hasClass('biz-checkbox-checked')),
            hasTJ = Boolean($tjLabel.hasClass('biz-checkbox-checked'));


        if (hasAllRg) {
            formObj.region = "";
        } else if (hasSelRg) {

            if ((hasBJ && hasTJ)) {
                formObj.region = "11";
            } else if (hasBJ && !hasTJ) {
                formObj.region = '10';
            } else if (!hasBJ && hasTJ) {
                formObj.region = '01';
            } else {
                formObj.region = '';
            }

        }


        if (this.$groupName.val()) {
            formObj.groupName = this.$groupName.val();
        }

        if (this.$channel.val()) {
            formObj.channel = this.$channel.val();
        }

        if (this.$timeBegin.val()) {
            formObj.beginTime = this.$timeBegin.val();
        }

        if (this.$timeEnd.val()) {
            formObj.endTime = this.$timeEnd.val();
        }

        if (this.$priceLow.val()) {
            formObj.lowPrice = this.$priceLow.val();
        }

        if (this.$priceUp.val()) {
            formObj.upPrice = this.$priceUp.val();
        }

        return formObj;
    },

    /**
     * 验证时间
     * @return {boolean} 如果验证通过，返回 true，否则返回 false
     */
    validateTime() {
        let beginTime;
        let endTime;
        if (this.formObj.beginTime) {
            beginTime = (this.formObj.beginTime).replace(/\-/g, '');
        } else {
            beginTime = '';
        }

        if (this.formObj.endTime) {
            endTime = (this.formObj.endTime).replace(/\-/g, '');
        } else {
            endTime = '';
        }


        if (beginTime && endTime && (beginTime > endTime)) {
            bizui.Dialog.alert({
                title: '过滤条件不满足',
                content: '开始时间不能大于结束时间',
                ok: '好的'
            });

            return false;
        }

        return true;
    },

    /**
     * 验证价格
     * @return {boolean} 如果验证通过，返回 true，否则返回 false
     */
    validatePrice() {
        let pricePattern = /^(\d)*(\.)?(\d)*$/;
        let lowPrice = this.formObj.lowPrice || '';
        let upPrice = this.formObj.upPrice || '';

        if (!pricePattern.test(lowPrice) || !pricePattern.test(upPrice)) {
            bizui.Dialog.alert({
                title: '过滤条件不满足',
                content: '出价框只能填写数字和小数点',
                ok: '好的'
            });

            return false;
        }

        // 如果同时存在低价和高价，则做一个比较
        if (lowPrice && upPrice && (lowPrice > upPrice)) {
            bizui.Dialog.alert({
                title: '过滤条件不满足',
                content: '组出价后框不能小于前面的框',
                ok: '好的'
            });

            return false;
        }

        return true;
    },

    groupQuery() {
        // 获取表单数据
        this.formObj = this.getFormObj();

        if (this.validatePrice() && this.validateTime()) {

            Global.get('router').nav('search/', this.formObj, {
                trigger: true
            });
        }

    },

    // 清空内容
    infoReset() {
        $("input[name=reset]").trigger("click");
        this.$channel.bizSelect('val', '');
        this.$region.bizRadio('get', 'sel-region').check();
        this.$city.bizCheckbox('get', 'bj').check();
        this.$city.bizCheckbox('get', 'tj').check();
        this.$ckItem.show();

        Global.get('router').nav('search/', '', {
            trigger: true
        });
    },

});


export default QueryView;