var http = require('http');
var server = http.createServer(function(request,response){
    response.write('Hello World :>'); //可以寫很多個response.write
    response.end(); //結尾一定要加上response.end
});
server.listen(3000,'127.0.0.1');