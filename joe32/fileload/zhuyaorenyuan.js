const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')
const xlsx = require('node-xlsx');
const fs = require('fs')

const uploadUrl = "./static/upload";

router.post("zhuyaorenyuan", async (ctx) => {

  let a = ctx.request.body

  let {num2} = a

const file=ctx.request.files.file;

file.name = num2+file.name
const reader=fs.createReadStream(file.path);


let filePath=uploadUrl

let fileResource=filePath+`/${file.name}`;;

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

let shuzi= await ceshi('fileload')
.where({bao:num2})
.select('id')
console.log(shuzi)


if(shuzi != ''){
  let shuzi1= await ceshi('fileload')
  .where({id:shuzi[0].id})
  .update({zhuyaorenyuan:file.name})
}
else{
  let shuzi1= await ceshi('fileload')
  .insert({zhuyaorenyuan:file.name,bao:num2})
  
}

var obj = xlsx.parse('./static/upload/'+file.name)
// console.log(obj,123)
// console.log(obj[0].name)
console.log(obj[0].data)
 let newshuju = obj[0].data

 console.log(newshuju.length)
 for(var l=0;l<newshuju.length;l++){
   console.log(newshuju[l][10])
   if(newshuju[l][0] == undefined){
    newshuju[l][0]==''
   }
   if(newshuju[l][1] == undefined){
    newshuju[l][1]==''
  }
  if(newshuju[l][2] == undefined){
    newshuju[l][2]==''
  }
  if(newshuju[l][3] == undefined){
    newshuju[l][3]==''
  }
  if(newshuju[l][4] == undefined){
    newshuju[l][4]==''
  }
  if(newshuju[l][5] == undefined){
    newshuju[l][5]==''
  }
  if(newshuju[l][6] == undefined){
    newshuju[l][6]==''
  }
  if(newshuju[l][7] == undefined){
    newshuju[l][7]==''
  }
  if(newshuju[l][8] == undefined){
    newshuju[l][8]==''
  }
  if(newshuju[l][9] == undefined){
    newshuju[l][9]==''
  }
  if(newshuju[l][10] == undefined){
    newshuju[l][10]==''
  }
  if(newshuju[l][11] == undefined){
    newshuju[l][11]==''
  }
  
 }
 console.log(newshuju,000)
  


 let weijinru = await ceshi('zhuyaorenyuan')
 .where({bao:num2})
 .select()
 console.log(weijinru)
 






  let add = ''
if(weijinru !=''){
  console.log(111)
for(var t =1;t<newshuju.length;t++){
  let abc = weijinru
  console.log(abc[t-1].id)
  add = await ceshi('zhuyaorenyuan')
  .where({id:abc[t-1].id})
.update({zhaobiaonum:newshuju[t][0],fenbiaonum:newshuju[t][1],fenbiaoname:newshuju[t][2],
bao:newshuju[t][3],danwei:newshuju[t][4],toubiaoren:newshuju[t][5],jingli:newshuju[t][6],
shenfenzheng:newshuju[t][7],zhengshu1:newshuju[t][8],zhengshunum1:newshuju[t][9],
zhengshu2:newshuju[t][10],zhengshunum2:newshuju[t][11]
})
}


}
else{
  console.log(121)
  for(var t =1;t<newshuju.length;t++){
 

  add = await ceshi('zhuyaorenyuan')
  .insert({zhaobiaonum:newshuju[t][0],fenbiaonum:newshuju[t][1],fenbiaoname:newshuju[t][2],
    bao:newshuju[t][3],danwei:newshuju[t][4],toubiaoren:newshuju[t][5],jingli:newshuju[t][6],
    shenfenzheng:newshuju[t][7],zhengshu1:newshuju[t][8],zhengshunum1:newshuju[t][9],
    zhengshu2:newshuju[t][10],zhengshunum2:newshuju[t][11]})
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