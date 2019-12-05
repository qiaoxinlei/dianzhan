const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post('api/aqxinzeng',async ctx =>{
let a = ctx.request.body
let{suppliersName,safetype,safename,safeJibie,safeIn,safeTime,safeEdit} = a
let shuzi= await ceshi('gysshigu')
.insert({suppliersName:suppliersName,
    safetype:safetype,
    safename:safename,
    safeJibie:safeJibie,
    safeIn:safeIn,
    safeTime:safeTime,
    safeEdit:safeEdit})
// console.log(shuzi)
if(shuzi&&shuzi.length>0){
    ctx.body='ok'
}
}) 
module.exports = router