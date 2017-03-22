/*
 * @Author: Ruth
 * @Date:   2017-03-07 16:04:33
 * @Last Modified by:   Ruth92
 * @Last Modified time: 2017-03-08 16:56:38
 */

'use strict';

// 力导向图

require('d3');

var root = {
    "nodes": [{
        "name": "云天河",
        "image": "../asset/img/tianhe.png"
    }, {
        "name": "韩菱纱",
        "image": "../asset/img/lingsha.png"
    }, {
        "name": "柳梦璃",
        "image": "../asset/img/mengli.png"
    }, {
        "name": "慕容紫英",
        "image": "../asset/img/ziying.png"
    }],
    "edges": [{
        "source": 0,
        "target": 1,
        "relation": "挚友"
    }, {
        "source": 0,
        "target": 2,
        "relation": "挚友"
    }, {
        "source": 0,
        "target": 3,
        "relation": "挚友"
    }]
};

var width = 800,
    height = 800;

var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// 布局
var force = d3.layout.force()
    .nodes(root.nodes)
    .links(root.edges)
    .size([width, height])
    .linkDistance(200)
    .charge(-1500)
    .start();

// 绘制直线
var edges_line = svg.selectAll('line')
    .data(root.edges)
    .enter()
    .append('line')
    .style('stroke', '#ccc')
    .style('stroke-width', 1);

// 绘制直线上的文字
var edges_text = svg.selectAll('.linetext')
    .data(root.edges)
    .enter()
    .append('text')
    .attr('class', 'linetext')
    .text(function(d) {
        return d.relation;
    });

var img_w = 30,
    img_h = 30;

// 绘制节点的图片和文字
var nodes_img = svg.selectAll('image')
    .data(root.nodes)
    .enter()
    .append('image')
    .attr('width', img_w)
    .attr('height', img_h)
    .attr('xlink:href', function(d) {
        return d.image;
    })
    .on('mouseover', function(d, i) {
        // 显示连接线上的文字
        edges_text.style('fill-opacity', function(edge) {
            if (edge.sorce === d || edge.target === d) {
                return 1.0;
            }
        });
    })
    .on('mouseout', function(d, i) {
        // 隐藏连接线上的文字
        edges_text.style('fill-opacity', function(edge) {
            if (edge.source === d || edge.target === d) {
                return 0.0;
            };
        });
    })
    .call(force.drag);

var text_dx = -20;
var text_dy = 20;

var nodes_text = svg.selectAll('.nodetext')
    .data(root.nodes)
    .enter()
    .append('text')
    .attr('class', 'nodetext')
    .attr('dx', text_dx)
    .attr('dy', text_dy)
    .text(function(d) {
        return d.name;
    });

force.on("tick", function() {

    //限制结点的边界
    /*root.nodes.forEach(function(d, i) {
        d.x = d.x - img_w / 2 < 0 ? img_w / 2 : d.x;
        d.x = d.x + img_w / 2 > width ? width - img_w / 2 : d.x;
        d.y = d.y - img_h / 2 < 0 ? img_h / 2 : d.y;
        d.y = d.y + img_h / 2 + text_dy > height ? height - img_h / 2 - text_dy : d.y;
    });*/

    //更新连接线的位置
    edges_line
        .attr("x1", function(d) {
            return d.source.x;
        })
        .attr("y1", function(d) {
            return d.source.y;
        })
        .attr("x2", function(d) {
            return d.target.x;
        })
        .attr("y2", function(d) {
            return d.target.y;
        });

    //更新连接线上文字的位置
    edges_text
        .attr("x", function(d) {
            return (d.source.x + d.target.x) / 2;
        })
        .attr("y", function(d) {
            return (d.source.y + d.target.y) / 2;
        });

    //更新结点图片和文字
    nodes_img
        .attr("x", function(d) {
            return d.x - img_w / 2;
        })
        .attr("y", function(d) {
            return d.y - img_h / 2;
        });

    nodes_text.attr("x", function(d) {
            return d.x
        })
        .attr("y", function(d) {
            return d.y + img_w / 2;
        });
});