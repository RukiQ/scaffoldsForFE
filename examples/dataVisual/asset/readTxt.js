/*
 * @Author: Ruth
 * @Date:   2016-12-13 10:40:41
 * @Last Modified by:   Ruth92
 * @Last Modified time: 2017-03-08 20:23:43
 */

'use strict';

// 按行读取文本
var readline = require('readline');
var fs = require('fs');
var os = require('os');

var fWriteName = __dirname + 'sketch_list.txt';

fs.readdirSync(__dirname + '/download/').forEach(function(filename) {

    fs.appendFile(fWriteName, filename + os.EOL, function(err, data) {
        console.log('读取文件：' + filename);
    });

    /*if (filename.lastIndexOf('txt') > 0) {
        console.log(filename);
    }*/

    // var fReadName = filename;
    // var fWriteName = __dirname + '/objs2/' + filename;

    // var fRead = fs.createReadStream(fReadName);
    /*var fWrite = fs.createWriteStream(fWriteName);
    fWrite.write(filename + os.EOL);

    console.log('the end');*/

    /*
    var objReadline = readline.createInterface({
        input: fRead,
        // 这是另一种复制方式，这样on('line')里就不必再调用fWrite.write(line)，当只是纯粹复制文件时推荐使用  
        // 但文件末尾会多算一次index计数   sodino.com  
        //  output: fWrite,   
        //  terminal: true  
    });

    var index = 1;
    objReadline.on('line', (line) => {
        // var imgPath = line.slice(line.indexOf(' ') + 1, line.lastIndexOf(' '));
        fWrite.write(line + os.EOL); // 下一行  
        index++;
    });

    objReadline.on('close', () => {
        console.log('readline close...');
    });*/
});