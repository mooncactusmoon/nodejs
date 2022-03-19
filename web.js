var mime = require('mime'); //這個npm模組可以確認副檔名
var url = require('url'); //可設定要得到的路徑內容
var fs = require('fs'); //模組
var http = require('http');
var server = http.createServer(function(request,response){
    var pathname= url.parse(request.url).pathname; //網址不取到get參數
    // console.log(pathname);
    fs.stat('.' + pathname, function(err,stats){
        if(!err && stats.isFile()){
            //err空的且stats是個檔案
            fs.readFile("./index.html",function(err,html){
                if(!err){ //err是空的，代表沒有錯誤
                    response.writeHead(200,{
                        "Content-Type": mime.getType(pathname)
                    })
                    response.write(html); //可以寫很多個response.write
                    response.end(); //結尾一定要加上response.end
                }
            });
        }else{
            response.writeHead(404); //檔案不存在
            response.write('Not Found'); //可放錯誤頁面
            response.end();
        }
    })
    
});
server.listen(3000,'127.0.0.1');