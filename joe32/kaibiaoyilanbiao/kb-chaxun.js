const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')


router.post('kblchaxun',async ctx =>{
let a = ctx.request.body
// console.log(a)
let {num3,num4} =a
// let id =1
console.log(num3,num4)
shuzi= await ceshi('kaibiaoyilanbiao')
.where({zhaobiaonum:num3,fenbiaoname:num4})
.orderBy([ { column: 'baonum', order: 'asc' }])

console.log(shuzi,123)

if(shuzi.length>0){
    ctx.body=shuzi
}
})
module.exports = router