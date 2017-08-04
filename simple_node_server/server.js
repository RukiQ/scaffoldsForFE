var http = require('http');
var url = require('url');
// var querystring = require('querystring');

http.createServer(function(req, res) {
    // CORS：是否允许跨域
    /*res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Credentials', true); */
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // 处理 get 请求
    var params = url.parse(req.url, true).query;
    res.end(params.str);

    // JSONP
    // res.end("cb('This is JSONP realized by jQuery.')");
    
    // 处理 post 请求
    /* var post = '';
    req.on('data', function(chunk) {
        post += chunk;
    });

    req.on('end', function() {
        post = querystring.parse(post);
        res.write('请求类型：' + post.method);
        res.write('<br />');
        res.write('姓名：' + post.name);
        res.end();
    });*/
}).listen(8888);

console.log('Server has started');
