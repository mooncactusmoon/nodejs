var fs = require('fs'); //模組
var http = require('http');
var server = http.createServer(function(request,response){
    response.writeHead(200,{
        "Content-Type": "text/html"
    })
    var html=fs.readFileSync("./index.html"); //同步讀取
    response.write(html); //可以寫很多個response.write
    response.end(); //結尾一定要加上response.end
});
server.listen(3000,'127.0.0.1');