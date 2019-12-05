const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')


router.post('weijinruyulan',async ctx =>{
let a = ctx.request.body
console.log(a)
let {num3,num4} =a
// let id =1
shuzi= await ceshi('weijinruxiangqing')
.where({zhaobiaonum:num3,fenbiaoname:num4})
.select()
console.log(shuzi)
if(shuzi.length>0){
    ctx.body=shuzi
}
})
module.exports = router