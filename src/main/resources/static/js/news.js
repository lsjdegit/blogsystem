//分页方法
function change(obj){
    var msg = $(obj).html();
    var mtypeid = $(".center>input[name=mtypeid]").val();
    var uid = $("input[name=loginUid]").val();
    var totalPage = parseInt($("#totalPage").val());
    var pageIndex = parseInt($("#currentPage").val());
    $(".pag li button").css("border","1px solid #949494");
    $(".pag li button").removeAttr("disabled");
    if(!isNaN(msg)){
        pageIndex = parseInt(msg);
        $(obj).css("border","none");
        $(obj).attr("disabled","disabled");
        if(pageIndex == 1){
            $("#prev button").attr("disabled","disabled");
            $("#one button").attr("disabled","disabled");
        }else if(pageIndex == totalPage){
            $("#next button").attr("disabled","disabled");
            $("#end button").attr("disabled","disabled");
        }
    }else if("首页" == msg){
        pageIndex = 1;
        $(".pag li").eq(pageIndex+1).children().css("border","none");
        $(".pag li").eq(pageIndex+1).children().attr("disabled","disabled");
        $("#prev button").attr("disabled","disabled");
        $(obj).attr("disabled","disabled");
    }else if("上" == msg){
        pageIndex = pageIndex-1;
        $(".pag li").eq(pageIndex+1).children().css("border","none");
        $(".pag li").eq(pageIndex+1).children().attr("disabled","disabled");
        if(pageIndex == 1){
            $("#one button").attr("disabled","disabled");
            $(obj).attr("disabled","disabled");
        }
    }else if("下" == msg){
        pageIndex = pageIndex+1;
        $(".pag li").eq(pageIndex+1).children().css("border","none");
        $(".pag li").eq(pageIndex+1).children().attr("disabled","disabled");
        if(pageIndex == totalPage){
            $("#end button").attr("disabled","disabled");
            $(obj).attr("disabled","disabled");
        }
    }else if("尾页" == msg){
        pageIndex = totalPage;
        $(".pag li").eq(pageIndex+1).children().css("border","none");
        $(".pag li").eq(pageIndex+1).children().attr("disabled","disabled");
        $("#next button").attr("disabled","disabled");
        $(obj).attr("disabled","disabled");
    }
    $("#currentPage").val(pageIndex);
    $.ajax({
        type:'POST',
        url:ctxPath+"/message/select",
        contentType:"application/json",
        data:JSON.stringify({"uid":uid,"mtypeid":mtypeid,"pageIndex":pageIndex}),
        success:function(result){
            $(".dul li").remove();
            var mlist = result.list;
            var totalPage = result.totalPage;
            if(mlist.length == 0){
                var $null = $("<li><h3 style='color: #888;text-align: center'>暂无信息！</h3></li>");
                $(".dul").append($null);
                $(".dul li").show().animate({height:'80px',width:'100%'});
                $("#centre-paging").fadeOut(1000);
                return ;
            }
            for(var i=0;i<mlist.length;i++){
                var message = mlist[i];
                var msgGo = "blog";
                var id = 0;
                var mtype = "";
                var msgGo = "blog";
                var mtitle = "";
                var unread = "";
                if(message.status == 0){
                    unread = "<img src=\""+ctxPath+"upload/unread.png\" style='width: 40px;height: 40px;position: absolute;left: 0px;top: 0px;' />";
                }
                if(message.mtypeid == 1){
                    mtype = "评论了你的博客";
                    id = message.blog.bid;
                    mtitle = message.blog.btitle;
                }else if(message.mtypeid == 2){
                    mtype = "赞了你的博客";
                    id = message.blog.bid;
                    mtitle = message.blog.btitle;
                }else if(message.mtypeid == 3){
                    mtype = "关注了你";
                    msgGo = "user";
                    id = message.yuser.uid;
                }else if(message.mtypeid == 4){
                    mtype = "回复了你的评论";
                    id = message.blog.bid;
                    mtitle = message.blog.btitle;
                }
                var $message = $("<li onclick='message(\""+msgGo+"\","+id+","+message.mid+")' style='position: relative;'>" +
                    "<img src=\""+ctxPath+"upload/"+message.yuser.uimage+"\" style=\"width: 40px; height: 40px;border-radius: 20px;margin-left: 20px;margin-top: 20px;float: left;\">" +
                    "<span style='font-size: 18px;display: inline-block;height: 80px;float: left;'>"+message.yuser.uname+"</span>" +
                    "<span style='font-size: 18px;display: inline-block;height: 80px;margin-left: 5px;float: left;'>"+mtype+"</span>" +
                    "<span style='display: inline-block;margin-left: 20px;height: 80px;padding: 0px;font-size: 20px;text-decoration: underline;width: 35%;float: left;'>"+message.blog.btitle+"</span>" +
                    "<span style='display: inline-block;float: right;color: #888;font-size: 18px;margin-right: 3%;'>"+message.mtime+"</span>" +
                    unread+
                    "</li>");
                $(".dul").append($message);
            }
            $(".dul li").show().animate({height:'80px',width:'100%'});
        }
    });
}

