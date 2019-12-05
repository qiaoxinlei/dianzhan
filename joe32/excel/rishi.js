const officegen = require('officegen')
const fs = require('fs')
const Koa = require('koa');
const koabody = require('koa-body')
const Router = require('koa-router')
const router = new Router()
const app = new Koa();
var path = require('path');
var bodyParser = require('koa-bodyparser')
app.use(bodyParser());
// var async = require('async');
var ceshi = require('../data-connection/users')

router.get('rishi',async (ctx) => {
    var docx = officegen ( 'docx' );
    let abc =ctx.query
    console.log(abc,111)
    let {suppliersName}  = abc
    // let suppliersName = 'h'
if(suppliersName!=undefined){
    var shuju = await ceshi('gongyingshang')
    .where({suppliersName:suppliersName})
    .select('affiliatedGroup')
    if(shuju == ''){
        ctx.body='未找到相关数据'
        return
    }
    // console.log(shuju)
let joe = shuju[0].affiliatedGroup
    var shuju1 = await ceshi('gongyingshang')
    .where({affiliatedGroup:joe})
    .select('suppliersName','category')
    console.log(shuju1,123)

    let num = shuju1.map(ind=>{
        console.log(111)
        return ind.suppliersName
    })
    let num1 = shuju1.map(ind=>{
        return ind.category
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
    let num2 = (uniq(num1))
    console.log(num,num2)


    let shuju2 = await ceshi('procurement')
    .whereIn('bidder',num)
    .select('bidder','BidAmount')

    console.log(shuju2,12)
    if(shuju2 == ''){
        ctx.body =='未找到数据'
    }

    shuju2.map(ind=>{
        ind.count = 1
        ind.BidAmount=Number(ind.BidAmount)
    })
    let shuju2b=[]
    shuju2.map(ind=>{
        if(shuju2b != ''){
          var flag = true;
          for (var a = 0;a<shuju2b.length;a++){
              if (ind.bidder == shuju2b[a].bidder){
                shuju2b[a].BidAmount += ind.BidAmount;
                shuju2b[a].count += 1;
                flag = true;
                break;
              }else {
                flag = false;
              }
          }
          if (flag == false){
            shuju2b.push(ind)
          }
        }else{
        shuju2b.push(ind)
      }
    
      })


      shuju2b.sort(
        function(a,b){
            if(a.BidAmount<b.BidAmount){
              return 1;
            }
            else if(a.BidAmount>b.BidAmount){
             return -1
            }
           return 0
        }
    )
    console.log(shuju2b,777)
    let listshuju = ''
  if(shuju2b.length>=2){
    listshuju = shuju2b[0].bidder+','+shuju2b[1].bidder
  }else{
    listshuju= shuju2b[0].bidder
  }
   


 


    // var shuju1 = await ceshi('gyszizhi')
    // .where({gysname:suppliersName})
    // .select('zizhiname')
    // console.log(shuju1)
    // var shuju2 = await ceshi('gysshigu')
    // .where({suppliersName:suppliersName})
    // .select()
    // console.log(shuju2)


























    
        // console.log(ctx.req,11111,ctx.res)
        console.log('exportWord-------------');
        docx.on ( 'finalize', function ( written ) {
                    console.log ( 'Finish to create Word file.\nTotal bytes created: ' + written + '\n' );
                });


        docx.on ( 'error', function ( err ) {
                    console.log ( err,'报错了' );
                });


  


    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 200 })
    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 200 })
    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })

        var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '国家电网有限公司', { bold: true,font_face: 'Arial', font_size: 25 });// 添加文字 设置字体样式 加粗 大小
        
        var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '抽水蓄能项目供应商基本情况', { bold: true,font_face: 'Arial', font_size: 25 })


    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 200 })
    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
    var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })


        var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '国网物资部', { bold: true,font_face: 'Arial', font_size: 16 })

        var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '2019年11月', { bold: true,font_face: 'Arial', font_size: 16 })

        var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '第一部分 服务类', { bold: true,font_face: 'Arial', font_size: 25 })

        var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '概述', { bold: true,font_face: 'Arial', font_size: 25 })
        var name = '数据待填充'
        var list = '数据待填充'
        var pObj = docx.createP ( { align: 'left' } );// 创建行 设置居中
        pObj.addText ( '  该部分主要介绍'+num1+' 的供应商基本情况。该部分供应商主要集中在中电建集团及水利部。根据以往中标数据，'+joe+'的中标量尤为突出，其中'+listshuju+'中标量占据上风，主要供应商的中标量排名如下：',
        { bold: true,font_face: 'Arial', font_size: 19 })
        console.log(888)
        var table1 = [
            [{
                val: "序号",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '20',
                    cellColWidth: 700,
                    // b:true,
                    // sz: '48',
                    // shd: {
                    //   fill: "7F7F7F",
                    //   themeFill: "text1",
                    //   "themeFillTint": "80"
                    // },
                    // fontFamily: "Avenir Book"
                }
            }, {
                val: "投标人",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '20',
                    cellColWidth: 4000,
                    // b:true,
                    // color: "A00000",
                    // align: "right",
                    // shd: {
                    //   fill: "92CDDC",
                    //   themeFill: "text1",
                    //   "themeFillTint": "80"
                    // }
                }
            }, {
                val: '累计中标金额（亿元）',
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '20',
                    cellColWidth: 4000,
                    // b:true,
                    // sz: '48',
                    // shd: {
                    //   fill: "92CDDC",
                    //   themeFill: "text1",
                    //   "themeFillTint": "80"
                    // }
                }
            }, {
                val: "累计中标电站数量（个）",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '20',
                    cellColWidth: 4000,
                    // b:true,
                    // sz: '48',
                    // shd: {
                    //   fill: "92CDDC",
                    //   themeFill: "text1",
                    //   "themeFillTint": "80"
                    // }
                }
            }, {
                val: "备注",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '20',
                    cellColWidth: 700,
                    // b:true,
                    // sz: '48',
                    // shd: {
                    //   fill: "92CDDC",
                    //   themeFill: "text1",
                    //   "themeFillTint": "80"
                    // }
                }
            }],
        ]

        //  let towsLen = tows.length
  let data =  shuju2b
  let dataLen = data.length
  var aaa= 1
  for (var i = 0; i < dataLen; i++) {//循环数据库得到的数据，因为取出的数据格式为
      
      let SingleRow = [aaa++,   data[i]['bidder'],   data[i]['BidAmount'], 
      data[i]['count']  ,   '备注'
      ]
      
      table1.push(SingleRow)
  }

        var tableStyle1 = {
            tableSize: 10,
            // tableColor: "ada",
            tableAlign: "center",
            tableVAlign: "center",
            borders: true,
            font_size: 30
        }
    
     docx.createTable(table1, tableStyle1);

     var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
         pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 200 })
     var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
         pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
     var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
         pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
     var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
         pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
     var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
         pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
     var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
         pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
     var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
         pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 200 })
     var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
         pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
     var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
         pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
     var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
         pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
     var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
         pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 200 })
     var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
         pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
     var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
         pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
     var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
         pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })
     var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
         pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 200 })
     var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
         pObj.addText ( '', { bold: true,font_face: 'Arial', font_size: 25 })



     console.log(shuju2b)

     for(var b = 0; b<shuju2b.length;b++){
let miaoshu = await ceshi('gongyingshang')
.where({suppliersName:shuju2b[b].bidder})
.select()

let zizhi = await ceshi('gyszizhi')
.where({gysname:shuju2b[b].bidder})
.select('zizhiname')
console.log(zizhi,000)
let zizhi1 = zizhi.map(ind=>{
    return ind.zizhiname
})
console.log(zizhi1)
if(b == 0){
    abc='一'
}
if(b == 1){
    abc='二'
}


          
        var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '第'+abc+'章' + shuju2b[b].bidder, { bold: true,font_face: 'Arial', font_size: 25 })
        
        // var pObj = docx.createP ( { align: 'left' } );// 创建行 设置居中
        // pObj.addText (  name, { bold: true,font_face: 'Arial', font_size: 15 })

        // var pObj = docx.createP ( { align: 'left' } );// 创建行 设置居中
        // pObj.addText (  '以下简称'+name, { font_face: 'Arial', font_size: 16 })

        var pObj = docx.createP ( { align: 'left' } );// 创建行 设置居中
        pObj.addText (  '（一）企业概述', { bold: true,font_face: 'Arial', font_size: 16 })
        var pObj = docx.createP ( { align: 'left' } );// 创建行 设置居中
        pObj.addText ( miaoshu[0].companyProfile, { font_face: 'Arial', font_size: 16 })

        var pObj = docx.createP ( { align: 'left' } );// 创建行 设置居中
        pObj.addText (  '（二）主营业务范围', { bold: true,font_face: 'Arial', font_size: 16 })
        var pObj = docx.createP ( { align: 'left' } );// 创建行 设置居中
        pObj.addText (miaoshu[0].mainMusinessScope, { font_face: 'Arial', font_size: 16 })

        var pObj = docx.createP ( { align: 'left' } );// 创建行 设置居中
        pObj.addText (  '（三）企业主要资质能力', { bold: true,font_face: 'Arial', font_size: 16 })
        var pObj = docx.createP ( { align: 'left' } );// 创建行 设置居中
        pObj.addText ( shuju2b[b].bidder +'具有'+zizhi1+'。',   { font_face: 'Arial', font_size: 16 })

        var pObj = docx.createP ( { align: 'left' } );// 创建行 设置居中
        pObj.addText (  '（四）人力资源', { bold: true,font_face: 'Arial', font_size: 16 })
        var pObj = docx.createP ( { align: 'left' } );// 创建行 设置居中
        pObj.addText ( name, { font_face: 'Arial', font_size: 16 })

        var pObj = docx.createP ( { align: 'left' } );// 创建行 设置居中
        pObj.addText (  '（五）主要业绩', { bold: true,font_face: 'Arial', font_size: 16 })
        var pObj = docx.createP ( { align: 'left' } );// 创建行 设置居中
        pObj.addText ( name, { font_face: 'Arial', font_size: 16 })

        var pObj = docx.createP ( { align: 'left' } );// 创建行 设置居中
        pObj.addText (  '（六）近三年安全事故', { bold: true,font_face: 'Arial', font_size: 16 })
        var pObj = docx.createP ( { align: 'left' } );// 创建行 设置居中
        pObj.addText ( '根据国网安监部提供的近三年安全事故信息，该投标人近三年安全事故如下表：', { font_face: 'Arial', font_size: 16 })

         let shigu = await ceshi('gysshigu')
         .where({suppliersName:shuju2b[b].bidder})
         .select()
        console.log(shigu,999)
        
        
        var table2 = [
            [{
                val: "序号",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '20',
                    cellColWidth: 1000,
                    // b:true,
                    // sz: '48',
                    // shd: {
                    //   fill: "7F7F7F",
                    //   themeFill: "text1",
                    //   "themeFillTint": "80"
                    // },
                    // fontFamily: "Avenir Book"
                }
            }, {
                val: "事故时间",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '20',
                    cellColWidth: 4000,
                    // b:true,
                    // color: "A00000",
                    // align: "right",
                    // shd: {
                    //   fill: "92CDDC",
                    //   themeFill: "text1",
                    //   "themeFillTint": "80"
                    // }
                }
            }, {
                val: '事故等级',
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '20',
                    cellColWidth: 2000,
                    // b:true,
                    // sz: '48',
                    // shd: {
                    //   fill: "92CDDC",
                    //   themeFill: "text1",
                    //   "themeFillTint": "80"
                    // }
                }
            }, {
                val: "事故情况",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '20',
                    cellColWidth: 6000,
                    // b:true,
                    // sz: '48',
                    // shd: {
                    //   fill: "92CDDC",
                    //   themeFill: "text1",
                    //   "themeFillTint": "80"
                    // }
                }
            }, {
                val: "是否出具事故鉴定报告",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '20',
                    cellColWidth: 2000,
                    // b:true,
                    // sz: '48',
                    // shd: {
                    //   fill: "92CDDC",
                    //   themeFill: "text1",
                    //   "themeFillTint": "80"
                    // }
                }
            }, {
                val: "有无责任",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '20',
                    cellColWidth: 2000,
                    // b:true,
                    // sz: '48',
                    // shd: {
                    //   fill: "92CDDC",
                    //   themeFill: "text1",
                    //   "themeFillTint": "80"
                    // }
                }
            }, {
                val: "事故信息来源",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '20',
                    cellColWidth: 2000,
                    // b:true,
                    // sz: '48',
                    // shd: {
                    //   fill: "92CDDC",
                    //   themeFill: "text1",
                    //   "themeFillTint": "80"
                    // }
                }
            }, {
                val: "备注",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '20',
                    cellColWidth: 2000,
                    // b:true,
                    // sz: '48',
                    // shd: {
                    //   fill: "92CDDC",
                    //   themeFill: "text1",
                    //   "themeFillTint": "80"
                    // }
                }
            }],
        ]
    
  // let towsLen = tows.length
  let data2 = shigu
  let dataLen2 = data2.length
  var a= 0
  for (var i1 = 0; i1 < dataLen2; i1++) {//循环数据库得到的数据，因为取出的数据格式为
      //[{"id" : "101010100","provinceZh" : "北京","leaderZh" : "北京","cityZh" : "北京","cityEn" : "beijing"},{…………},{…………}]
      /************************* 文本 *******************************/
    //   var pObj = docx.createP();//创建一行
    //   pObj.addText(`(${i+1}), `,{ bold: true, font_face: 'Arial',});
    //   pObj.addText(`省级:`,{ bold: true, font_face: 'Arial',});
    //   pObj.addText(`${data[i]['provinceZh']}  `,);
    //   pObj.addText(`市级：`,{ bold: true, font_face: 'Arial',});
    //   pObj.addText(`${data[i]['leaderZh']}  `);
    //   pObj.addText(`县区：`,{ bold: true, font_face: 'Arial',});
    //   pObj.addText(`${data[i]['cityZh']}`);

      /************************* 表格 *******************************/
     
      let SingleRow = [++a,   data2[i1]['safeTime'],   data2[i1]['safetype'], 
      data2[i1]['safeEdit']  ,   '',   '',  data2[i1]['safeIn'],  '系统外事故',
      ]
      
      table2.push(SingleRow)
  }

        var tableStyle2 = {
            tableSize: 10,
            // tableColor: "ada",
            tableAlign: "center",
            tableVAlign: "center",
            borders: true
        }
    
     docx.createTable(table2, tableStyle2);
     }
     




      

     var out = fs.createWriteStream ( 'out.docx' )

     var result = docx.generate (out)

     ctx.res.writeHead ( 200, {
    // 注意这里的type设置，导出不同文件type值不同application/vnd.openxmlformats-officedocument.presentationml.presentation
     'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8', 
     'Content-disposition': 'attachment;filename=out.docx'});
       console.log(docx.generate (ctx.res))
        docx.generate (ctx.body);// 客户端导出word





}



   

})
module.exports = router
/**
 * 导出word
 */






