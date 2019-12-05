var darta ={
    method:"get",
    url:window.location.href,
    data:null,
    success:null,
    failed: null,
    async:true,
    dataType :"json"
};
function ajax(options) {
    var opst ={...darta,...options}; //对象结构赋值
    var xhr = new XMLHttpRequest();// 获取http请求协议
    if (opst.data) {//判断 有没有参数
        var temp = [];//定义一个空数组
        for (var i in opst.data) {
            temp.push(`${i}=${opst.data[i]}`)//假如 user:123,pass:123 转化 成 user=123,pass=123
        }
        var Strings = temp.join('&');// user=123,pass=123 转化 成 user=123&pass=123
    }
    if (opst.method.toLowerCase()==='get'&& Strings){//判断是不是get请求 并  参数是否为空
        opst.url +='?'+Strings;//拼接url地址  ulr? user=123&pass=123
    }
    xhr.open(opst.method.toLowerCase(),opst.url,opst.async);
    //         向把请求转化成小写字母然后判断是不是get请求方式
    //        opst.url  是发送请求的地址
    //  opst.async 是不是异步请求方式 默认值为true
    xhr.onreadystatechange = function () {
        if (xhr.readyState ===4){
            if (xhr.status===200){  //判断url地址是不是正确的地址
                var datas = xhr.responseText;//接受返回值
                console.log(datas);
                if (opst.dataType==="json"){  // 判断是不是json 类型
                    datas = JSON.parse(datas);//转化json对象
                }
                opst.success && opst.success(datas);//成功的返回值
            }else{
                opst.failed && opst.failed();//失败的返回值
            }
        }
    };
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    //定义请求头的方式
    xhr.send(opst.method.toLowerCase()==='post'?Strings:null);
    //发送请求    里边是  是不是post请求方式 如果是post方法 如果参数放在里边  如果没有参数放个null
}