const Koa = require('koa');
const Router = require('koa-router')
const router = new Router()
var ceshi = require('../data-connection/users')

router.post('zhongbiaopush',async (ctx) => {
    let a =ctx.query
    console.log(a,'abc')
    let {num3,num4,num2} = a

    let shuzi= await ceshi('zongfenpaixubiao')
    .where({baonum:num2})
    .select()

    let list = []
    shuzi.map(ind=>{
        if(ind.paixu==1){
           list.push(ind)
        }
    })
    console.log(list,777)

    for(var i = 0;i<list.length;i++){
      let sele = await ceshi('procurement')
      .where({pack:num2})
      .select('id')
      if(sele != ''){
          let poo = await ceshi('procurement')
          .where({bao:num2})
          .update({
              bidder:list[i].toubiaoren,unit:list[i].danwei,Successful:list[i].shangji,
              WinningMonth:9,
              biddingYear:2018,
          })
          
      }
      else{
        let poo = await ceshi('procurement')
        
        .insert({
            bao:num2,Bid:num3,TenderNumber:num4,
            bidder:list[i].toubiaoren,unit:list[i].danwei,Successful:list[i].shangji,
            WinningMonth:9,
            biddingYear:2018,
        })
      }

    ctx.body='ok'

    }

})
module.exports = router






