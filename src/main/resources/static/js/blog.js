//回复
function huifu(obj) {
    var parentid = $(obj).next().next().val();
    $("input[name=parentid]").val(parentid);
    $(".pinglun form input[type=text]").attr("placeholder","回复"+$(obj).parent().prev().text());
}

//评论回复
function chakan(obj) {
    if ($(obj).parent().next().css("display") == "none") {
        $(obj).parent().next().slideDown(200);
        $(obj).html("收起回复");
        $(obj).prev().css("display", "none");
    } else if ($(obj).parent().next().css("display") != "none") {
        $(obj).parent().next().slideUp(200);
        $(obj).html("查看回复");
        $(obj).prev().css("display", "block");
    }
}

//删除评论
function delComm(obj){
    if(!confirm("删除此评论？")){
        return ;
    }
    var cid = $(obj).parent().children("input[name=cid]").val();
    $.ajax({
        type: 'POST',
        url: ctxPath + "/comment/del",
        data: "cid="+cid,
        success: function (result) {
            if(result){
                $(obj).parents("li").remove();
            }
        }
    })
}

//删回复
function delSonComm(obj){
    if(!confirm("删除此评论？")){
        return ;
    }
    var cid = $(obj).next().val();
    $.ajax({
        type: 'POST',
        url: ctxPath + "/comment/del",
        data: "cid="+cid,
        success: function (result) {
            if(result){
                var sons = parseInt($(obj).parents("li").children("p").eq(0).children("span").eq(3).html().substr(1,1));
                $(obj).parents("li").children("p").eq(0).children("span").eq(3).html("("+(sons-1)+")");
                if(sons == 1){
                    $(obj).parents("li").children("p").eq(0).children("span").eq(3).hide();
                    $(obj).parents("li").children("p").eq(0).children("span").eq(4).hide();
                    $(obj).parents(".huifu").hide();
                }
                $(obj).parent().parent().remove();
            }
        }
    })
}


