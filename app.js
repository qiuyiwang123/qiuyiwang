let http = require('http');

let path =require('path');

let fs =require('fs');

let mime = require('mime');


let rootPath = path.join(__dirname,'www');
console.log(rootPath);

http.createServer((request,response)=>{

let filepatn = path.join(rootPath,request.url)
// console.log(filepatn);
if(fs.existsSync(filepatn)){
    //存在
    //是否是文件夹
    if(filepatn[filepatn.length-1]=='\\'){
        //文件夹
        console.log(filepatn,'是文件夹');
    }else{
        //文件
        console.log(filepatn,'是文件');
         // 读取文件 返回读取的文件
         fs.readFile(filepatn,(err,data)=>{
            console.log(filepatn,'读取文件完毕 返回');
             // 自行判断 后缀名(.js .css .html .jpg .png .gif .ico)
                // mime类型
                // if else if else
                // 查找是否有人实现了 类似的功能
                response.writeHead(200,{
                    'content-type':mime.getType(filepatn)
                })
                if(err){
                    console.log(err);
                }else{
                    response.end(data);
                }
         })

    }
   
}else{
    //不存在
    response.writeHead(404,{
        'content-type':"text/html;charset=utf-8"
    })
    response.end(`
        <h1> not 404 found</h1>
        <p>页面不存在</p>
    `)
}

}).listen(80,'127.0.0.1',()=>{
    console.log('坚挺成功');
})