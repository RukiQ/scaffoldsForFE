import column from './column.js';
import tpl from './table.tpl';
import TableModel from '../table/TableModel.js';

let TableView = Backbone.View.extend({
    el: '.table',

    events: {
        'change .pagination' : 'toPagination',
        'click .begin' : 'toBegin',
        'click .prev' : 'toPrev',
        'click .next' : 'toNext',
        'click .end' : 'toEnd',
        'click .go' : 'toGo',
        'click .sortable' : 'sortData'
    },

    initialize (options) {
        this.model = options.model;

        this.size = 10; // 分页数
        this.curNum = 0;  // 当前页

        this.listenTo(this.model, 'change:data', this.render);
        this.listenTo(this.model, 'change:counts', this.renderCounts);

        this.model.fetch();
    },

    init (params) {
        this.model.set('params', params);
        this.model.fetch();
    },

    render () {
        this.$el.html(tpl());

        this.$('.pagination').bizSelect();
        this.$('.pagination').bizSelect('val', this.size);

        // 数组深拷贝，保留原来的数据
        this.data = (this.model.get('data')).slice(0);

        // 调用自定义方法，获得分页数据
        let returnObj = this.splitArr(this.data, this.size);

        let groupData = returnObj.hash; // 返回一个对象
        this.pgNum = returnObj.pgNum; // 分页数

        this.setStyle();

        this.data = groupData[this.curNum];

        new bizui.Table(this.$('.list-table'), {
            column: column,
            data: this.data,
            noDataContent: '<p>没有找到符合条件推广组</p>',
            skin: 'myTable'
        });
        
        $('.cur-page').html(this.curNum+1);
        $('.total-page').html(this.pgNum);

        $('.find-number').html(this.model.get('data').length);
    },

    renderCounts () {
        $('.total-number').html(this.model.get('counts').totalLen);
    },

    setStyle () {
        if (this.curNum == 0) {
            $('.begin').addClass('disable');
            $('.prev').addClass('disable');
        }

        if (this.curNum == this.pgNum-1) {
            $('.end').addClass('disable');
            $('.next').addClass('disable');
        }
    },

    // 确定分页数目
    splitArr (arr, size) {
        let hash = {};
        let pgNum = 0;

        while (arr.length) {
            hash[pgNum] = arr.splice(0, size);
            pgNum++;
        }

        return {
            hash,
            pgNum
        }
    },

    toPagination () {
        this.size = $('.pagination').val();
        this.render();
    },

    toBegin () {
        this.curNum = 0;
        this.render();
    },

    toPrev () {
        if (this.curNum > 0) {
            --this.curNum
            this.render();
        } else {
            return false;
        }
    },

    toNext () {
        if (this.curNum < this.pgNum-1) {
            ++this.curNum;
            this.render();
        } else {
            return false;
        }        
    },

    toEnd () {
        this.curNum = this.pgNum - 1;
        this.render();
    },

    toGo () {
        let goNum = $('.page-number').val();
        goNum = Number(goNum);

        if (goNum && goNum > 0 && goNum <= this.pgNum && /\d/.test(goNum)) {
            this.curNum = goNum - 1;
            this.render();
        } else {
            bizui.Dialog.alert({
                title: '跳转页码不满足',
                content: '请输入0到页数范围内的页码',
                ok: '好的'
            });

            return false;
        }
    },

    sortData () {
        let sortedData = (this.model.get('data')).splice(0);

        if (this.flag == 'asc') {
            sortedData.sort(function(a, b) {
                return a.startDate.replace(/\-/g, '') - b.startDate.replace(/\-/g, '');
            });
            this.flag = 'des';
        } else {
            sortedData.sort(function(a, b) {
                return b.startDate.replace(/\-/g, '') - a.startDate.replace(/\-/g, '');
            });
            this.flag = 'asc';
        }

        this.model.set('data', sortedData);
    }

});


export default TableView;