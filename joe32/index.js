const Koa = require('koa');
const Router = require('koa-router')
const router = new Router()
const koabody = require('koa-body')

const app = new Koa();
var static = require("koa-static");
const path = require('path');
// const libre = require('libreoffice-convert');
var docxConverter = require('docx-pdf');
// var msopdf = require('node-msoffice-pdf');

const uploadUrl = "http://hocalhost:3000/static/upload";
// app.use(bodyParser());

app.use(koabody({

    multipart: true,

    formidable: {

        maxFieldsSize: 10 * 1024 * 1024,

        multipart: true

    }

}))

// app.use(router.routes())

// app.use(router.allowedMethods())

app.use(static(__dirname, "/static"))




// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
app.use(router.routes())
app.use(router.allowedMethods())




//用户和管理接口
router.use('/', require('./Translation/tl-chaxun').routes())  //用户列表展示
router.use('/', require('./Translation/tl-denglv').routes())   //用户登录
router.use('/', require('./Translation/tl-zhuce').routes())   //用户注册
router.use('/', require('./Translation/tl-shanchu').routes())   //用户删除
router.use('/', require('./Translation/tl-inter').routes())   //专家list添加


//蓄能电站相关接口
router.use('/', require('./powerStation/pw-select').routes())     // 查询接口
router.use('/', require('./powerStation/pw-add').routes())      //新增接口
router.use('/', require('./powerStation/pw-delete').routes())  //删除接口
router.use('/', require('./powerStation/pw-query').routes())  //展示接口
router.use('/', require('./powerStation/pw-Moy').routes())   //修改接口
router.use('/', require('./powerStation/pw-bianji').routes())//采购管理跳电站 
router.use('/', require('./powerStation/pw-caigou').routes()) //采购管理查询
router.use('/', require('./powerStation/caigouxinxi').routes()) //采购信息查询


//电站大事记接口
router.use('/', require('./postory/po-look').routes())    //展示接口
router.use('/', require('./postory/po-sele').routes())     // 查询接口
router.use('/', require('./postory/po-dele').routes())      //删除接口
router.use('/', require('./postory/po-add').routes())        //新增接口
router.use('/', require('./postory/po-move').routes())        //修改接口


//采购管理模块数据
router.use('/', require('./pomment/pm-look').routes())       //查询
router.use('/', require('./pomment/pm-zhanshi').routes())   //展示
router.use('/', require('./pomment/pm-new').routes())      //新增
router.use('/', require('./pomment/pm-shanchu').routes())  //删除
router.use('/', require('./pomment/pm-xiugai').routes())  //修改
router.use('/', require('./pomment/pm-money').routes())  //返回招标金额小于o的数据
router.use('/', require('./pomment/pm-zhuanjia').routes())  //返回招标金额小于o的数据



//供应商模块
router.use('/', require('./gongyingshang/gs-look').routes())  //展示
router.use('/', require('./gongyingshang/gs-add').routes())  //新增
router.use('/', require('./gongyingshang/gs-sele').routes())  //查询
router.use('/', require('./gongyingshang/gs-move').routes())  //修改
router.use('/', require('./gongyingshang/gs-dele').routes())   //删除
router.use('/', require('./gongyingshang/gs-history').routes())   //历史
router.use('/', require('./gongyingshang/gs-tiaozhuan').routes())    //采购管理跳供应商

//供应商资质模块
router.use('/', require('./gys-zizhi/zz-zhanshi').routes())  //展示
router.use('/', require('./gys-zizhi/zz-xinzeng').routes())  //新增
router.use('/', require('./gys-zizhi/zz-shanchu').routes())  //删除

//供应商安全模块
router.use('/', require('./gys-anquan/aq-zhanshi').routes())  //展示
router.use('/', require('./gys-anquan/aq-xinzeng').routes())  //新增
router.use('/', require('./gys-anquan/aq-shanchu').routes())  //删除

//供应商人力模块
router.use('/', require('./gys-renli/rl-zhanshi').routes())  //展示
router.use('/', require('./gys-renli/rl-xinzeng').routes())  //新增
router.use('/', require('./gys-renli/rl-shanchu').routes())  //删除


//评审管理模块
router.use('/', require('./pingshen/po-look').routes())//展示
router.use('/', require('./pingshen/po-sele').routes())//查询
router.use('/', require('./pingshen/po-dele').routes())//删除
router.use('/', require('./pingshen/po-add').routes())//新增
router.use('/', require('./pingshen/po-move').routes())//修改
router.use('/', require('./pingshen/seledianzhan').routes())//跳转电站
router.use('/', require('./pingshen/canshushezhi').routes())//跳转电站
router.use('/', require('./pingshen/canshuchakan').routes())//跳转电站





