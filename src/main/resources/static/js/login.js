$(function(){
    $("#user").validatebox({
        missingMessage:"用户名不能为空"
    })
    $("#password").validatebox({
        missingMessage:"密码不能为空"
    })
    $("#yanzheng").validatebox({
        missingMessage:"验证码不能为空"
    })

    $("#login").click(function(){
        var name=$("#user").val();
        var pwd=$("#password").val();
        var yanzhen=$("#yanzheng").val();
        $.ajax({
            type:'post',
            url:'user/login',
            data:'uname='+name+'&upassword='+pwd+'&yanzhen='+yanzhen,
            success:function(result){//location.href="adminindex";
               if(result=="admin"){//管理员登录
                   location.href="adminindex";
               }else if(result=="index"){//普通用户登录
                   location.href="index";
               }else if(result=="error"){//验证码不一致
                   alert("验证码不一致");
               }else if(result="cuo"){//用户名或密码错误
                   alert("用户名或密码错误");
               }
            }
        })
    })

})

function getvCode() {
    $("#verifyimg").attr("src",timestamp(ctxPath+"verifyCode"));
}
//为url添加时间戳
function timestamp(url) {
    var getTimestamp = new Date().getTime();
    if (url.indexOf("?") > -1) {
        url = url + "&timestamp=" + getTimestamp
    } else {
        url = url + "?timestamp=" + getTimestamp
    }
    return url;
};
