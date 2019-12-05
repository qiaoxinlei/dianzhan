const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post('api/rlshanchu',async ctx =>{
let a = ctx.request.body
let{id}=a
let shuzi= await ceshi('gysrenli')
.del()
.where({id})
// console.log(shuzi)
if(shuzi>0){
    ctx.body='ok'
}
}) 
module.exports = router