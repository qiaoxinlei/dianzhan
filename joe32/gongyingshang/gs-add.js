const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post('api/gsadd',async ctx =>{
let a=ctx.request.body
 console.log(a)
let {suppliersName,category,abbreviation,beforeUserName,affiliatedGroup,investors,
    enterpriseNature,city,registeredAddress,companyProfile,mainMusinessScope
}=a

let shuzi1= await ceshi('gongyingshang')
.select('suppliersName')

let qiao = shuzi1.map(ind=>{
    return ind.suppliersName
})

if(qiao.includes(suppliersName)){
console.log('qiao')
    ctx.body='chongfu'
    return
}

let shuzi= await ceshi('gongyingshang')
.insert({suppliersName:suppliersName,category:category,abbreviation:abbreviation,
    beforeUserName:beforeUserName,affiliatedGroup:affiliatedGroup,investors:investors,
    enterpriseNature:enterpriseNature,city:city,registeredAddress:registeredAddress,
    companyProfile:companyProfile,mainMusinessScope:mainMusinessScope
})
// console.log(shuzi)
if(shuzi&&shuzi.length>0){
    ctx.body='ok'
}
else{
    ctx.body='ng'
}
}) 
module.exports = router