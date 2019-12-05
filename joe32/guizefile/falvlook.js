const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post("falvlook", async (ctx) => {
console.log(ctx)
 
  let shuzi1= await ceshi('caigouwenjian')
  .select()

ctx.response.body=shuzi1

    
})

module.exports = router