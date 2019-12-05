const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')


router.post('kbfenshu',async ctx =>{
    let a = ctx.request.body
    console.log(a)
    let{id,num2,num3,num4,jiage,n1,n2,c}=a
    id = JSON.parse(id)
    //id 为招标一览表里选中的数据 因为 授标原则 同一供应商 直选一家 计算平均值 
    //id 为选中的 数组 
    //dataid 为本次招标的所有数据的主键id    上面的 id包含 在 dataid里面
  //CC n1 n2 为本次招标设定的基础值 计算价格使用
//    console.log(id)
// let id = [75,76,77]
// let dataid = 1
    // let fast= await ceshi('pingshen')
    // .where({dataid:dataid})
    // .select('priceFormula')
    // console.log(fast,111)
    // console.log(fast[0].priceFormula)
    var sele = ''
    if(jiage =='简单算数平均值法'){
        sele=1
    }
    if(jiage =='算术平均值法'){
        sele=2
    }
    if(jiage =='算术平均值下浮法'){
        sele=3
    }
    // console.log(sele,999)
//     let joe1 = await ceshi('canshushezhi')
//     .where({dataid:dataid})
//     .select()
//     // console.log(joe1,222)
//  let n1 = Number(joe1[0].n1)
//  let n2 = Number(joe1[0].n2)
//  let c = Number(joe1[0].c)
// console.log(c,999)











    // console.log(a)
    // console.log(id,sele)

    //测试值 相当于 选取了两家数据 
    let list = ''
    //将所勾选的投标id传到后台 用id查找相应的投标价格 计算出平均基准价格 zuizhong
    let shuzi= await ceshi('kaibiaoyilanbiao')   //连接数据库 
    .whereIn('id',id)    //whereIN语句  查询条件 id为数组  一次课查询多个条件的数据
    .select()
    // console.log(shuzi,999)  //返回查询的数据 
if(shuzi.length>0){       //  遍历数据  两个价格 赋值给list
 list = shuzi.map(ind =>{
   return ind.toubiaorenzongajia
})
}
// console.log(list)
var zongjia = 0
list.map(ind =>{      // 遍历总价数组  将 两个价格相加  总价 赋值 给zongjia
    // console.log(Number(ind))  
    zongjia += Number(ind)
})
// console.log(zongjia)
//zuizhong 为平均基准价格
var zuizhong = zongjia/list.length  //拿到平均值 
console.log(zuizhong,'平均值')


//查询 使用dataid 查询 本次投标所有的 招标信息
//并且判断 是那种 价格计算方式  1，2，3 按照相应方式判断使用哪个n值


let shuzi1= await ceshi('kaibiaoyilanbiao')
    .where({zhaobiaonum:num3,fenbiaoname:num4,baonum:num2})
    .select()
    // console.log(shuzi1,123)



if(sele==1){
    // console.log(0101)
    let n11 = n1
    let n22 = n2
    // console.log(n1,777)
    shuzi1.map(ind =>{     
        // console.log(n11,888)        //如果方式为第一种   判断 投标价格>=zuihong平均价  给 n赋值 n1
        if(ind.toubiaorenzongajia>=zuizhong){
            ind.n=n1
        }
        if(ind.toubiaorenzongajia<zuizhong){         //同理赋n2
            ind.n=n2
        }
    })
}
   else if(sele==2){                //若果方式为第二种  需要先将  nd.beiyongjin-ind.last 这两个备用金 安措费的价格减去 然后得到
   shuzi1.map(ind =>{              //新的投标价格 chajian
    // var chajian =ind.toubiaorenzongajia-ind.beiyongjin-ind.last;

   if(ind.toubiaorenzongajia>zuizhong){        //用chajian 也就是 计算过的投标价格判断 n的值 并赋值
    ind.n=1
   }
    if(ind.toubiaorenzongajia<=zuizhong){
    ind.n=0.8/0.5
  }
   })
  
   }
else if(sele==3){
//  let c11 = c
// console.log(c,789)
    shuzi1.map(ind =>{   //同理 先计算差价
        // var chajian =ind.toubiaorenzongajia-ind.beiyongjin-ind.last;
        ind.zuizhong = zuizhong*(1-c)
        if(ind.toubiaorenzongajia>zuizhong){    //此是判断条件更改为 依托c做出判断  继续给N赋值
         ind.n=1
        }
         if(ind.toubiaorenzongajia<=zuizhong){
         ind.n=0.8/0.5
       }
        })
}
console.log(shuzi1,321)
//遍历所有 招标信息  计算出 最后得分 pingbiaojiegefen 把最后得分挂在 在每一项上
shuzi1.map(ind => {
    console.log(ind.n,c,123)
    console.log(Math.abs(ind.toubiaorenzongajia-zuizhong),123)
ind.pingbiaojiagefen=100-100*ind.n*(Math.abs(ind.toubiaorenzongajia-zuizhong))/(zuizhong) //固定计算公式
})
// console.log(shuzi1,'lsatshuju')

shuzi1.map(ind=>{
    if(ind.pingbiaojiagefen<0){
        ind.pingbiaojiagefen = 0
    }
})

//遍历 所有招标信息 把最后得分 插入到每一项的数据库内 字段为pingbiaojiagefen
for (var i=0;i<shuzi1.length;i++){
    
        // console.log(123)
        var shuzi2=await ceshi('kaibiaoyilanbiao')
        .where({id:shuzi1[i].id})       
        .update({pingbiaojiagefen:shuzi1[i].pingbiaojiagefen.toFixed(2)})
        // console.log(shuzi2,'最终值')
        
    

}
    // console.log(shuzi)
    if(shuzi.length>0){
        ctx.body='ok'
    }
    }) 
    module.exports = router