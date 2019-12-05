const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post('api/gssele',async ctx =>{
let a=ctx.request.body   //获取数据
let {bitName,compain, nature,city}=a  //解构赋值
let list = {}
if(bitName !=''){
  list.suppliersName=bitName
}
if(compain !=''){
  list.affiliatedGroup=compain
}
if(nature !=''){
  list.enterpriseNature=nature
}
if(city !=''){
  list.city=city
}
// console.log(list)
let shuzi= await ceshi('gongyingshang')  //连接数据库  shuzi为查询结果
.where(list)  //四个查询条件
.select() // 查询的项目  默认为所有项目
// console.log(shuzi)
if(shuzi&&shuzi.length>0){
    ctx.body=shuzi
}
else{
  ctx.body=[]
}
}) 
module.exports = router
