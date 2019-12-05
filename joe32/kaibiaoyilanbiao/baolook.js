const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')


router.post('baolook',async ctx =>{
let a = ctx.request.body
console.log(a)
let {num3,num4} =a
// let id =1
shuzi= await ceshi('kaibiaoyilanbiao')
.where({zhaobiaonum:num3,fenbiaoname:num4})
.select('baonum')
let bao = shuzi.map(ind =>{
    return ind.baonum
})

function uniq(array){
    var temp = []; //一个新的临时数组
    for(var i = 0; i < array.length; i++){
        if(temp.indexOf(array[i]) == -1){
            temp.push(array[i]);
        }
    }
    return temp;
}
let num2 = (uniq(bao))
console.log(num2)


console.log(shuzi,123)
if(shuzi.length>0){
    ctx.body=num2
}
})
module.exports = router