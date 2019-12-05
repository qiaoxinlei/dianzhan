const Koa = require("koa");
const router = require("koa-router")();
const fs=require("fs");
const nodeExcel = require('excel-export');
const csv=require('csv');
const dict = require('gbk-dict').init();//调用gbk-dict中的init这个方法
const xlsx = require('node-xlsx');
const app = new Koa();
var ceshi = require('../data-connection/users')
app.use(router.routes());
router.get("/",(ctx)=>{
    ctx.body = fs.readFileSync("./index.html","utf-8");
});

//导出Excel，xlsx格式
router.get('exportexcel',async (ctx) => {
    async function readydata() {
        let a = ctx.query
        console.log(a)
        let{moreDate} = a
        console.log(JSON.parse(moreDate));
        let newmoreDate =JSON.parse(moreDate)
        var shuju = await ceshi('powerStation')
        .select()
        .whereIn('id',newmoreDate)
        console.log(shuju)
       let newshuju =JSON.parse(shuju)
    //    let exceldata=shuju;
        //做点什么，如从数据库取数据
        let exceldata=newshuju
        return exceldata;
    }
    //导出
    async function exportdata(v) {
        let conf ={};
        conf.name = "mysheet";//表格名
        let alldata = new Array();
        for(let i = 0;i<v.length;i++){
            let arr = new Array();
            arr.push(v[i].name);
            arr.push(v[i].age);
            arr.push(v[i].sex);
            arr.push(v[i].birthday);
            alldata.push(arr);
        }
        //决定列名和类型
        conf.cols = [{
            caption:'姓名',
            type:'string'
        },{
            caption:'年龄',
            type:'number'
        },{
            caption:'性别',
            type:'string'
        },{
            caption:'出生日期',
            type:'string',
            //width:280
        }];
        conf.rows = alldata;//填充数据
        let result = nodeExcel.execute(conf);
        //最后3行express框架是这样写
        // res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        // res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
        // res.end(result, 'binary');
        let data = new Buffer(result,'binary');
        ctx.set('Content-Type', 'application/vnd.openxmlformats');
        ctx.set("Content-Disposition", "attachment; filename=" + "Report.xlsx");
        ctx.body=data;
    }
    let r=await readydata();
    r=await exportdata(r);
});
module.exports = router