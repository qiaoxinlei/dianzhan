const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post('api/gsdele',async ctx =>{
let a=ctx.request.body
let {id}=a
// console.log(id)
let shuzi= await ceshi('gongyingshang')
.where({id:id})
.del()
// console.log(shuzi)
if(shuzi>0){
    ctx.body='ok'
}
}) 
module.exports = router