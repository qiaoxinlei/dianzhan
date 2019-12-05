const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post('api/glook',async ctx =>{
let a=ctx.request.body
let {id}=a
console.log(a)
console.log(id)
let shuzi= await ceshi('gongcheng')
.where({dataid:id})
.select()
console.log(shuzi)
if(shuzi&&shuzi.length>0){
    ctx.body=shuzi
}
}) 
module.exports = router