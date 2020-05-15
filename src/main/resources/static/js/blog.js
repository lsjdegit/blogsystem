$(function () {

    //博客内容
    var bcontent = $("#article input[name=bcontent]").val();
    var $bcontent = $(bcontent);
    $(".rcenter").append($bcontent);
    $(".rcenter").fadeIn(1000);

    //评论回复
    $(".chakan").click(function () {
        if ($(".huifu").css("display") == "none") {
            $(".huifu").slideDown(200);
            $(this).html("收起评论");
            $(".count").css("display", "none");
        } else if ($(".huifu").css("display") != "none") {
            $(".huifu").slideUp(200);
            $(this).html("查看评论");
            $(".count").css("display", "block");
        }
    })

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
        if(yuid == 0){
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

    //收藏取消收藏
    $("#ult li:eq(2)").click(function () {
        var uid = $("input[name=loginUid]").val();
        var bid = $("input[name=bid]").val();
        if(uid == 0){
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
        if(uid == 0){
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
                var $comment = $("<li>" +
                    "<img src=\""+ctxPath+"/upload/"+result.user.uimage+"\" style=\"width: 30px;height: 30px; border-radius: 10px;\">" +
                    "<span style=\"margin-left: 10px;\" >"+result.user.uname+"：</span>" +
                    "<p style=\"margin-left: 40px;\">" +
                    "<span>"+result.cocontext+"</span>" +
                    "<span style=\"color: burlywood;margin-left: 10px\">"+result.comtime+"</span>" +
                    "<span style=\"color:#1B9AF7;float: right; margin-right: 10px;cursor: pointer\">回复</span>" +
                    "<input type=\"hidden\" name=\"cuid\" value=\""+result.user.uid+"\" />" +
                    "<div style=\"margin-left: 50px; display: none;padding:5px ;box-sizing: border-box\" class=\"huifu\">" +
                    "</div>" +
                    "</p>" +
                    "</li>");
                $(".plul").prepend($comment);
            }
        })
    });

})

