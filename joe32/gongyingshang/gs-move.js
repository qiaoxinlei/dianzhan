const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post('api/gssmove',async ctx =>{
let a=ctx.request.body
// console.log(a,111)
let {suppliersName,category,abbreviation,beforeUserName,affiliatedGroup,investors,
    enterpriseNature,city,registeredAddress,companyProfile,mainMusinessScope,id
}=a

let shuzi= await ceshi('gongyingshang')
.where({id:id})
.update({suppliersName:suppliersName,category:category,abbreviation:abbreviation,
    beforeUserName:beforeUserName,affiliatedGroup:affiliatedGroup,investors:investors,
    enterpriseNature:enterpriseNature,city:city,registeredAddress:registeredAddress,
    companyProfile:companyProfile,mainMusinessScope:mainMusinessScope
})
// console.log(shuzi)
if(shuzi>0){
    ctx.body='ok'
}
}) 
module.exports = router