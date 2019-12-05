const Koa = require("koa");
const router = require("koa-router")();
const fs=require("fs");
const nodeExcel = require('excel-export');
const app = new Koa();
var ceshi = require('../data-connection/users')
app.use(router.routes());
router.get("/",(ctx)=>{
    ctx.body = fs.readFileSync("./index.html","utf-8");
});
//导出Excel，xlsx格式
router.get('exportexcel',async (ctx) => {
    let a = ctx.query
    console.log(a,11111111111111111111111111111111111111111111)
    let{moreDate} = a
   //  let exceldata=JSON.parse(moreDate)
    // let app = [1,3,5,7]
    console.log(JSON.parse(moreDate));
    // console.log(app);
    let newmoreDate =JSON.parse(moreDate)
    var shuju = await ceshi('powerStation')
    .select()
    .whereIn('id',newmoreDate)
    console.log(shuju)

   let exceldata=shuju;
//    let exceldata = moreDate
console.log(exceldata)
   
    //导出
    async function exportdata(v) {
        let conf ={};
        conf.name = "mysheet";//表格名
        let alldata = new Array();
        let arr = new Array();
        // let a =exceldata
        // console.log(a)
        for(let i = 0;i<2;i++){
            arr.push(v[i].name);
            arr.push(v[i].XXH);
            alldata.push(arr);
        }
        // 决定列名和类型
        // exceldata.map((ite,ind) =>{
        //     return arr.push(ite.name)
        // })
        // alldata.push(arr)
        conf.cols =[{
            caption:'电站名称',
            type:'string'
        },{
            caption:'电站地址',
            type:'number'
        },{
            caption:'总投资(亿元)',
            type:'string'
        },{
            caption:'单机容量',
            type:'string',
            //width:280
        },{
            caption:'总装机容量',
            type:'string'
        },{
            caption:'台数',
            type:'string'
        },{
            caption:'额定水头()米',
            type:'string'
        },{
            caption:'已投运',
            type:'string'
        },{
            caption:'核准日期',
            type:'string'
        },{
            caption:'建设总工期（月）',
            type:'string'
        },{
            caption:'开工日期',
            type:'string'
        },{
            caption:'投运日期',
            type:'string'
        },{
            caption:'项目采购进度',
            type:'string'
        },{
            caption:'项目采购相关信息',
            type:'string'
        },{
            caption:'工程进度',
            type:'string'
        },{
            caption:'电站大事记',
            type:'string'
        }]
        conf.rows = alldata;//填充数据
        let result = nodeExcel.execute(conf);
        //最后3行express框架是这样写
        // res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        // res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
        // res.end(result, 'binary');
        let data = Buffer.from(result,'binary');
        ctx.set('Content-Type', 'application/vnd.openxmlformats');
        ctx.set("Content-Disposition", "attachment; filename=" + "Report.xlsx");
        ctx.body=data;
    }
    let r=exceldata
    r=await exportdata(r);
});
module.exports = router