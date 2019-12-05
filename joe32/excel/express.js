const Koa = require("koa");
const router = require("koa-router")();
const nodeExcel = require('excel-export');
const app = new Koa();
var ceshi = require('../data-connection/users')
app.use(router.routes());



router.get('exportexcel',async (ctx) => {
     console.log(ctx)
        let a = ctx.request.body
        console.log(a)
        let {id} = a
        // let cool = JSON.parse(id)
  console.log(cool,333)

       let newmoreDate = [1,2,5]
        var cool= await ceshi('powerStation')
        .select()
        .whereIn('id',newmoreDate)
        // console.log(shuju.length,"12321312112321123")
        // console.log(shuju.length)
      let m = cool.length

        var array = []
        for(var i=0; i<m; i++){
              var temp = new Array()
            //   console.log(cool[i].totalmoney,"jdsadscudscsdvcds")
            //   console.log(cool[i].bttime,"jdsadscudscsdvcds")
            
              temp.push(cool[i].name) ;
              temp.push(cool[i].xxh) ;
              temp.push(cool[i].totalmoney) ;
              temp.push(cool[i].iscc) ;
              temp.push(cool[i].ziscc) ;
              temp.push(cool[i].ratedwh) ;
              temp.push(cool[i].ts) ;
              temp.push(cool[i].enrsata) ;
              temp.push(cool[i].apptime) ;
              temp.push(cool[i].bttime) ;
              temp.push(cool[i].sttime) ;
              temp.push(cool[i].runtime) ;
              temp.push(cool[i].poces) ;
              temp.push(cool[i].pocin) ;
              temp.push(cool[i].jindu) ;
              temp.push(cool[i].station) ;
              temp.push(cool[i].shengfen) ;
              array.push(temp);
        }
     console.log(array,"dsfdsfdsfdsfdsfdsfds")


        var conf ={};
        conf.rows = array
    conf.cols = [{
        caption:'电站名称',
        type:'string',
        width:'15'
    },{
        caption:'电站地址',
        type:'string',
        width:'25'

    },{
        caption:'总投资（亿元）',
        type:'string',
        width:'15'
    },{
        caption:'单机容量',
        type:'string',
        width:'15'
       
    },{
        caption:'总装机容量',
        type:'string',
        width:'15'
    },{
        caption:'台数',
        type:'string',
        width:'15'
    },{
        caption:'额定水头（）米',
        type:'string',
        width:'15'
    },{
        caption:'已投运',
        type:'string',
        width:'15'
    },{
        caption:'核准日期',
        type:'date',
        width:'15'
    },{
        caption:'建设总工期（月）',
        type:'string',
        width:'15'
    },{
        caption:'开工日期',
        type:'date',
        width:'10'
    },{
        caption:'投运日期',
        type:'date',
        width:'10'
    },{
        caption:'项目采购进度',
        type:'string',
        width:'12'
    },{
        caption:'项目采购相关信息',
        type:'string',
        width:'12'
    },{
        caption:'工程进度',
        type:'string',
        width:'10'
    },{
        caption:'电站大事记',
        type:'string',
        width:'12'
    },{
        caption:'省份',
        type:'string'
    }];
  	// console.log(conf)
      var result = nodeExcel.execute(conf);
     
      let data = new Buffer(result,'binary');
      console.log(data)
        ctx.set('Content-Type', 'application/vnd.openxmlformats:charset:s=utf-8');
        ctx.set("Content-Disposition", "attachment; filename=" + "Report.xlsx");
        ctx.body=result;



        
      
})
module.exports = router