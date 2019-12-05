const Koa = require("koa");
const router = require("koa-router")();
const nodeExcel = require('excel-export');
const app = new Koa();
var ceshi = require('../data-connection/users')
app.use(router.routes());



router.get('caigoudaochu',async (ctx) => {
     console.log(ctx)
        let a = ctx.request.query
        console.log(a)
        let {id} = a
        id = JSON.parse(id)
        // let cool = JSON.parse(id)
  console.log(cool,333)

       let newmoreDate = [68,69,70]
        var cool= await ceshi('procurement')
        .select()
        .whereIn('id',id)

        if(cool == ''){
            ctx.body = '未找到相关数据'
            return
        }
        // console.log(shuju.length,"12321312112321123")
        // console.log(shuju.length)
        // cons.log(cool,123)
      let m = cool.length

        var array = []
        for(var i=0; i<m; i++){
              var temp = new Array()
            //   console.log(cool[i].totalmoney,"jdsadscudscsdvcds")
            //   console.log(cool[i].bttime,"jdsadscudscsdvcds")
            
              temp.push(cool[i]. purchasingMethod) ;
              temp.push(cool[i]. BatchTenders) ;
              temp.push(cool[i].TenderNumber) ;
              temp.push(cool[i]. PurchasingCategory) ;
              temp.push(cool[i].procurementContent) ;
              temp.push(cool[i].MajorProject) ;
              temp.push(cool[i].Bid) ;
              temp.push(cool[i].pack) ;
              temp.push(cool[i].name) ;
              temp.push(cool[i].PurchaseQuantity) ;
              temp.push(cool[i].unit) ;
              temp.push(cool[i].bidder) ;
              temp.push(cool[i].bidderName) ;
              temp.push(cool[i].BidAmount) ;
              temp.push(cool[i].LimitAmount) ;
              temp.push(cool[i].EstimatedAmount) ;
              temp.push(cool[i].biddingYear) ;
              temp.push(cool[i].WinningMonth) ;
              temp.push(cool[i].Successful) ;
              temp.push(cool[i].locations) ;
              temp.push(cool[i].business) ;
              temp.push(cool[i].ServiceFee) ;
              temp.push(cool[i].Rate) ;
              array.push(temp);
        }
     console.log(array,"dsfdsfdsfdsfdsfdsfds")


        var conf ={};
        conf.rows = array
    conf.cols = [{
        caption:'采购方式',
        type:'string',
        width:'15'
    },{
        caption:'招标批次',
        type:'string',
        width:'25'

    },{
        caption:'招标编号',
        type:'string',
        width:'20'
    },{
        caption:'采购类别',
        type:'string',
        width:'20'
       
    },{
        caption:'主题采购内容简介',
        type:'string',
        width:'15'
    },{
        caption:'是否重大项目',
        type:'string',
        width:'15'
    },{
        caption:'分标',
        type:'string',
        width:'15'
    },{
        caption:'包',
        type:'string',
        width:'20'
    },{
        caption:'电站名称',
        type:'string',
        width:'15'
    },{
        caption:'采购数量',
        type:'string',
        width:'15'
    },{
        caption:'单位',
        type:'string',
        width:'15'
    },{
        caption:'中标人',
        type:'string',
        width:'10'
    },{
        caption:'中标人曾用名',
        type:'string',
        width:'15'
    },{
        caption:'中标金额(万元)',
        type:'string',
        width:'15'
    },{
        caption:'限价金额(万元)',
        type:'string',
        width:'15'
    },{
        caption:'预估采购规模(万元)',
        type:'string',
        width:'15'
    },{
        caption:'中标年度',
        type:'string',
        width:'12'
    },{
        caption:'中标月份',
        type:'string',
        width:'15'
    },{
        caption:'中标人所属集团',
        type:'string',
        width:'15'
    },{
        caption:'中标人所在地',
        type:'string',
        width:'15'
    },{
        caption:'中标人企业性质',
        type:'string',
        width:'18'
    },{
        caption:'中标服务费(万元)',
        type:'string',
        width:'20'
    },{
        caption:'中标服务费综合费率%',
        type:'string',
        width:'22'
        
    }];
  	// console.log(conf)
      var result = nodeExcel.execute(conf);
     let jjj = '采购管理'
      let data = Buffer.from(result,'binary');
      console.log(data)
        ctx.set('Content-Type', 'application/vnd.openxmlformats;charset=utf-8');
        ctx.set("Content-Disposition", "attachment; filename=   " +encodeURIComponent('采购管理.xls'));
        ctx.body=data;



        
      
})
module.exports = router