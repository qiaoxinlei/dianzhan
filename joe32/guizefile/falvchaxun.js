const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')
const fs = require('fs')
const uploadUrl = "C:/a/static/upload";

router.post("falvchaxun", async (ctx) => {
let a = ctx.request.body
let {type} = a 

if(type == '请选择'||type == ''){

    let shuzi1= await ceshi('caigouwenjian')
    .select()
    ctx.body=shuzi1
}
else{
    let shuzi1= await ceshi('caigouwenjian')
    .where({type:type})
    .select()
  
  ctx.body=shuzi1
}


  

    
})

module.exports = router