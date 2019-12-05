const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post('api/rladd',async ctx =>{
    let a=ctx.request.body
    let {suppliersName,ptype,pnum,pbeizhu} = a
let shuzi= await ceshi('gysrenli')
.insert({suppliersName:suppliersName,ptype:ptype,pnum:pnum,pbeizhu:pbeizhu})
// console.log(shuzi)
if(shuzi&&shuzi.length>0){
    ctx.body='ok'
}
}) 
module.exports = router