/*
 * @Author: qianlu
 * @Date:   2016-11-29 11:25:51
 * @Last Modified by:   qianlu
 * @Last Modified time: 2016-11-30 14:55:17
 */

'use strict';

export default class BizPage {
    constructor(paging, options) {
        this.$el = $(paging);
        let pageData = options.pageData;

        this.pageCnt = pageData.pageCnt; // 分页数
        this.pageNo = pageData.pageNo; // 当前页码
        this.pageSize = pageData.pageSize; // 当前页的数据个数
        this.recordCount = pageData.recordCount; // 数据总数

        // 更改数据后触发回调
        this.setAjaxPc = options.onCallback;

        this.init();
    }

    //----------------------------
    //------------init methods
    //----------------------------
    initTpl() {
        let Tpl = `
            <div class="page-wrap">
                <span style="margin-right: 10px;">
                    每页显示
                    <select class="pagination">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    条记录
                </span>

                <span class="page-item">
                    共<b class="find-number">${this.recordCount}</b>个
                </span>

                <span class="page-item">
                    <a href="javascrip:;" class="begin">首页</a>
                    <a href="javascrip:;" class="prev">上一页</a>
                    <a href="javascrip:;" class="next">下一页</a>
                    <a href="javascrip:;" class="end">末页</a>
                </span>

                <span class="page-item">
                    <b class="cur-page">${this.pageNo + 1}</b>/
                    <b class="total-page">${this.pageCnt}</b>页
                </span>

                跳转至
                <input type="text" class="page-number" maxlength="2" />
                <button class="go">GO</button>
            </div>`;

        return Tpl;
    }

    initSelectors() {
        this.$pagination = this.$el.find('.pagination');
        this.$curPage = this.$el.find('.cur-page');
        this.$goNo = this.$el.find('.page-number');
        this.$totalPage = this.$el.find('.total-page');
        this.$begin = this.$el.find('.begin');
        this.$prev = this.$el.find('.prev');
        this.$next = this.$el.find('.next');
        this.$end = this.$el.find('.end');
        this.$go = this.$el.find('.go');

        return this;
    }

    initComponents() {
        this.$pagination.bizSelect().bizSelect('val', this.size);

        if (this.pageNo == 0) {
            this.$begin.addClass('disable');
            this.$prev.addClass('disable');
        }

        if (this.pageNo == this.pageCnt - 1) {
            this.$end.addClass('disable');
            this.$next.addClass('disable');
        }

        return this;
    }

    initEvents() {
        this.$el.on('click', (e) => {
            let $target = $(e.target);
            switch ($target.attr('class')) {
                case 'begin':
                    this._toBegin();
                    break;
                case 'prev':
                    this._toPrev();
                    break;
                case 'next':
                    this._toNext();
                    break;
                case 'end':
                    this._toEnd();
                    break;
                case 'go':
                    this._toGo();
                    break;
                default:
                    return false;
            }
        });

        var me = this;
        this.$pagination.change(function(e) {
            me.pageSize = $(this).val();
            me.loadData();
        });
    }

    //----------------------------
    //------------public methods
    //----------------------------
    init() {
        this.render();
        this.initEvents();
    }

    render() {
        let Tpl = this.initTpl();
        this.$el.html(Tpl);
        this.initSelectors().initComponents();
    }

    //----------------------------
    //------------event handlers
    //----------------------------
    _toBegin() {
        this.pageNo = 0;
        this.loadData();
    }

    _toPrev() {
        if (this.pageNo > 0) {
            --this.pageNo;
        } else {
            return false;
        }

        this.loadData();
    }

    _toNext() {
        if (this.pageNo < this.pageCnt - 1) {
            ++this.pageNo;
        } else {
            return false;
        }

        this.loadData();
    }

    _toEnd() {
        this.pageNo = this.pageCnt - 1;
        this.loadData();
    }

    // 待完善
    _toGo() {
        let goNum = Number(this.$goNo.val());

        if (goNum && goNum > 0 && goNum <= this.pageCnt && /\d/.test(goNum)) {
            this.pageNo = goNum - 1;
        } else {
            bizui.Dialog.alert({
                title: '跳转页码不满足',
                content: '请输入0到页数范围内的页码',
                ok: '好的'
            });

            return false;
        }

        this.loadData();
    }

    /**
     * 更新数据
     * @return {[type]} [description]
     */
    loadData() {
        let pageData = {
            pageCnt: this.pageCnt, // 多少页
            pageNo: this.pageNo, // 当前页
            pageSize: this.pageSize // 每页多少个
        };

        this.setAjaxPc(pageData);
    }
}

$.extend($.fn, {
    bizPage(options) {
        new BizPage(this, options)
        return this;
    }
});