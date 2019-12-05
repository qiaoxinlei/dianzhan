const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')
router.post('shangwufendaoru',async ctx =>{
let a = ctx.request.body
let {id,ip} = a 
console.log(JSON.parse(id),ip)


})

module.exports = router