var mime = require('mime'); //這個npm模組可以確認副檔名
var url = require('url'); //可設定要得到的路徑內容
var fs = require('fs'); //模組
var http = require('http');
var http = require('crypto'); //這個模組可以定義演算法

var server = http.createServer(function(request,response){
    var pathname= url.parse(request.url).pathname; //網址不取到get參數
    // console.log(pathname);
    if(pathname.endsWith('/')){ //如果結尾是斜線，就加上index.html
        pathname += 'index.html';
    }
    var relativePathname = decodeURIComponent((process.argv[2] || ".")+ pathname); //process.argv[2]判斷是否有啟動參數，沒有的話帶 '.' , 下面程式碼的 '.'要刪除
    fs.stat(relativePathname, function(err,stats){
        if(!err && stats.isDirectory()){ //判斷是否為資料夾
            response.writeHead(302,{//轉址
                'Location': pathname + "/" + (url.parse(request.url).search || "")
            })
            response.end();
            return;
        }
        if(!err && stats.isFile()){
            //err空的且stats是個檔案
            fs.readFile(relativePathname,function(err,html){
                if(!err){ //err是空的，代表沒有錯誤
                    var hash = crypto.createHash('sha1').update(html).digest('base64');
                    if (request.headers['if-none-match'] == hash) {
                        response.writeHead(304);
                        response.end();
                        return;
                    } 
                    response.writeHead(200,{
                        "Content-Type": mime.getType(pathname),
                        "Etag": hash
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