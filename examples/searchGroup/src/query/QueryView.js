import Global from '../global.js';
import tpl from './query.tpl';

let QueryView = Backbone.View.extend({
    el: '#query-form',

    events: {
        'click #btn-query' : 'groupQuery',
        'click #btn-reset' : 'infoReset',
        'click .all-region + .biz-label' : 'allRegion',
        'click .sel-region + .biz-label' : 'selRegion'
    },

    initialize (options) {
        this.render();
    },

    init (params) {
        $('.group-name').val(params.groupName || '');
        $('.channel').bizSelect('val', params.channel || '');
        $('.price-low').val(params.lowPrice || '');
        $('.price-up').val(params.upPrice || '');
        $('.time-begin').val(params.beginTime || '');
        $('.time-end').val(params.endTime || '');

        if (params.region) {
            switch(params.region) {
            case '': 
                $('input[name="region"]').bizRadio('get', 'all-region').check();
                $('.ck-item').hide();
                break;
            case '10':
                $('input[name="region"]').bizRadio('get', 'sel-region').check();
                $('input[name="city"]').bizCheckbox('get', 'bj').check();
                $('input[name="city"]').bizCheckbox('get', 'tj').uncheck();
                $('.ck-item').show();
                break;
            case '01':
                $('input[name="region"]').bizRadio('get', 'sel-region').check();
                $('input[name="city"]').bizCheckbox('get', 'bj').uncheck();
                $('input[name="city"]').bizCheckbox('get', 'tj').check();
                $('.ck-item').show();
                break;
          }
        }
    },

    render () {
        
        this.$el.html(tpl());

        $('.biz-input').bizInput();
        $('.biz-select').bizSelect();
        $('input[name="region"]').bizRadio();
        $('input[name="city"]').bizCheckbox();
        $('.biz-calendar').bizCalendar({
            todayHighlight: true,
            todayBtn: 'linked',
            startDate: '2010-01-01',
            endDate: '2020-01-01',
            onSort: function(data, e) {}
        });
        $('.biz-button').bizButton();
    },

    allRegion () {
        this.$('.ck-item').hide();
    },

    selRegion () {
        this.$('.ck-item').show();
    },

    getFormObj () {
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


        if ( hasAllRg ) {
            formObj.region = "";
        } 
        else if ( hasSelRg ) {

          if ( (hasBJ && hasTJ) ) {
                formObj.region = "11";
          } else if (hasBJ && !hasTJ) {
                formObj.region = '10';
          } else if (!hasBJ && hasTJ) {
                formObj.region = '01';
          } else {
                formObj.region = '';
          }

        }


        if ($('.group-name').val()) {
            formObj.groupName = $('.group-name').val();
        }

        if ($('.channel').val()) {
            formObj.channel = $('.channel').val();
        }

        if ($('.time-begin').val()) {
            formObj.beginTime = $('.time-begin').val();
        }

        if ($('.time-end').val()) {
            formObj.endTime = $('.time-end').val();
        }

        if ($('.price-low').val()) {
            formObj.lowPrice = $('.price-low').val();
        }

        if ($('.price-up').val()) {
            formObj.upPrice = $('.price-up').val();
        }

        return formObj;
    },

    validateTime () {
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
        

        if ( beginTime && endTime && (beginTime > endTime) ) {
            bizui.Dialog.alert({
                title: '过滤条件不满足',
                content: '开始时间不能大于结束时间',
                ok: '好的'
            });

            return false;
        }

        return true;
    },

    validatePrice () {
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
        if ( lowPrice && upPrice && (lowPrice > upPrice) ) {
            bizui.Dialog.alert({
                title: '过滤条件不满足',
                content: '组出价后框不能小于前面的框',
                ok: '好的'
            });

            return false;
        }

        return true;
    },

    groupQuery () {
        // 获取表单数据
        this.formObj = this.getFormObj();

        if (this.validatePrice() && this.validateTime()) {

            Global.get('router').nav('search/', this.formObj, {trigger: true});
        }

    },

    infoReset () {
        $("input[name=reset]").trigger("click");
        $('.channel').bizSelect('val', '');
        $('input[name="region"]').bizRadio('get', 'sel-region').check();
        $('input[name="city"]').bizCheckbox('get', 'bj').check();
        $('input[name="city"]').bizCheckbox('get', 'tj').check();
        $('.ck-item').show();                

        Global.get('router').nav('search/', '', {trigger: true});
        // Backbone.trigger('resetTable');
    },

});


export default QueryView;