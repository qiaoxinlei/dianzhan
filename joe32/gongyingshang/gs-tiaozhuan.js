const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post('api/gstiaozhuan',async ctx =>{
let a = ctx.request.body
let{id} = a
// console.log(id)
let shuzi= await ceshi('gongyingshang')
.where({id:id})
.select()
// console.log(shuzi)
if(shuzi.length>0){
    ctx.body=shuzi
}
}) 
module.exports = router