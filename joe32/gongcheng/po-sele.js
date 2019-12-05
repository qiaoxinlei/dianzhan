const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post('api/gsele',async ctx =>{
let a=ctx.request.body
let {id}=a
console.log(id)
let shuzi= await ceshi('gongcheng')
.where({time:2019-10-12})
.select()
console.log(shuzi)
if(shuzi&&shuzi.length>0){
    ctx.body=shuzi
}
}) 
module.exports = router