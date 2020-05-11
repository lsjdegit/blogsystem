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
        $.ajax({
            type:'post',
            url:'user/login',
            data:'uname='+name+'&upassword='+pwd,
            success:function(result){
                var us=eval(result);
                alert("aa");
                if(us!=null){//登录成功
                    if("admin"==us){//管理员登录
                        location.href="success.html";
                    }else{//普通用户登录
                        location.href="index";
                    }
                }else{//登录失败
                    $("#user").val("");
                    $("#password").val("");
                    $("#yanzheng").val("");
                }
            }
        })
    })
})