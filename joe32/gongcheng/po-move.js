const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post('api/gmove',async ctx =>{
let a=ctx.request.body
let {ids,times,jindus}=a
console.log(ids)
console.log(times)
let shuzi= await ceshi('gongcheng')
.where({id:ids})
.update({time:times,jindu:jindus})
console.log(shuzi)
if(shuzi>0){
    ctx.body='ok'
}
}) 
module.exports = router