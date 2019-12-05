const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')
const fs = require('fs')
const uploadUrl = "./static/upload";

router.post("falv", async (ctx) => {

  let a = ctx.request.body
console.log(a)
  let {wangzhi,type} = a

const file=ctx.request.files.file;

const reader=fs.createReadStream(file.path);

let filePath=uploadUrl

let fileResource=filePath+`/${file.name}`;

console.log(__dirname)

if(!fs.existsSync(filePath)){  //判断staic/upload文件夹是否存在，如果不存在就新建一个

fs.mkdir(filePath,(err)=>{

if(err){

throw new Error(err)

}
else{

let upstream=fs.createWriteStream(fileResource);

reader.pipe(upstream);

ctx.response.body={

url:uploadUrl+`/${file.name}`

}

}

})

}
else{

let upstream=fs.createWriteStream(fileResource)

reader.pipe(upstream);
  
console.log(file.name)

let shuzi= await ceshi('caigouwenjian')
.select()

let qiao = shuzi.map(ind =>{
  return ind.filename
})


if(qiao.includes(file.name)){
  let shuzi1= await ceshi('caigouwenjian')
  .where({filename:file.name})
  .update({filename:file.name,wangzhi:wangzhi,type:type})

}
else{
  let shuzi1= await ceshi('caigouwenjian')
  .insert({filename:file.name,wangzhi:wangzhi,type:type})

}


ctx.response.body={

      url:`/${file.name}` //返给前端一个url地址

}

}


})

module.exports = router