const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post("wenjiandaochu", async (ctx) => {
  let a = ctx.request.body
  let {num2} = a
  let shuzi= await ceshi('fileload')
  .where({bao:num2})
  .select()

  if(shuzi.length>0){
      ctx.body= shuzi
  }
  else{
    ctx.body='ng'
  }
})

module.exports = router