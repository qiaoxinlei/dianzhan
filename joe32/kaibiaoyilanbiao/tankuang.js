const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')


router.post('tankuang',async ctx =>{
let a = ctx.request.body
console.log(a)
let {num2,num3,num4} =a
// let id =1
shuzi= await ceshi('kaibiaoyilanbiao')
.where({zhaobiaonum:num3,fenbiaoname:num4,baonum:num2})
// .orderBy([ { column: 'shangji', order: 'desc' }])
.orderBy(['shangji', { column: 'toubiaorenzongajia', order: 'asc' }])
// .orderBy(['shangji', { column: 'toubiaorenzongajia', order: 'asc' }])
// .select()
console.log(shuzi,123)
if(shuzi.length>0){
    ctx.body=shuzi
}
})
module.exports = router