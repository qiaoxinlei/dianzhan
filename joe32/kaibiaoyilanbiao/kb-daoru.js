const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')


router.post('kbyilanbiao',async ctx =>{
    let m =  ctx.request.body
    console.log(m)
    let {id,ip}  = m 
    let list = JSON.parse(id)
    // console.log(id,1232131,ip)

  //   let biao = list.map(ind =>{
  //     return ind.分标名称
  // })
  
  // function uniq(array){
  //     var temp = []; //一个新的临时数组
  //     for(var i = 0; i < array.length; i++){
  //         if(temp.indexOf(array[i]) == -1){
  //             temp.push(array[i]);
  //         }
  //     }
  //     return temp;
  // }
  // let num4 = (uniq(biao))
  // console.log(num4,777)

  let bao = list.map(ind =>{
    return ind.包号
})

function uniq(array){
    var temp = []; //一个新的临时数组
    for(var i = 0; i < array.length; i++){
        if(temp.indexOf(array[i]) == -1){
            temp.push(array[i]);
        }
    }
    return temp;
}
let num2 = (uniq(bao))
console.log(num2,777)

  let num3 = list[0].招标编号
  let num4 = list[0].分标名称
    let joe = await ceshi('kaibiaoyilanbiao')
 .where({zhaobiaonum:list[0].招标编号,fenbiaoname:list[0].分标名称})
 .select('id')
 console.log(joe,111)
    
    var shuzi = 0
    var z = list.length
    console.log(z)
    var j = list
    for(let l =0;l<z;l++){
        console.log(111)
      if(j[l].招标编号==undefined){
        j[l].招标编号==''
      }
      if(j[l].分标编号==undefined){
        j[l].分标编号==''
      }
      if(j[l].分标名称==undefined){
        j[l].分标名称==''
      }
      if(j[l].包号==undefined){
        j[l].包号==''
      }
      if(j[l].项目单位==undefined){
        j[l].项目单位==''
      }
      if(j[l].投标人名称==undefined){
        j[l].投标人名称==''
      }
      if(j[l].投标总价==undefined){
        j[l].投标总价==''
      }
      if(j[l].备用金==undefined){
        j[l].备用金==''
      }
      if(j[l].安措费==undefined){
        j[l].安措费==''
      }
      if(j[l].控股股东或上级管理单位名称==undefined){
        console.log(123)
        j[l].控股股东或上级管理单位名称==''
      }
      // if(j[l].项目经理==undefined){
      //   j[l].项目经理==''
      // }
      // if(j[l].身份证号==undefined){
      //   j[l].身份证号==''
      // }




 if(joe !=''){
   console.log(999)
   console.log(joe[l].id,l)
   shuzi= await ceshi('kaibiaoyilanbiao')
   .where({id:joe[l].id})
   .update({zhaobiaonum:j[l].招标编号,fenbiaonum:j[l].分标编号,
   fenbiaoname:j[l].分标名称,baonum:j[l].包号,xiangmulist:j[l].项目单位,
   toubiaorenname:j[l].投标人名称,toubiaorenzongajia:j[l].投标总价-j[l].备用金-j[l].安措费,
   beiyongjin:j[l].备用金,last:j[l].安措费,shangji:j[l].控股股东或上级管理单位名称
  //  jingli:j[l].项目经理,shenfenzhenghao:j[l].身份证号
  })
 }
 else{
   console.log(888)
  shuzi= await ceshi('kaibiaoyilanbiao')
  .insert({zhaobiaonum:j[l].招标编号,fenbiaonum:j[l].分标编号,
   fenbiaoname:j[l].分标名称,baonum:j[l].包号,xiangmulist:j[l].项目单位,
   toubiaorenname:j[l].投标人名称,toubiaorenzongajia:j[l].投标总价-j[l].备用金-j[l].安措费,
   beiyongjin:j[l].备用金,last:j[l].安措费,shangji:j[l].控股股东或上级管理单位名称
  //  jingli:j[l].项目经理,shenfenzhenghao:j[l].身份证号
  })
 }






    }
    
    

    console.log(shuzi)
    if(shuzi>0){
        ctx.body={
          num2:num2,
          num3:num3,
          num4:num4,
          code:200

        }
    }
    }) 
    module.exports = router