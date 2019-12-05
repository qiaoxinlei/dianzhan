const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')
router.post('gsydaoru',async (ctx) => {
    let m =  ctx.request.body
    let {id}  = m 
let list = JSON.parse(id)
console.log(list)



let dizhi = list.map(ind =>{
    // console.log(ind['建设总工期（月）'],111)
    return ind['供应商名称']
})

function uniq(array){
    var temp = []; //一个新的临时数组
    for(var i = 1; i < array.length; i++){
        if(temp.indexOf(array[i]) == -1){
            temp.push(array[i]);
        }
    }
    return temp;
}
let num2 = (uniq(dizhi))
console.log(num2)

let joe =  await ceshi('gongyingshang')
  .select('suppliersName')
//   console.log(joe)

  let joe1 = joe.map(ind =>{

    return ind.suppliersName
})
// console.log(joe1)

let qiao = 0
let xin = 0

 num2.map((ind,ite) =>{
if(joe1.includes(ind)){
    qiao++
}else{
    xin++
}

 })

    var j = list
    console.log(j.length)
    for(let l =0;l<j.length;l++){
        // console.log(j[l])
       if(j[l]['供应商名称'] == undefined){
        j[l]['供应商名称'] = ''
       }
       if(j[l]['类别'] == undefined){
        j[l]['类别'] = ''
       }
       if(j[l]['简称'] == undefined){
        j[l]['简称'] = ''
       }
       if(j[l]['曾用名'] == undefined){
        j[l]['曾用名'] = ''
       }
       if(j[l]['所属集团'] == undefined){
        j[l]['所属集团'] = ''
       }
       if(j[l]['股东或出资人'] == undefined){
        j[l]['股东或出资人'] = ''
       }
       if(j[l]['企业性质'] == undefined){
        j[l]['企业性质'] = ''
       }
       if(j[l]['所在省份'] == undefined){
        j[l]['所在省份']= ''
       }
       if(j[l]['注册地址'] == undefined){
        j[l]['注册地址'] = ''
       }
       if(j[l]['企业介绍'] == undefined){
        j[l]['企业介绍'] = ''
       }
       if(j[l]['业务范围'] == undefined){
        j[l]['业务范围'] = ''
       }
       
       
  let data = ''
  let data1 = ''
  
  
  let joe =  await ceshi('gongyingshang')
  .select('suppliersName')
  console.log(joe)

  let joe1 = joe.map(ind =>{

    return ind.suppliersName
})


  

let  num = list.map(ind=>{

    return ind['供应商名称']
})

       if(joe1.includes(j[l]['供应商名称'])){

        console.log(1790)


           data =  await ceshi('gongyingshang')
        .where({suppliersName:j[l]['供应商名称']})
        .update({suppliersName:j[l]['供应商名称'],category:j[l]['类别'],abbreviation:j[l]['简称'],
                isbeforeUserNamecc:j[l]['曾用名'],affiliatedGroup:j[l]['所属集团'],investors:j[l]['股东或出资人'],
                enterpriseNature: j[l]['企业性质'],companyProfile:j[l]['企业介绍'],mainMusinessScope:j[l]['业务范围'],
                city:j[l]['所在省份'],registeredAddress:j[l]['注册地址']
        })
        console.log(99)
        // qiao++


       }

       else{
      

          console.log(j[l]['电站名称'],j[l]['站址'],j[l]['总投资（亿元）'],j[l]['装机容量'],j[l]['总装机容量'],
          j[l]['台数'],j[l]['额定水头（米）'],j[l]['工程状态'],j[l]['核准日期'],j[l]['建设总工期（月）'],
          j[l]['开工日期'],j[l]['投运日期']
          )
           data1 =  await ceshi('供应商')
        .insert({suppliersName:j[l]['供应商名称'],category:j[l]['类别'],abbreviation:j[l]['简称'],
        isbeforeUserNamecc:j[l]['曾用名'],affiliatedGroup:j[l]['所属集团'],investors:j[l]['股东或出资人'],
        enterpriseNature: j[l]['企业性质'],companyProfile:j[l]['企业介绍'],mainMusinessScope:j[l]['业务范围'],
        city:j[l]['所在省份'],registeredAddress:j[l]['注册地址']
})
    //    console.log(data1)
    //    xin++
       

       }
  let sele =  await ceshi('gongyingshang')
  .whereIn('suppliersName',num)
  .select()

console.log(qiao,xin)

       if(data>0||data1>0){
        ctx.body={
            data:'ok',
            xiugai:qiao,
            xinzeng:xin,
            shuju:sele
        }
    }else{
        ctx.body='ng'
    }

        // console.log(j[l][0])
       

    }
   
});
module.exports = router