//消息跳转方法
function message(type,id,mid){
    $.ajax({
        type: 'POST',
        url: ctxPath + "/message/read",
        data: "mid="+mid,
        async:false,
        success: function (result) {
        }
    })
    if(type == "blog"){
        location.href = ctxPath+"blog/view?bid="+id;
    }else if(type == "user"){

    }
}

//设为已读
function read(){
    var uid = $("input[name=loginUid]").val();
    $.ajax({
        type: 'POST',
        url: ctxPath + "/message/readall",
        data: "uid="+uid,
        success: function (result) {
            if(result){
                $(".dul li img:nth-of-type(2)").remove();
            }
        }
    })
}

//清除消息
function delMsg(){
    var uid = $("input[name=loginUid]").val();
    $.ajax({
        type: 'POST',
        url: ctxPath + "/message/del",
        data: "uid="+uid,
        success: function (result) {
            if(result){
                $("#centre-paging").fadeOut(1000);
                for(var i=0;i<5;i++){
                    $(".dul li:eq("+i+")").animate({left:'1300px'});
                    $(".dul li:eq("+i+")").fadeOut(200);
                }
                var $null = $("<li><h3 style='color: #888;text-align: center;'>暂无信息！</h3></li>");
                $(".dul").append($null);
                $(".dul li").show().animate({height:'80px',width:'100%'});
            }
        }
    })
}


