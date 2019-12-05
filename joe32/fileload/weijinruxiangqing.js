const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')
const xlsx = require('node-xlsx');
const fs = require('fs')

const uploadUrl = "./static/upload";

router.post("weijinru", async (ctx) => {
 
  let a = ctx.request.body

  let {num3,num4,num2} = a

const file=ctx.request.files.file;

file.name = num2+file.name
const reader=fs.createReadStream(file.path);


let filePath=uploadUrl

let fileResource=filePath+`/${file.name}`;
if(!fs.existsSync(filePath)){  //判断staic/upload文件夹是否存在，如果不存在就新建一个

fs.mkdir(filePath,(err)=>{

if(err){
console.log(123)
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
  
console.log(file.name,111)

let shuzi= await ceshi('fileload')
.where({bao:num2})
.select('id')




if(shuzi !=''){
   shuzi1= await ceshi('fileload')
  .where({id:shuzi[0].id})
  .update({weijinruxiangqing:file.name})
}
else{
   shuzi1= await ceshi('fileload')
  .insert({weijinruxiangqing:file.name,bao:num2})
  
}

var obj = xlsx.parse("./static/upload/"+file.name)
// console.log(obj,123)
// console.log(obj[0].name)
// console.log(obj[0].data)
 let newshuju = obj[0].data
  


 let weijinru = await ceshi('weijinruxiangqing')
 .where({zhaobiaonum:num3})
 .select('id')
 console.log(weijinru,7777)


  let add = ''
if(weijinru !=''){
  // console.log(111)
for(var t =1;t<newshuju.length;t++){
  let abc = weijinru
  // console.log(abc[t-1].id)
  add = await ceshi('weijinruxiangqing')
  .where({id:abc[t-1].id})
  .update({zhaobiaonum:newshuju[t][0],fenbiaonum:newshuju[t][1],fenbiaoname:newshuju[t][2],
bao:newshuju[t][3],danwei:newshuju[t][4],toubiaoren:newshuju[t][5],yuanyin:newshuju[t][6]})
}


}
else{
  // console.log(121)
  for(var t =1;t<newshuju.length;t++){
 

  add = await ceshi('weijinruxiangqing')
  .insert({zhaobiaonum:newshuju[t][0],fenbiaonum:newshuju[t][1],fenbiaoname:newshuju[t][2],
    bao:newshuju[t][3],danwei:newshuju[t][4],toubiaoren:newshuju[t][5],yuanyin:newshuju[t][6]})
}

}




//删除开标一览表数据
let  weijinru1 = await ceshi('weijinruxiangqing')
.where({zhaobiaonum:num3})
.select('toubiaoren')

console.log(weijinru1,123)
let zhaobiao =await ceshi('kaibiaoyilanbiao')
.where({zhaobiaonum:num3})
.select('id','toubiaorenname','fenbiaoname')
console.log(zhaobiao,456)


for(var j=0;j<zhaobiao.length;j++){
for(var o=0;o<weijinru1.length;o++){
  if(zhaobiao[j].toubiaorenname==weijinru1[o].toubiaoren
    &&zhaobiao[j].fenbiaoname==weijinru1[o].fenbiaoname
    &&zhaobiao[j].baonum==weijinru1[o].bao){
    console.log(12311)
    let zhaquchu =await ceshi('kaibiaoyilanbiao')
    .where({id:zhaobiao[j].id})
    .del()
  }
}


}
 





if(add>0){
    ctx.response.body={

              url:`/${file.name}` ,
              list:'ok'
        //返给前端一个url地址
        
        }
}









}


})

module.exports = router