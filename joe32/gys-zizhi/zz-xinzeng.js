const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post('api/zzxinzeng',async ctx =>{
    let a = ctx.request.body
    let {zizhiname,zizhitime,beizhu,jiguan,gysname,imgurl} = a
let shuzi= await ceshi('gyszizhi')
.insert({gysname:gysname,zizhiname:zizhiname,zizhitime:zizhitime,jiguan:jiguan,beizhu:beizhu,imgurl:imgurl})
// console.log(shuzi)

if(shuzi>0){
    ctx.body='ok'
}
}) 
module.exports = router