//评标管理
router.use('/', require('./pingbiaoguanli/canshushezhi').routes())//参数设置 c 
router.use('/', require('./pingbiaoguanli/canshulook').routes())//参数查看 c n1
router.use('/', require('./pingbiaoguanli/jiagegongshi').routes())//价格公式查看
router.use('/', require('./pingbiaoguanli/jiagegongshigenggai').routes())//价格公式查看
router.use('/', require('./pingbiaoguanli/quanzhongshezhi').routes())//权重 查看
router.use('/', require('./pingbiaoguanli/quanzhonggenggai').routes())//权重 查看


router.use('/', require('./zongfenpaixu/jishangfen').routes())//总分表导入
router.use('/', require('./zongfenpaixu/mobandaochu').routes())//总分排序魔板导出
router.use('/', require('./zongfenpaixu/zuizhongdaochu').routes())//总分表导出
router.use('/', require('./zongfenpaixu/zongfenpaixuchakan').routes())//总分表查看
router.use('/', require('./zongfenpaixu/zuizhongfenlook').routes())//总分表查看
router.use('/', require('./zongfenpaixu/zongfenxiugai').routes())//总分表查看

router.use('/', require('./zongfenpaixu/wenjiandaochu').routes())//总分表查看

router.use('/', require('./pingbiaoguanli/huzhi').routes())//总分表导出
router.use('/', require('./pingbiaoguanli/sbyz-chakan').routes())//授标原则数据源
router.use('/', require('./pingbiaoguanli/sbyz-zhanshi').routes())//授标原则展示
router.use('/', require('./pingbiaoguanli/sbyz-xinzeng').routes())//授标原则展示
router.use('/', require('./pingbiaoguanli/xiaojie').routes())//xiaojie
router.use('/', require('./pingbiaoguanli/xiaojielook').routes())//xiaojielook



//开标一览表价格分计算
router.use('/', require('./kaibiaoyilanbiao/kb-fenshu').routes()) //开标一览表价格分数计算
router.use('/', require('./kaibiaoyilanbiao/kb-daoru').routes())  //开标一览表导入
router.use('/', require('./kaibiaoyilanbiao/kb-chaxun').routes())  //开标一览表查看
router.use('/', require('./kaibiaoyilanbiao/weijinruyulan').routes())  //开标一览表查看
router.use('/', require('./kaibiaoyilanbiao/zhuyaorenyuanyulan').routes())  //开标一览表查看
router.use('/', require('./kaibiaoyilanbiao/baolook').routes())  //开标一览表查看
router.use('/', require('./kaibiaoyilanbiao/tankuang').routes())  //开标一览表查看
//导入导出接口
router.use('/', require('./excel/read').routes()) //电站导出
// router.use('/', require('./excel/world').routes())  //wold
router.use('/', require('./excel/express').routes())  //电站导入
router.use('/', require('./excel/rishi').routes())
router.use('/', require('./excel/caigouguanlidaochu').routes())   //采购管理导出
router.use('/', require('./excel/zhongbiaogongshi').routes())   //中标公示导出
router.use('/', require('./excel/zhongbiaopush').routes())   //中标公示导出前当前标包排序第一数据推送

router.use('/', require('./excel/gongyingshangread').routes())   //中标公示导出前当前标包排序第一数据推送

router.use('/', require('./demo').routes())


//fileload文件导入
router.use('/', require('./fileload/zhuanyezige').routes())
router.use('/', require('./fileload/guizeceluo').routes())
router.use('/', require('./fileload/zuigaoxianjia').routes())
router.use('/', require('./fileload/hangqingbaojia').routes())
router.use('/', require('./fileload/zhaobiaogonggao').routes())
router.use('/', require('./fileload/youxuanshunxu').routes())
router.use('/', require('./fileload/huchiguanxi').routes())
router.use('/', require('./fileload/zhuyaorenyuan').routes())
router.use('/', require('./fileload/filedaochu').routes())
router.use('/', require('./fileload/shangwufendaoru').routes())
router.use('/', require('./fileload/jishufendaoru').routes())
router.use('/', require('./fileload/weijinruxiangqing').routes())

router.use('/', require('./guizefile/filedaoru').routes())
router.use('/', require('./guizefile/falvlook').routes())
router.use('/', require('./guizefile/falvchaxun').routes())
router.use('/', require('./guizefile/falvchakan').routes())



router.use('/', require('./zhaobiaojindu/zb-noprice').routes())


//授标原则
router.use('/', require('./shoubiaoyuanze/shoubiaoyuanze').routes())
router.use('/', require('./shoubiaoyuanze/zuihoupaixu').routes())


