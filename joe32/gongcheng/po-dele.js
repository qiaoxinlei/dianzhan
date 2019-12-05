const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post('api/gdele',async ctx =>{
let a=ctx.request.body
let {ids}=a
console.log(ids)
let shuzi= await ceshi('gongcheng')
.where({id:ids})
.del()
console.log(shuzi)
if(shuzi>0){
    ctx.body='ok'
}
}) 
module.exports = router