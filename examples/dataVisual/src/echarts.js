// 引入echarts
var echarts = require('echarts');

// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('main1'));
var myChart2 = echarts.init(document.getElementById('main2'));
var myChart3 = echarts.init(document.getElementById('main3'));

// 绘制柱状图
myChart1.setOption({
    title: { text: 'ECharts入门示例' },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
});

// 绘制南丁格尔图
myChart2.setOption({
    title: { text: '南丁格尔图' },
    backgroundColor: '#2c343c',
    textStyle: {
        color: 'rgba(255, 255, 255, 0.3)'
    },
    labelLine: {
        normal: {
            lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
            }
        }
    },
    series: [{
        name: '访问来源',
        type: 'pie',
        radius: '50%', // 圆的半径
        roseType: 'angle', // 通过半径表示数据的大小
        data: [{
                value: 400,
                name: '搜索引擎'
            },
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 274, name: '联盟广告' },
            { value: 235, name: '视频广告' }
        ]
    }],
    itemStyle: { // 阴影配置
        normal: {
            color: '#c23531',
            shadowBlur: 200,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        emphasis: { // 鼠标hover时的高亮样式
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
    },
    visualMap: {
        // 不显示 visualMap 组件，只用于明暗度的映射
        show: false,
        // 映射的最小值为 80
        min: 80,
        // 映射的最大值为 600
        max: 600,
        inRange: {
            // 明暗度的范围是 0 到 1
            colorLightness: [0, 1]
        }
    }
});
