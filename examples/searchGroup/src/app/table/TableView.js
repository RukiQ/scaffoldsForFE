import column from './column';
import tpl from './table.tpl';
import TableModel from './TableModel';
import '../../component/bizPage';

let TableView = Backbone.View.extend({
    el: '.query-result',

    events: {
        'click .sortable': 'sortData'
    },

    initialize() {
        this.size = 10; // 分页数
        this.curNum = 0; // 当前页
        this.listenTo(this.model, 'change:data', this.renderTable);
        this.listenTo(this.model, 'change:counts', this.renderCounts);
        this.listenTo(this.model, 'change:ajaxpc', this.renderPage);

        this.model.fetch();
        this.render();
    },

    init(params) {
        this.model.set('params', params);
        this.model.fetch();
    },

    initSelectors() {
        this.$table = this.$el.find('.list-table');
        this.$bizPage = this.$el.find('.bizPage');
        this.$listInfo = this.$el.find('.list-info');

        return this;
    },

    initComponents() {

        return this;
    },

    render() {
        this.$el.html(tpl());
        this.initSelectors().initComponents();
    },

    renderTable(model, data) {
        new bizui.Table(this.$('.list-table'), {
            column: column,
            data: data,
            selectable: true,
            noDataContent: '<p>没有找到符合条件推广组</p>',
            skin: 'myTable',
            onSelect: $.proxy(this, 'onSelect')
        });
    },

    renderPage() {
        const pageData = {
            pageData: this.model.get('ajaxpc'),
            onCallback: $.proxy(this.model, 'setAjaxPc')
        }

        this.$bizPage.bizPage(pageData);
    },

    // 渲染找到数据的条目个数
    renderCounts() {
        let totalLen = this.model.get('counts').totalLen,
            filterLen = this.model.get('counts').filterLen;

        let template = `（找到<span>${filterLen}</span>个/共<span>${totalLen}</span>个推广组）`;

        this.$listInfo.html(template);
    },

    /**
     * 对表格数据进行排序
     */
    sortData() {
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