const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post('api/gshistory',async ctx =>{
let a = ctx.request.body
let {id} = a
// console.log(id)
let shuzi2 = await ceshi('gongyingshang')
.where({id:id})
.select('category','suppliersName')

let shuzi= await ceshi('procurement')
.select('BidAmount','BatchTenders','biddingYear','WinningMonth','dataid','bidder','PurchasingCategory')
.where({gsid:id})
let list = shuzi[0].dataid

let shuzi1= await ceshi('powerStation')
.select('name')
.where({id:list})
// console.log(shuzi,123)
// console.log(shuzi)
// console.log(shuzi1,456)
var obj = shuzi.map((item,index) => {
    return {...item, ...shuzi1[index]};
});
var obj2 = obj.map((item,index) => {
    return {...item, ...shuzi2[index]};
});
// console.log(obj2,111)
    ctx.body=obj2
}) 
module.exports = router