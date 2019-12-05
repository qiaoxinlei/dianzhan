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

router.get('zhongbiaogongshi',async (ctx) => {
    var docx = officegen ( 'docx' );
    let a =ctx.query
    let {num3,num4} = a
    // id  = 74
    let shuzi= await ceshi('zongfenpaixubiao')
    .where({zhaobiaonum:num3,fenbiaoname:num4})
    .select()
    
    if(shuzi ==''){
        ctx.body = '未找到相关数据'
        return
    }
    let list = []
    shuzi.map(ind=>{
        if(ind.paixu=='1'){
           list.push(ind)
        }
    })
    console.log(list,777)

    let joe1 = list[0].fenbiaoname
    let joe2 = list[0].baonum
    let joe3 = list[0].zhaobiaonum



    
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  if (month < 10) {
      month = "0" + month;
   }
  if (day < 10) {
      day = "0" + day;
  }
  var nowDate = year + '-' + month + '-' + day; 
        console.log('exportWord-------------');
        docx.on ( 'finalize', function ( written ) {
                    console.log ( 'Finish to create Word file.\nTotal bytes created: ' + written + '\n' );
                });


        docx.on ( 'error', function ( err ) {
                    console.log ( err,'报错了' );
                });


  



        var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '国家电网有限公司2019年电源项目第二次服务招标采购（'+joe1+'）', { bold: true,font_face: 'Arial', font_size: 12 });// 添加文字 设置字体样式 加粗 大小
        
        var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '招标编号: '+joe3+'', { bold: true,font_face: 'Arial', font_size: 12 })




        var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
        pObj.addText ( '推荐的中标候选人公示', { bold: true,font_face: 'Arial', font_size: 12 })
    
    var pObj = docx.createP ( { align: 'left' } );// 创建行 设置居中
        pObj.addText ( '各相关投标人：', { bold: false,font_face: 'Arial', font_size: 9 })

        var pObj = docx.createP ( { align: 'left' } );// 创建行 设置居中
        pObj.addText ( '    国家电网有限公司2019年电源项目第二次服务招标采购（'+joe1+'）（招标编号：'+joe3+'）评标工作已经结束。依据《中华人民共和国招标投标法实施条例》第五十三条和第五十四条的规定，现将评标委员会推荐的中标候选人予以公示，公示期3天。投标人或者其他利害关系人对依法必须进行招标的项目的评标结果有异议的，应当在中标候选人公示期间，实名以书面形式向招标人提出。提出异议的利害关系人，应提供关于利害关系的支撑材料。不受理匿名或其他形式的异议。', { bold: false,font_face: 'Arial', font_size: 9 })

      
        var table1 = [
            [{
                val: "分标",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '22',
                    cellColWidth: 6000,
                    // b:true,
                    // sz: '48',
                    // shd: {
                    //   fill: "7F7F7F",
                    //   themeFill: "text1",
                    //   "themeFillTint": "80"
                    // },
                    // fontFamily: "Avenir Book"
                }
            },{
                val: "包号",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '22',
                    cellColWidth: 6000,
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
                val: "项目单位",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '22',
                    cellColWidth: 6000,
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
                val: '排名',
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '22',
                    cellColWidth: 3000,
                    // b:true,
                    // sz: '48',
                    // shd: {
                    //   fill: "92CDDC",
                    //   themeFill: "text1",
                    //   "themeFillTint": "80"
                    // }
                }
            }, {
                val: "名称",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '22',
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
                val: "投标报价（万元）",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '22',
                    cellColWidth: 3000,
                    // b:true,
                    // sz: '48',
                    // shd: {
                    //   fill: "92CDDC",
                    //   themeFill: "text1",
                    //   "themeFillTint": "80"
                    // }
                }
            },{
                val: "质量",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '22',
                    cellColWidth: 6000,
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
                val: "工期",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '22',
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
                val: "评标情况",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '22',
                    cellColWidth: 8000,
                    // b:true,
                    // sz: '48',
                    // shd: {
                    //   fill: "92CDDC",
                    //   themeFill: "text1",
                    //   "themeFillTint": "80"
                    // }
                }
            }, {
                val: "资质能力条件",
                opts: {
                    align: "center",
                    vAlign: "center",
                    sz: '22',
                    cellColWidth: 8000,
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
  let data =  list
  let dataLen = data.length
  var aaa= 1
  for (var i = 0; i < dataLen; i++) {//循环数据库得到的数据，因为取出的数据格式为
      
      let SingleRow = [data[i]['fenbiaoname'],   data[i]['baonum'],data[i]['danwei'], '第一',  
      
      data[i]['toubiaoren'],data[i]['toubiaozongjia'], 
      '符合技术规范要求'  ,   '详见招标公告货物清单','综合排序第一名','达到招标文件要求的自制能力'
      ]
      
      table1.push(SingleRow)
  }

  var tableStyle = {
    tableColWidth: 4000,
    tableSize: 5,
    font_size:5,
    tableAlign: "left",
    tableFontFamily: "Comic Sans MS",
    borders: true   // 设置 table 的边框
  }
    
     docx.createTable(table1,tableStyle);

     var pObj = docx.createP ( { align: 'left' } );// 创建行 设置居中
         pObj.addText ( '联系方式：gysfwzx-dyfw@sgm.sgcc.com.cn', { bold: true,font_face: 'Arial', font_size: 12 })
     var pObj = docx.createP ( { align: 'right' } );// 创建行 设置居中
         pObj.addText ( '招标人：国家电网有限公司', { bold: true,font_face: 'Arial', font_size: 12 })
     var pObj = docx.createP ( { align: 'right' } );// 创建行 设置居中
         pObj.addText ( '招标代理机构：国网物资有限公司', { bold: true,font_face: 'Arial', font_size: 12 })
     var pObj = docx.createP ( { align: 'right' } );// 创建行 设置居中
         pObj.addText ( nowDate, { bold: true,font_face: 'Arial', font_size: 12 })

     var out = fs.createWriteStream ( 'out.docx' )

     var result = docx.generate (out)

     ctx.res.writeHead ( 200, {
    // 注意这里的type设置，导出不同文件type值不同application/vnd.openxmlformats-officedocument.presentationml.presentation
     'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8', 
     'Content-disposition': 'attachment;filename=' +encodeURIComponent('中标公示.doc')});
       console.log(docx.generate (ctx.res))
        docx.generate (ctx.body);// 客户端导出word









   

})
module.exports = router
/**
 * 导出word
 */






