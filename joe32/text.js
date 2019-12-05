// var koa=require("koa");

// var fs=require("fs");

// var path=require("path");

// var router=require("koa-router")();

// var static=require("koa-static");

// var bodyParser=require("koa-bodyparser");

// var koaBody=require("koa-body")

// var fs=require("fs")

// var app=new koa();

// const uploadUrl="http://hocalhost:8989/static/upload";

// var xlsx = require('node-xlsx');

// var toPdf = require("office-to-pdf");

// var docxConverter = require('docx-pdf');

// var converter = require('office-converter')();

//  

// //配置中间件，注意顺序

// app.use(bodyParser());

// app.use(koaBody({

// multipart:true,

// formidable:{

//     maxFieldsSize:10*1024*1024,

//     multipart:true

// }

// }))

// app.use(router.routes())

// app.use(router.allowedMethods())

// app.use(static(__dirname,"/static"))

// //配置路由
// router.get("/",(ctx)=>{
//     ctx.body = fs.readFileSync("./index.html","utf-8");
// });
// router.get("/",async(ctx)=>{

//      ctx.response.type = 'html';  //注意设置文件头很重要。如果不设置，打开首页会进入下载

//     ctx.response.body=fs.createReadStream(__dirname+'/static/form.html');

// })

// router.post("/upload", async (ctx)=>{

// const file=ctx.request.files.file;

// let id =1 

// file.name = id+file.name

// console.log(file.name,123)
// var newFile = file.name.split('.')[0]
// console.log(newFile)
// //截取文件名

// const reader=fs.createReadStream(file.path);

// let filePath=__dirname+"/static/upload/";
// let filePathPdf = __dirname+"/static/upload-pdf/";


// let fileResource=filePath+`/${file.name}`;

// if(!fs.existsSync(filePath)){  //判断staic/upload文件夹是否存在，如果不存在就新建一个

// fs.mkdir(filePath,(err)=>{

// if(err){

// throw new Error(err)

// }else{

// let upstream=fs.createWriteStream(fileResource);
// console.log('ok')
// var wordBuffer = fs.readFileSync(fileResource);
// toPdf(upstream).then(
    
//     (pdfBuffer) => {
//         console.log('okk')
//       fs.writeFileSync(filePath, pdfBuffer)
//     }, (err) => {
//       console.log(err)
//     }
//   )



// reader.pipe(upstream);

// ctx.response.body={

// url:uploadUrl+`/${file.name}`

// }

// }

// })

// }else{

// let upstream=fs.createWriteStream(fileResource)



// docxConverter(fileResource,filePathPdf+newFile+'.pdf',function(err,result){
//     if(err){
//       console.log(err,111);
//     }
//     console.log('result'+result);
//   });
  
 


// reader.pipe(upstream);


// ctx.response.body={

// url:uploadUrl+`/${file.name}` //返给前端一个url地址

// }

// }

// })




// router.get("/duqu",(ctx)=>{
    

// //读取文件内容
// var obj = xlsx.parse(__dirname+'/static/upload/接口文档.xlsx');
// var excelObj=obj[0].data;
// console.log(excelObj);
// var data = [];
// for(var i in excelObj){
//   var arr=[];
//   var value=excelObj[i];
//   for(var j in value){
//     arr.push(value[j]);
//   }
//   data.push(arr);
// }
// var buffer = xlsx.build([
//   {
//     name:'sheet1',
//     data:data
//   }
// ]);
// //将文件内容插入新的文件中
// //  fs.writeFileSync('test1.xlsx',buffer,{'flag':'w'});

// ctx.body = buffer




// });
// app.listen(8989)
// console.log(111)
