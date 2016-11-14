let TableModel = Backbone.Model.extend({

    default: {
        params: {},
        data: [],
        counts:{
            totalLen : 0,
            filterLen: 0
        }
    },
  
    initialize () {
        this.sync();
    },

    sync () {
        let that = this;

        $.ajax({
            url: '/test/data.json',
            type: 'GET',
            dataType: 'json',
            data: that.get('params')
        }).done(function(data) {
            that.set('data', data.data);

            if (that.get('params')) {
                that.filterData(that.get('params'), that.get('data'));
            }

            that.set('counts', { 
                totalLen: data.data.length,
                filterLen: that.get('data').length
            });

        });
    },

    filterData (params, data) {

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

        if (params.beginTime) {
            beginTime = (params.beginTime).replace(/\-/g, '');
        } else {
            beginTime = '';
        }

        if (params.endTime) {
            endTime = (params.endTime).replace(/\-/g, '');
        } else {
            endTime = '';
        }

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

        this.set('data', data);
    }
});


export default TableModel;