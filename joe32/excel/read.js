const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')
router.post('importexcelxlsx',async (ctx) => {
    let m =  ctx.request.body
    let {id}  = m 
let list = JSON.parse(id)
console.log(list)



let dizhi = list.map(ind =>{
    console.log(ind['建设总工期（月）'],111)
    return ind['电站名称']
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

let joe =  await ceshi('powerStation')
  .select('name')
//   console.log(joe)

  let joe1 = joe.map(ind =>{

    return ind.name
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
        console.log(j[l]['投运日期'])
       if(j[l]['电站名称'] == undefined){
        j[l]['电站名称'] = ''
       }
       if(j[l]['站址'] == undefined){
        j[l]['站址'] = ''
       }
       if(j[l]['总投资（亿元）'] == undefined){
        j[l]['总投资（亿元）'] = ''
       }
       if(j[l]['装机容量'] == undefined){
        j[l]['装机容量'] = ''
       }
       if(j[l]['总装机容量'] == undefined){
        j[l]['总装机容量'] = ''
       }
       if(j[l]['台数'] == undefined){
        j[l]['台数'] = ''
       }
       if(j[l]['工程状态'] == undefined){
        j[l]['工程状态'] = ''
       }
       if(j[l]['建设总工期（月）'] == undefined){
        j[l]['建设总工期（月）']= ''
       }
       if(j[l]['开工日期'] == undefined){
        j[l]['开工日期'] = ''
       }
       if(j[l]['投运日期'] == undefined){
        j[l]['投运日期'] = ''
       }
       if(j[l]['额定水头（米）'] == undefined){
        j[l]['额定水头（米）']= ''
       }
       
  let data = ''
  let data1 = ''
  
  
  let joe =  await ceshi('powerStation')
  .select('name')
  console.log(joe)

  let joe1 = joe.map(ind =>{

    return ind.name
})


  

let  num = list.map(ind=>{

    return ind['电站名称']
})

       if(joe1.includes(j[l]['电站名称'])){

        console.log(1790)


           data =  await ceshi('powerStation')
        .where({name:j[l]['电站名称']})
        .update({name:j[l]['电站名称'],xxh:j[l]['站址'],totalmoney:j[l]['总投资（亿元）'],
                iscc:j[l]['装机容量'],ziscc:j[l]['总装机容量'],ts:j[l]['台数'],	ratedwh: j[l]['额定水头（米）'],
                enrsata:j[l]['工程状态'],apptime:j[l]['核准日期'],bttime:j[l]['建设总工期（月）'],
                sttime:j[l]['开工日期'],runtime:j[l]['投运日期'],iscc1:'',ts1:''
        })
        console.log(99)
        // qiao++


       }

       else{
      

          console.log(j[l]['电站名称'],j[l]['站址'],j[l]['总投资（亿元）'],j[l]['装机容量'],j[l]['总装机容量'],
          j[l]['台数'],j[l]['额定水头（米）'],j[l]['工程状态'],j[l]['核准日期'],j[l]['建设总工期（月）'],
          j[l]['开工日期'],j[l]['投运日期']
          )
           data1 =  await ceshi('powerStation')
        .insert({name:j[l]['电站名称'],xxh:j[l]['站址'],totalmoney:j[l]['总投资（亿元）'],
        iscc:j[l]['装机容量'],ziscc:j[l]['总装机容量'],ts:j[l]['台数'],	ratedwh:j[l]['额定水头（米）'],
        enrsata:j[l]['工程状态'],apptime:j[l]['核准日期'],bttime:j[l]['建设总工期（月）'],
        sttime:j[l]['开工日期'],runtime:j[l]['投运日期'],iscc1:'',ts1:''
})
    //    console.log(data1)
    //    xin++
       

       }
  let sele =  await ceshi('powerStation')
  .whereIn('name',num)
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