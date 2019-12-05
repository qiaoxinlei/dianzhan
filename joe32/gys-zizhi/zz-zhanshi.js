const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post('api/zzzhanshi',async ctx =>{
let a = ctx.request.body
let {suppliersName} = a
let shuzi= await ceshi('gyszizhi')
.where({gysname:suppliersName})
.select()
// console.log(shuzi)
if(shuzi&&shuzi.length>0){
    ctx.body=shuzi
}
}) 
module.exports = router