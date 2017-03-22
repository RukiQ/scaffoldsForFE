/*
 * @Author: Ruth
 * @Date:   2017-02-28 11:28:11
 * @Last Modified by:   Ruth
 * @Last Modified time: 2017-03-08 18:05:18
 */

'use strict';

/**
 * hexbin 测试
 */

require('d3');
var d3_hexbin = require('d3-hexbin');

var root = {
    "nodes": [{
        "name": "云天河",
        "image": "../asset/img/airplane.png"
    }, {
        "name": "韩菱纱",
        "image": "../asset/img/ant.png"
    }, {
        "name": "柳梦璃",
        "image": "../asset/img/bug.png"
    }, {
        "name": "慕容紫英",
        "image": "../asset/img/head.png"
    }, , {
        "name": "慕容紫英",
        "image": "../asset/img/car.png"
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


var margin = {
        top: 50,
        right: 20,
        bottom: 30,
        left: 40
    },
    width = 800 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var randomX = d3.random.normal(width / 2, 80),
    randomY = d3.random.normal(height / 2, 80),
    points = d3.range(399).map(function(i) {
        var image;

        if (i < 9) {
            image = '../asset/102_shrec2012png/D0000' + (i + 1) + 'view/0.png';
        } else if (i < 99) {
            image = '../asset/102_shrec2012png/D000' + (i + 1) + 'view/0.png';
        } else {
            image = '../asset/102_shrec2012png/D00' + (i + 1) + 'view/0.png';
        }

        // return [randomX(), randomY(), root.nodes[i].image];
        return [randomX(), randomY(), image];
    });

var color = d3.scale.linear()
    .domain([0, 16])
    .range(["rgb(237, 242, 247)", "rgb(0, 92, 155)"])
    .interpolate(d3.interpolateLab);

var hexbin = d3_hexbin.hexbin().radius(24);

/*var x = d3.scale.identity()
    .domain([0, width]);

var y = d3.scale.linear()
    .domain([0, height])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(6, -height);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(6, -width);*/

var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("class", "mesh")
    .attr("width", width)
    .attr("height", height);

svg.append("g")
    .attr("class", "grp grpHex")
    .attr("clip-path", "url(#clip)")
    .selectAll(".hexagon")
    .data(hexbin(points))
    .enter()
    .append("path")
    .attr("class", "hexagon")
    .attr("d", hexbin.hexagon())
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    })
    .style("fill", function(d) {
        return color(d.length);
    })
    .on('mouseover', function(d, i) {
        d3.select(this)
            .style('stroke', 'rgb(0, 32, 136)')
            .style('stroke-width', '3px')
    })
    .on('mouseout', function(d, i) {
        d3.select(this)
            .style('stroke', '#000')
            .style('stroke-width', '.5px')
    })

var img_w = 30,
    img_h = 30;

svg.append("g")
    .attr("class", "grp gIcon")
    .selectAll('image')
    .data(hexbin(points))
    .enter()
    .append('image')
    .attr('width', img_w)
    .attr('height', img_h)
    .attr('xlink:href', function(d) {
        return d[0][2];
    })
    .attr("x", function(d) {
        return d.x - img_w / 2;
    })
    .attr("y", function(d) {
        return d.y - img_h / 2;
    })
    .on('mouseover', function(d, i) {
        /*d3.select(this)
            .attr("opacity", "0")*/
    })


/*svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);*/