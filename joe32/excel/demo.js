// const Router = require('koa-router')
// const router = new Router()
// var ceshi = require('../data-connection/users')
// const xlsx = require('node-xlsx');
// const fs = require('fs')

// const uploadUrl = "http://hocalhost:3000/static/upload";

// router.post("demo", async (ctx) => {
//   // console.log(ctx.request.body,111)
//   let a = ctx.request.body
//   let {canshu} = a
//   console.log(canshu)
// // console.log(ctx.request,222)
// const file=ctx.request.files.file;
// console.log(ctx.request.files,123)
// const reader=fs.createReadStream(file.path);

// let filePath=__dirname+"/static/upload/";

// let fileResource=filePath+`/${file.name}`;
// console.log(__dirname)
// if(!fs.existsSync(filePath)){  //判断staic/upload文件夹是否存在，如果不存在就新建一个

// fs.mkdir(filePath,(err)=>{

// if(err){

// throw new Error(err)

// }else{

// let upstream=fs.createWriteStream(fileResource);

// reader.pipe(upstream);

// ctx.response.body={

// url:uploadUrl+`/${file.name}`

// }

// }

// })

// }else{

// let upstream=fs.createWriteStream(fileResource)

// reader.pipe(upstream);

// ctx.response.body={

//       url:uploadUrl+`/${file.name}` //返给前端一个url地址

// }

// }


// })

// module.exports = router