import QueryView from './query/QueryView.js';
import TableView from './table/TableView.js';
import TableModel from './table/TableModel.js';
import Global from './global.js';

let Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'search/~': 'searchView',
        'search/~:params': 'searchView' 
    },

    initialize () { },

    index () {
        this.navigate('#search/~', {trigger: true});
    },

    searchView (params) {

        //解析params成为一个json对象
        if (params) {
            params = this.queryToObj(params);
        } else {
            params = '';
        }

        //初始化queryView和tableView，保证是单例，不会重复创建
        if(!this.queryView && !this.tableView){
            this.tableModel = new TableModel();

            this.queryView = new QueryView();

            this.tableView = new TableView({
                model: this.tableModel
            });
        }

        this.tableView.init(params);
        this.queryView.init(params);
    },

    nav (hash, params, navConfig){
        this.navigate([hash,$.param(params)].join('~'), navConfig);
    },

    // 将查询参数转换成对象
    queryToObj (arg) {
        let arr = arg.split('&');
        let argObj = {};

        for (let i=0, len=arr.length; i<len; i++) {
            let tempArr = arr[i].split('=');
            let key = tempArr[0];
            let value = tempArr[1];

            if (value) {
                argObj[key] = value;
            }
        }

        return argObj;
    }

});

Global.set('router', new Router);

export default Router;