let TableModel = Backbone.Model.extend({

    default: {
        params: {},
        tmpData: null,
        data: [],
        ajaxpc: null,
        counts: {
            totalLen: 0,
            filterLen: 0
        }
    },

    initialize() {
        this.sync();
    },

    sync() {
        $.ajax({
            url: '/test/data.json',
            type: 'GET',
            dataType: 'json',
            data: this.get('params')
        }).done((rs) => {

            // 根据参数过滤数据
            let tmpData = this.get('params') ?
                this.filterData(this.get('params'), rs.data) : rs.data;

            this.set('tmpData', tmpData);

            let pageData = {
                pageNo: 0,
                pageSize: 10,
                recordCount: tmpData.length
            };

            // 调用自定义方法，获得分页数据
            let returnObj = this.splitArr(tmpData.slice(0), pageData.pageSize),
                groupData = returnObj.hash; // 返回一个对象

            pageData.pageCnt = returnObj.pgCnt; // 分页数

            this.set('data', groupData[pageData.pageNo]);
            this.set('ajaxpc', pageData);

            this.set('counts', {
                totalLen: rs.data.length,
                filterLen: pageData.recordCount
            });
        });
    },

    /**
     * 确定分页数目，在 renderTable() 中调用
     * @param  {array} arr  数据数组
     * @param  {number} size 分页个数，如10、20、50
     * @return {object}      
     * { hash：map类型，一个页数对应一个数组，pgCnt：number类型，表示显示几页}
     */
    splitArr(arr, size) {
        var hash = {};
        var pgCnt = 0;

        while (arr.length) {
            hash[pgCnt] = arr.splice(0, size);
            pgCnt++;
        }

        return {
            hash,
            pgCnt
        }
    },

    // 根据参数过滤数据
    filterData(params, data) {
        if (params.groupName) {
            data = _.filter(data, function(item) {
                // 模糊匹配查询
                let pattern = new RegExp(params.groupName);
                return pattern.test(item.groupName);
            });
        }

        if (params.channel) {
            data = _.filter(data, function(item) {
                return (item.channel == params.channel);
            });
        }

        if (params.region) {
            data = _.filter(data, function(item) {
                return (item.region == params.region);
            });
        }

        let lowPrice = params.lowPrice || '',
            upPrice = params.upPrice || '',
            beginTime,
            endTime;

        if (lowPrice || upPrice) {
            data = _.filter(data, function(item) {
                if (lowPrice && upPrice) {
                    return (lowPrice <= item.price && upPrice >= item.price)
                } else if (lowPrice) {
                    return (lowPrice <= item.price);
                } else if (upPrice) {
                    return (upPrice >= item.price);
                } else {
                    return true;
                }
            });
        }

        beginTime = params.beginTime ? (params.beginTime).replace(/\-/g, '') : '';
        endTime = params.endTime ? (params.endTime).replace(/\-/g, '') : '';

        if (beginTime || endTime) {
            data = _.filter(data, function(item) {
                item.beginTime = (item.startDate).replace(/\-/g, '');
                item.endTime = (item.endDate).replace(/\-/g, '');

                if (beginTime && endTime) {
                    return (beginTime <= item.beginTime && endTime >= item.endTime)
                } else if (beginTime) {
                    return (beginTime <= item.beginTime);
                } else if (endTime) {
                    return (endTime >= item.endTime);
                } else {
                    return true;
                }
            });
        }

        return data;
    },

    setAjaxPc(pageData) {
        let ajaxpc = this.get('ajaxpc');

        // 调用自定义方法，获得分页数据
        let returnObj = this.splitArr(this.get('tmpData').slice(0), pageData.pageSize),
            groupData = returnObj.hash; // 返回一个对象

        this.set('data', groupData[pageData.pageNo]);
        this.set('ajaxpc', $.extend(true, {}, ajaxpc, pageData));
    }
});


export default TableModel;