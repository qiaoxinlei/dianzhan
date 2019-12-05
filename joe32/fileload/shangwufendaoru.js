const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')
const xlsx = require('node-xlsx');
const fs = require('fs')

const uploadUrl = "./static/upload";

router.post("shangwufen", async (ctx) => {
 
  let a = ctx.request.body

  let {num2,num3,num4} = a
  console.log(a)

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


if(shuzi !=''){
  let shuzi1= await ceshi('fileload')
  .where({bao:num2})
  .update({shangwufen:file.name})
}
else{
  let shuzi1= await ceshi('fileload')
  .insert({shangwufen:file.name,bao:num2})
  
}


var obj = xlsx.parse("./static/upload/"+file.name)
console.log(obj,123)
console.log(obj[0].data)
// let  bao11 = (obj[0].data[1][0])

// function getCaption(obj){
//   var index=obj.lastIndexOf("\包号");
//   obj=obj.substring(index+1,obj.length);
//  console.log(obj.slice(2,14));
//   return obj.slice(2,14);
// }
// // var str=" 执法办案流程-立案审批";
// console.log(getCaption(bao11)) 

// let baobao = getCaption(bao11).trim()
let baobao = obj[0].name.trim()
var list1 = obj[0].data[3]
// console.log(list1)
var list2 = []
for( i=3;i<list1.length;i++){
    // console.log(list1[i])
    list2.push(list1[i])
    i++
}
// console.log(list2,1111)



var list3 = obj[0].data

var list4 = []
for(a=4;a<list3.length-1;a++){
    // console.log(list3[a])
    // list4.push(list3[a])
    var list5=[]
  for(z =4;z<list3[a].length;z++){
    //   list4=[]
   
    //   console.log(list3[a][z],123)
      list5.push(list3[a][z])
      z++
  }
  list4.push(list5)
}

// console.log(list4,111111111)

// for (var n = 0 ;n<list4.length;n++){
//     console.log(list4[n])
//     for (var l =0;l<list4[n].length;l++){
//         console.log(list4[n][l])
//     }
// }

function execSum(supplierArr,supplierScoreArr){
    let scoreMap = {};
    supplierScoreArr.forEach(function(ste1Value, ste1Index, ste1Array) {
        ste1Value.forEach(function(ste2Value, ste2Index, ste2Array) {
            let indexScore = scoreMap[supplierArr[ste2Index]];
            if(!indexScore){
                scoreMap[supplierArr[ste2Index]]=ste2Value;
            }else{
                scoreMap[supplierArr[ste2Index]]=indexScore+ste2Value;
            }
        });
    });
    let resultArr = [];
    supplierArr.forEach(function(ste1Value, ste1Index, ste1Array) {
        let item = {supplierName:ste1Value,supplierValue:scoreMap[ste1Value]};
        resultArr.push(item)
    });
    return resultArr;
}
console.log(execSum(list2,list4))

let newshuju = execSum(list2,list4)

console.log(baobao)
if(baobao!=num2){
  ctx.body = 'ng'
}else{
  let chaxun = await ceshi('shangwufen')
  .where({zhaobiaonum:num3,fenbiaoname:num4,bao:num2})
  .select('id')
  console.log(chaxun,99999999999999999)


  let newshangwu = ''
  for(var p=0;p<newshuju.length;p++){
      if(chaxun !=''){
           console.log(777)
           newshangwu = await ceshi('shangwufen')
          .where({id:chaxun[p].id})
          .update({fenshu:newshuju[p].supplierValue,toubiaoren:newshuju[p].supplierName,bao:baobao})
      }
      else{
        console.log(888)
           newshangwu = await ceshi('shangwufen')
          
          .insert({fenshu:newshuju[p].supplierValue,toubiaoren:newshuju[p].supplierName,bao:baobao,zhaobiaonum:num3,
          fenbiaoname:num4})

      }
      
 }

console.log(newshangwu)




if(newshangwu>0){
  ctx.body={

            url:`/${file.name}` ,
            list:'ok'
      //返给前端一个url地址
      
      }
}


  
}










}


})

module.exports = router