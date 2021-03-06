function background() {
    $("body").animate({backgroundPositionY: -170}, 10000, "linear");
    $("body").animate({backgroundPositionY: 0}, 10000, "linear", function () {
        background();
    });
}


$(function () {
    background();

    $("#email").validatebox({
        missingMessage: "邮箱不能为空",
        invalidMessage: "请输入正确的邮箱格式"
    })
    $("#user").validatebox({
        missingMessage: "用户名不能为空"
    })
    $("#password").validatebox({
        missingMessage: "密码不能为空"
    })
    $("#repassword").validatebox({
        missingMessage: "密码不能为空"
    })
    $("#code").validatebox({
        missingMessage: "验证码不能为空"
    })
    $(".shangimg").validatebox({
        missingMessage: "请上传图片"
    })
    /**
     *用户名至少有两位
     */
    $.extend($.fn.validatebox.defaults.rules, {
        minLength: {
            validator: function (value, param) {
                return value.length >= param[0];
            },
            message: '用户名至少要2个字符'
        }
    });
    /**
     *验证密码在6~16为字符
     */
    $.extend($.fn.validatebox.defaults.rules, {
        pwd: {
            validator: function (value, param) {
                return value.length >= param[0] && value.length <= param[1];
            },
            message: '密码在6~16为字符'
        }
    })
    $("#register").click(function () {
        $("#bodyfrom").submit();
    })

    $("input[name=uname]").blur(function () {
        var flag = shifou();
        if(!flag){
            alert("用户名已存在！");
        }
    });

    $("#bodyfrom").submit(function () {
        if (!(user() && pwd() && repwd() && email() && yanzheng() && shifou())) {
            // alert(user());
            // alert(pwd());
            // alert(repwd());
            // alert(email());
            // alert(yanzheng());
            // alert("注册成功");
            return false;
        } else {
            return true;
        }
    });


})

/**
 * 验证用户名是否符合大于等于2个字符
 */
function user() {
    var us = $("#user").val();
    if (us.length > 1) {
        return true;
    } else {
        return false;
    }
}

/**
 * 验证密码是否符合4-10位
 * @returns {boolean}
 */
function pwd() {
    var pwd = $("#pwd").val();
    var rep = /^\w{6,16}$/;
    if (rep.test(pwd) == false) {
        return false;
    } else {
        return true;
    }
}

/**
 * 判断两次密码输入是否一致
 */
function repwd() {
    var pwd = $("#pwd").val();
    var rep = /^\w{6,16}$/;
    var repwd = $("#repwd").val();
    if (pwd != repwd && rep.test(repwd) == false) {
        return false;
    } else {
        return true;
    }
}

/**
 * 判断邮箱格式是否符合
 */
function email() {
    var email = $("#email").val();
    var reg = /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
    if (reg.test(email) == false) {
        return false;
    } else {
        return true;
    }
}

/**
 * 点击发送验证码给指定邮箱发送6位数的验证码
 */
function getemail() {
    var email = $("#email").val();
    $.ajax({
        type: "post",
        url: "user/sendEmail",
        data: 'email=' + email,
        success: function (result) {
            $("#cfaode").prop("readonly", false);
            alert("邮箱验证码发送成功，请注意查收。");
        }
    })
}

function shifou() {
    var uname = $("input[name=uname]").val();
    var flag = true;
    $.ajax({
        type: "post",
        url: "user/shifou",
        data: 'uname=' + uname,
        async: false,
        success: function (result) {
            if (result) {
                flag = false;
            } else {
                flag = true;
            }
        }
    })
    if(flag){
        return true;
    }else {
        return false;
    }
}

/**
 * 获取用户的验证码比较与发送的验证码是否一致
 * @returns {boolean}
 */
function yanzheng() {
    var code = $("#code").val();
    if (code == "") {
        alert("请输入验证码！");
        return false;
    } else {
        var flag;
        $.ajax({
            type: "post",
            url: "user/panduan?code=" + code,
            async: false,//同步模式
            success: function (result) {
                flag = eval(result);
            }
        })
        if (!flag) {
            alert("输入的验证码错误！");
            return false;
        } else {
            return true;
        }
    }
}