$(function () {

    //博客内容
    var bcontent = $("#article input[name=bcontent]").val();
    var $bcontent = $(bcontent);
    $(".rcenter").append($bcontent);
    $(".rcenter").fadeIn(1000);

    //是否点赞是否收藏
    if($(".rbottom input[name=ispraise]").val() == 1){
        $("#ult li:eq(0) span:eq(0)").css("color","red");
        $("#ult li:eq(0) span:eq(1)").html("已赞");
    }
    if($(".rbottom input[name=iscollect]").val() == 1){
        $("#ult li:eq(2) span:eq(0)").css("color","#ffaa00");
        $("#ult li:eq(2) span:eq(1)").html("已收藏");
    }

    //点赞取消赞
    $("#ult li:eq(0)").click(function () {
        var yuid = $("input[name=loginUid]").val();
        var bid = $("input[name=bid]").val();
        var uid = $("input[name=buid]").val();
        if(yuid == 0 || uid == ""){
            if(confirm("你还没登录，是否去登录？")){
                location.href = ctxPath+"login";
            }
            return ;
        }
        if($("#ult li:eq(0) span:eq(1)").html() == "点赞"){
            $.ajax({
                type: 'POST',
                url: ctxPath + "/praise/add",
                data: "yuid="+yuid+"&bid="+bid+"&uid="+uid,
                async:false,
                success: function (result) {
                    if(result){
                        $("#ult li:eq(0) span:eq(0)").css("color","red");
                        $("#ult li:eq(0) span:eq(1)").html("已赞");
                        var pnumber = parseInt($("#ult li:eq(0) span:eq(2)").html());
                        $("#ult li:eq(0) span:eq(2)").html(pnumber+1);
                    }
                }
            });
            return ;
        }
        if($("#ult li:eq(0) span:eq(1)").html() == "已赞"){
            $.ajax({
                type: 'POST',
                url: ctxPath + "/praise/del",
                contentType:"application/json",
                data:JSON.stringify({"bid":bid,"uid":yuid}),
                async:false,
                success: function (result) {
                    if(result){
                        $("#ult li:eq(0) span:eq(0)").css("color","#666");
                        $("#ult li:eq(0) span:eq(1)").html("点赞");
                        var pnumber = parseInt($("#ult li:eq(0) span:eq(2)").html());
                        $("#ult li:eq(0) span:eq(2)").html(pnumber-1);
                    }
                }
            })
        }
    });

    //评论获取焦点
    $("#ult li:eq(1)").click(function () {
        $(".pinglun form input[type=text]").focus();
    })

    //打赏验证
    $("#ult li:eq(3)").click(function () {
        var uid = $("input[name=loginUid]").val();
        if(uid == 0 || uid == ""){
            $("#myModal").remove();
            if(confirm("你还没登录，是否去登录？")){
                location.href = ctxPath+"login";
            }
            return ;
        }
    })

    //收藏取消收藏
    $("#ult li:eq(2)").click(function () {
        var uid = $("input[name=loginUid]").val();
        var bid = $("input[name=bid]").val();
        if(uid == 0 || uid == ""){
            if(confirm("你还没登录，是否去登录？")){
                location.href = ctxPath+"login";
            }
            return ;
        }
        if($("#ult li:eq(2) span:eq(1)").html() == "收藏"){
            $.ajax({
                type: 'POST',
                url: ctxPath + "/collect/add",
                contentType:"application/json",
                data:JSON.stringify({"bid":bid,"uid":uid}),
                async:false,
                success: function (result) {
                    if(result){
                        $("#ult li:eq(2) span:eq(0)").css("color","#ffaa00");
                        $("#ult li:eq(2) span:eq(1)").html("已收藏");
                        var cnumber = parseInt($("#ult li:eq(2) span:eq(2)").html());
                        $("#ult li:eq(2) span:eq(2)").html(cnumber+1);
                    }
                }
            })
            return ;
        }
        if($("#ult li:eq(2) span:eq(1)").html() == "已收藏"){
            $.ajax({
                type: 'POST',
                url: ctxPath + "/collect/del",
                contentType:"application/json",
                data:JSON.stringify({"bid":bid,"uid":uid}),
                async:false,
                success: function (result) {
                    if(result){
                        $("#ult li:eq(2) span:eq(0)").css("color","#666");
                        $("#ult li:eq(2) span:eq(1)").html("收藏");
                        var cnumber = parseInt($("#ult li:eq(2) span:eq(2)").html());
                        $("#ult li:eq(2) span:eq(2)").html(cnumber-1);
                    }
                }
            })
        }
    });

    //发布评论
    $(".pinglun form button").click(function () {
        var uid = $("input[name=loginUid]").val();
        var bid = $("input[name=bid]").val();
        var parentid = $("input[name=parentid]").val();
        var cocontext = $(".pinglun form input[type=text]").val();
        if(uid == 0 || uid == ""){
            if(confirm("你还没登录，是否去登录？")){
                location.href = ctxPath+"login";
            }
            return ;
        }
        if(cocontext == ""){
            alert("请输入评论内容！");
            return ;
        }
        $.ajax({
            type: 'POST',
            url: ctxPath + "/comment/add",
            contentType:"application/json",
            data:JSON.stringify({"bid":bid,"uid":uid,"parentid":parentid,"cocontext":cocontext}),
            async:false,
            success: function (result) {
                var cnumber = parseInt($("#ult li:eq(1) span:eq(3)").html());
                $("#ult li:eq(1) span:eq(3)").html(cnumber+1);
                $(".pinglun form input[type=text]").val("");
                if(parentid == 0){
                    var $comment = $("<li>" +
                        "<img src=\""+ctxPath+"/upload/"+result.user.uimage+"\" style=\"width: 30px;height: 30px; border-radius: 15px;\">" +
                        "<span style=\"margin-left: 10px;\" >"+result.user.uname+"：</span>" +
                        "<p style=\"margin-left: 40px;\">" +
                        "<span>"+result.cocontext+"</span>" +
                        "<span style=\"color: burlywood;margin-left: 10px\">"+result.comtime+"</span>" +
                        "<span style=\"float: right;margin-left: 10px;color:#1B9AF7;cursor: pointer;\" onclick=\"delComm(this)\">删除</span>"+
                        "<span class=\"count\" style=\"float: right;color:#1B9AF7;cursor: pointer;display: none;\" >(0)</span>" +
                        "<span style=\"color:#1B9AF7;float: right;cursor: pointer;display: none;\" class=\"chakan\" onclick=\"chakan(this)\">查看回复</span>"+
                        "<span style=\"color:#1B9AF7;float: right; margin-right: 10px;cursor: pointer;\" class=\"getparent\" onclick=\"huifu(this)\">回复</span>" +
                        "<input type=\"hidden\" name=\"cuid\" value=\""+result.user.uid+"\" />" +
                        "<input type=\"hidden\" name=\"cid\" value=\""+result.cid+"\" />" +
                        "<div style=\"margin-left: 50px; display: none;padding:5px ;box-sizing: border-box\" class=\"huifu\">" +
                        "</div>" +
                        "</p>" +
                        "</li>");
                    $(".plul").prepend($comment);
                }else{
                    var $comment = $("<div style=\"height: 30px;margin-top: 5px;\">" +
                        "<img src=\""+ctxPath+"/upload/"+result.user.uimage+"\" style=\"width: 30px;height: 30px; border-radius: 15px; float:left;\"/>" +
                        "<p style=\"margin-left: 10px;float: left\">" +
                        "<span style=\"margin-left: 5px\">"+result.user.uname+"</span>" +
                        "<span>回复</span>" +
                        "<span style=\"margin-left: 5px\" >"+result.parent.uname+"</span>" +
                        "<sapn>：</sapn>" +
                        "</p>" +
                        "<p style=\"margin-left: 30px;\">" +
                        "<span>"+result.cocontext+"</span>" +
                        "<span style=\"color: burlywood;margin-left: 10px\" >"+result.comtime+"</span>" +
                        "<span style=\"float: right;margin-left: 10px;color:#1B9AF7;cursor: pointer;\" onclick=\"delSonComm(this)\">删除</span>" +
                        "<input type=\"hidden\" value=\""+result.cid+"\" />" +
                        "</p>" +
                        "</div>");
                    $("input[name=cid][value="+parentid+"]").parent().next().prepend($comment);
                    $("input[name=cid][value="+parentid+"]").parent().children("span:eq(4)").css("display","inline-block");
                    var sons = parseInt($("input[name=cid][value="+parentid+"]").parent().children("span:eq(3)").html().substr(1,1));
                    $("input[name=cid][value="+parentid+"]").parent().children("span:eq(3)").html("("+(sons+1)+")");
                    if($("input[name=cid][value="+parentid+"]").parent().next().css("display") == "none"){
                        $("input[name=cid][value="+parentid+"]").parent().children("span:eq(4)").click();
                    }
                    $("input[name=parentid]").val("0");
                    $(".pinglun form input[type=text]").attr("placeholder","");
                }
            }
        })
    });
    
    //打赏选择金额
    $(".moneyul li span").click(function () {
        $(".moneyul li span").css({"color": "#333","border-color": "#ccc"});
        $(this).css({"color": "#00BFF3","border-color": "#00BFF3"});
        $("input[name=money]").val($(this).html().substring(0,$(this).html().length-1));
        $(".msg").hide();
        $(".modal-footer button:eq(1)").prop("disabled",false);
        var uid = $("input[name=loginUid]").val();
        $.ajax({
            type: 'POST',
            url: ctxPath + "/user/getblance",
            data: "uid=" + uid,
            async: false,
            success: function (result) {
                if($("input[name=money]").val()>result){
                    $(".msg").show();
                    $(".modal-footer button:eq(1)").prop("disabled",true);
                }
            }
        })
    });
    $(".moneyul li:eq(0) span").click();

    //充值
    $(".modal-footer button:eq(0)").click(function () {
        location.href = ctxPath+"personal";
    });

    //打赏
    $(".modal-footer button:eq(1)").click(function () {
        if(confirm("打赏此博客"+$("input[name=money]").val()+"元?")){
            var uid = $("input[name=loginUid]").val();
            var bid = $("input[name=bid]").val();
            var money = $("input[name=money]").val();
            $.ajax({
                type: 'POST',
                url: ctxPath + "/excep/add",
                contentType: "application/json",
                data: JSON.stringify({"bid": bid, "uid": uid, "money": money}),
                async: false,
                success: function (result) {
                    if(result){
                        alert("打赏成功！");
                        $(".modal-footer button:eq(2)").click();
                    }
                }
            })
        }
    });

    //关注
    $(".lbottom button:eq(1)").click(function () {
        var uid = $("input[name=loginUid]").val();
        if(uid == 0 || uid == ""){
            if(confirm("你还没登录，是否去登录？")){
                location.href = ctxPath+"login";
            }
            return ;
        }
        var ad = $(this).html();
        var buid = $(this).next().val();
        var url = "";
        if(ad == "关注"){
            url = "addcare";
        }else{
            url = "delcare";
        }
        $.ajax({
            type:'POST',
            url:ctxPath+"/user/"+url,
            contentType:"application/json",
            data:JSON.stringify({"uid":buid,"fansid":uid}),
            success:function(result){
                if(result==0){
                    $(".lbottom button:eq(1)").html("关注");
                    $(".lbottom button:eq(1)").removeClass("btn-default");
                    $(".lbottom button:eq(1)").removeClass("btn-danger");
                    $(".lbottom button:eq(1)").addClass("btn-danger");
                }
                if(result==1){
                    $(".lbottom button:eq(1)").html("取消关注");
                    $(".lbottom button:eq(1)").removeClass("btn-default");
                    $(".lbottom button:eq(1)").removeClass("btn-danger");
                    $(".lbottom button:eq(1)").addClass("btn-default");
                }
            }
        })
    });

})

