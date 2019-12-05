const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')
const xlsx = require('node-xlsx');
const fs = require('fs')

const uploadUrl = "./static/upload";

router.post("zuigaoxianjia", async (ctx) => {
 
  let a = ctx.request.body

  let {num2} = a

const file=ctx.request.files.file;

file.name = num2+file.name
const reader=fs.createReadStream(file.path);


let filePath=uploadUrl

let fileResource=filePath+`/${file.name}`;
if(!fs.existsSync(filePath)){  //判断staic/upload文件夹是否存在，如果不存在就新建一个

fs.mkdir(filePath,(err)=>{

if(err){

throw new Error(err)

}
else{

let upstream=fs.createWriteStream(fileResource);

reader.pipe(upstream);


var obj = xlsx.parse('./static/upload/2.xls')
console.log(obj)
ctx.response.body={

url:uploadUrl+`/${file.name}`

}

}

})

}
else{

let upstream=fs.createWriteStream(fileResource)

reader.pipe(upstream);
  

// var obj = xlsx.parse('./static/upload/2.xls')
// console.log(obj[0].data)
//转化 excel文件
console.log(file.name)

// var ceshi = require('./data-connection/users')

let shuzi= await ceshi('fileload')
.where({bao:num2})
.select('id')
console.log(shuzi)


if(shuzi != ''){
  let shuzi1= await ceshi('fileload')
  .where({id:shuzi[0].id})
  .update({zuigaoxianjia:file.name})
}
else{
  let shuzi1= await ceshi('fileload')
  .insert({zuigaoxianjia:file.name,bao:num2})
  
}

ctx.response.body={

        url:`/${file.name}`,
        code:200
  
  }

}


})

module.exports = router