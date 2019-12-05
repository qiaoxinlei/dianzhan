const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post('api/aqlook',async ctx =>{
    let a=ctx.request.body
    let {suppliersName} = a
let shuzi= await ceshi('gysshigu')
.select()
.where({suppliersName:suppliersName})
// console.log(shuzi)
if(shuzi&&shuzi.length>0){
    ctx.body=shuzi
}
}) 
module.exports = router