$(function () {

    //头列表样式
    $("#head-ul li:eq(3)").addClass("clickli");

    //首个变色
    $(".ul1 li:eq(0)").addClass("li");
    //悬浮变色
    $(".ul1 li").hover(function () {
        $(".ul1 li").removeClass("dle");
        $(this).addClass("dle");
    }, function () {
        $(".ul1 li").removeClass("dle");
    })

    $(".ul1 li").click(function () {
        $(".ul1 li").removeClass("li");
        $(this).addClass("li");
    })

    //第一次进入所显示的内容
    var uid = $("input[name=loginUid]").val();
    $.ajax({
        type:'POST',
        url:ctxPath+"/message/select",
        contentType:"application/json",
        data:JSON.stringify({"uid":uid,"mtypeid":1,"pageIndex":1}),
        success:function(result){
            $(".dul li").remove();
            var mlist = result.list;
            var totalPage = result.totalPage;
            if(mlist.length == 0){
                var $null = $("<li><h3 style='color: #888;text-align: center'>暂无信息！</h3></li>");
                $(".dul").append($null);
                $(".dul li").show().animate({height:'80px',width:'100%'});
                return ;
            }
            for(var i=0;i<mlist.length;i++){
                var message = mlist[i];
                var mtype = "评论了你的博客";
                var msgGo = "blog";
                var id = message.blog.bid;
                if(message.mtypeid == 4){
                    mtype = "回复了你的评论";
                }
                var unread = "";
                if(message.status == 0){
                    unread = "<img src=\""+ctxPath+"upload/unread.png\" style='width: 40px;height: 40px;position: absolute;left: 0px;top: 0px;' />";
                }
                var $message = $("<li onclick='message(\""+msgGo+"\","+id+","+message.mid+")' style='position: relative;'>" +
                    "<img src=\""+ctxPath+"upload/"+message.yuser.uimage+"\" style=\"width: 40px; height: 40px;border-radius: 20px;margin-left: 20px;margin-top: 20px;float: left;\">" +
                    "<span style='font-size: 18px;display: inline-block;height: 80px;float: left;'>"+message.yuser.uname+"</span>" +
                    "<span style='font-size: 18px;display: inline-block;height: 80px;margin-left: 5px;float: left;'>"+mtype+"</span>" +
                    "<span style='display: inline-block;margin-left: 20px;height: 80px;padding: 0px;font-size: 20px;text-decoration: underline;width: 35%;float: left;'>"+message.blog.btitle+"</span>" +
                    "<span style='display: inline-block;float: right;color: #888;font-size: 18px;margin-right: 3%;'>"+message.mtime+"</span>" +
                    unread +
                    "</li>");
                $(".dul").append($message);
            }
            $(".dul li").show().animate({height:'80px',width:'100%'});
            //页码
            $("#totalPage").val(totalPage);
            if(totalPage<2){
                $("#centre-paging").fadeOut(1000);
            }else{
                $("#centre-paging").fadeIn(1000);
                $(".pIndex").remove();
                for(var i=0;i<totalPage;i++){
                    var li = $("<li class=\"pIndex\"><button onclick=\"change(this)\">"+(i+1)+"</button></li>");
                    if(i==0){
                        li = $("<li class=\"pIndex\"><button onclick=\"change(this)\" style=\"border: none;\">"+(i+1)+"</button></li>");
                    }
                    $("#next").before(li);
                }
            }
        }
    })

    //消息分类
    $(".ul1 li").click(function () {
        var mtypeid = $(this).prev().val();
        $.ajax({
            type:'POST',
            url:ctxPath+"/message/select",
            contentType:"application/json",
            data:JSON.stringify({"uid":uid,"mtypeid":mtypeid,"pageIndex":1}),
            success:function(result){
                $(".dul li").remove();
                var mlist = result.list;
                var totalPage = result.totalPage;
                if(mlist.length == 0){
                    var $null = $("<li><h3 style='color: #888;text-align: center'>暂无信息！</h3></li>");
                    $(".dul").append($null);
                    $(".dul li").show().animate({height:'80px',width:'100%'});
                    $("#centre-paging").fadeOut(1000);
                    return ;
                }
                for(var i=0;i<mlist.length;i++) {
                    var message = mlist[i];
                    var msgGo = "blog";
                    var id = 0;
                    var mtype = "";
                    var mtitle = "";
                    var unread = "";
                    if(message.status == 0){
                        unread = "<img src=\""+ctxPath+"upload/unread.png\" style='width: 40px;height: 40px;position: absolute;left: 0px;top: 0px;' />";
                    }
                    if(message.mtypeid == 1){
                        mtype = "评论了你的博客";
                        id = message.blog.bid;
                        mtitle = message.blog.btitle;
                    }else if(message.mtypeid == 2){
                        mtype = "赞了你的博客";
                        id = message.blog.bid;
                        mtitle = message.blog.btitle;
                    }else if(message.mtypeid == 3){
                        mtype = "关注了你";
                        msgGo = "user";
                        id = message.yuser.uid;
                    }else if(message.mtypeid == 4){
                        mtype = "回复了你的评论";
                        id = message.blog.bid;
                        mtitle = message.blog.btitle;
                    }
                    var $message = $("<li onclick='message(\""+msgGo+"\","+id+","+message.mid+")' style='position: relative;'>" +
                        "<img src=\""+ctxPath+"upload/"+message.yuser.uimage+"\" style=\"width: 40px; height: 40px;border-radius: 20px;margin-left: 20px;margin-top: 20px;float: left;\">" +
                        "<span style='font-size: 18px;display: inline-block;height: 80px;float: left;'>"+message.yuser.uname+"</span>" +
                        "<span style='font-size: 18px;display: inline-block;height: 80px;margin-left: 5px;float: left;'>"+mtype+"</span>" +
                        "<span style='display: inline-block;margin-left: 20px;height: 80px;padding: 0px;font-size: 20px;text-decoration: underline;width: 35%;float: left;'>"+mtitle+"</span>" +
                        "<span style='display: inline-block;float: right;color: #888;font-size: 18px;margin-right: 3%;'>"+message.mtime+"</span>" +
                        unread+
                        "</li>");
                    $(".dul").append($message);
                }
                $(".dul li").show().animate({height:'80px',width:'100%'});
                //页码
                $("#totalPage").val(totalPage);
                if(totalPage<2){
                    $("#centre-paging").fadeOut(1000);
                }else{
                    $("#centre-paging").fadeIn(1000);
                    $(".pIndex").remove();
                    for(var i=0;i<totalPage;i++){
                        var li = $("<li class=\"pIndex\"><button onclick=\"change(this)\">"+(i+1)+"</button></li>");
                        if(i==0){
                            li = $("<li class=\"pIndex\"><button onclick=\"change(this)\" style=\"border: none;\">"+(i+1)+"</button></li>");
                        }
                        $("#next").before(li);
                    }
                }
            }
        })
    });


})