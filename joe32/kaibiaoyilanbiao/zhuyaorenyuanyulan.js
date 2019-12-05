const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')


router.post('zhuyaorenyuanyulan',async ctx =>{
let a = ctx.request.body
console.log(a)
let {num4} =a
// let id =1
shuzi= await ceshi('zhuyaorenyuan')
.where({fenbiaoname:num4})
.select()
console.log(shuzi)
if(shuzi.length>0){
    ctx.body=shuzi
}
else{
    ctx.body='ng'
}
})
module.exports = router