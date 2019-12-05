const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post('api/gadd',async ctx =>{
let a=ctx.request.body
let {id}=a
console.log(id)
let shuzi= await ceshi('gongcheng')
.insert({dataid:2,time:2019-9-9,store:'开工啦'})
console.log(shuzi)
if(shuzi&&shuzi.length>0){
    ctx.body='ok'
}
}) 
module.exports = router