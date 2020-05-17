//分页方法
function change(obj){
    var msg = $(obj).html();
    var searchBlog = $(".bolgrsz input[type=text]").val();
    var bstatusid = $(".bolgr>input[name=bstatusid]").val();
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
        url:ctxPath+"blog/selectmy",
        contentType:"application/json",
        data:JSON.stringify({"uid":uid,"bstatusid":bstatusid,"pageIndex":pageIndex,"searchBlog":searchBlog}),
        success:function(result){
            $(".mybolgli").remove();
            var blist = result.list;
            var totalPage = result.totalPage;
            for(var i=0;i<blist.length;i++){
                var blog = blist[i];
                var $blog = $("<div class=\"mybolgli\">" +
                    "<div class=\"ybyb\">" +
                    "<p>"+blog.btitle+"</p>" +
                    "<div><span>"+blog.bcreatetime+"</span></div>" +
                    "<div><span onclick='updateblog("+blog.bid+")' >重新发布</span><span onclick='blogview("+blog.bid+")' >查看</span><span onclick='delblog("+blog.bid+")'>删除</span></div>" +
                    "</div>" +
                    "</div>");
                $(".mybolgall").append($blog);
            }
            $(".mybolgli").show().animate({height:'80px',width:'100%'});
        }
    });
}

//查看博客
function blogview(bid){
    location.href = ctxPath+"blog/view?bid="+bid;
}

//编辑博客
function updateblog(bid){
    location.href = ctxPath+"blog/update?bid="+bid;
}

//删除博客
function delblog(bid){
    if(!confirm("确定删除此博客？")){
        return ;
    }
    var searchBlog = $(".bolgrsz input[type=text]").val();
    var bstatusid = $(".bolgr>input[name=bstatusid]").val();
    var uid = $("input[name=loginUid]").val();
    var pageIndex = parseInt($("#currentPage").val());
    $.ajax({
        type:'POST',
        url:ctxPath+"blog/delmyblog",
        contentType:"application/json",
        data:JSON.stringify({"uid":uid,"bstatusid":bstatusid,"pageIndex":pageIndex,"searchBlog":searchBlog,"bid":bid}),
        success:function(result){
            $(".mybolgli").remove();
            var totalPage = result.totalPage;
            if(totalPage<2){
                $(".pag").hide();
            }
            if($("#totalPage").val() != totalPage){
                $("#totalPage").val(totalPage);
                $(".pIndex:last").remove();
            }
            if(totalPage<pageIndex){
                $("#currentPage").val(pageIndex-1);
                $(".pIndex:last button").css("border","none");
                $(".pIndex:last button").attr("disabled","disabled");
            }
            var blist = result.list;
            for(var i=0;i<blist.length;i++){
                var blog = blist[i];
                var $blog = $("<div class=\"mybolgli\">" +
                    "<div class=\"ybyb\">" +
                    "<p>"+blog.btitle+"</p>" +
                    "<div><span>"+blog.bcreatetime+"</span></div>" +
                    "<div><span onclick='updateblog("+blog.bid+")' >重新发布</span><span onclick='blogview("+blog.bid+")' >查看</span><span onclick='delblog("+blog.bid+")'>删除</span></div>" +
                    "</div>" +
                    "</div>");
                $(".mybolgall").append($blog);
            }
            $(".mybolgli").show().animate({height:'80px',width:'100%'});
        }
    });
}


$(function () {

    //头列表样式
    $("#head-ul li:eq(1)").addClass("clickli");

    $(".bolgf ul li:eq(0)").addClass("li");
    $(".bolgf ul li").hover(function () {
        $(".bolgf ul li").removeClass("dle");
        $(this).addClass("dle");
    }, function () {
        $(".bolgf ul li").removeClass("dle");
    })
    $(".bolgf ul li").click(function () {
        $(".bolgf ul li").removeClass("li");
        $(this).addClass("li");
    })

    $(".ulsh li:eq(0)").css("color", "#000000");
    $(".ulsh li:eq(0)").addClass("lic");
    $(".ulsh li").hover(function () {
        $(".ulsh li").removeClass("lih");
        $(this).addClass("lih");
    }, function () {
        $(".ulsh li").removeClass("lih");
    })
    $(".ulsh li").click(function () {
        $(".ulsh li").css("color", "#8C8C8C");
        $(".ulsh li").removeClass("lic");
        $(this).addClass("lic");
        $(this).css("color", "#000000");
    })

    $(".bolgf ul li:eq(0)").click(function () {
        $(".bolgr2").hide();
        $(".bolgr").fadeIn(1000);
    });
    $(".bolgf ul li:eq(1)").click(function () {
        $(".bolgr").hide();
        $(".bolgr2").fadeIn(1000);
    });


    //第一次进入所显示的内容
    var uid = $("input[name=loginUid]").val();
    $.ajax({
        type:'POST',
        url:ctxPath+"blog/selectmy",
        contentType:"application/json",
        data:JSON.stringify({"uid":uid,"bstatusid":1,"pageIndex":1,"searchBlog":""}),
        success:function(result){
            $(".mybolgli").remove();
            var blist = result.list;
            var totalPage = result.totalPage;
            for(var i=0;i<blist.length;i++){
                var blog = blist[i];
                var $blog = $("<div class=\"mybolgli\">" +
                    "<div class=\"ybyb\">" +
                    "<p>"+blog.btitle+"</p>" +
                    "<div><span>"+blog.bcreatetime+"</span></div>" +
                    "<div><span onclick='updateblog("+blog.bid+")' >重新发布</span><span onclick='blogview("+blog.bid+")' >查看</span><span onclick='delblog("+blog.bid+")'>删除</span></div>" +
                    "</div>" +
                    "</div>");
                $(".mybolgall").append($blog);
            }
            $(".mybolgli").show().animate({height:'80px',width:'100%'});
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

    //头部分类切换列表
    $(".ulsh li").click(function(){
        var bstatusid = $(this).val();
        $(".bolgr>input[name=bstatusid]").val(bstatusid);
        var uid = $("input[name=loginUid]").val();
        $.ajax({
            type:'POST',
            url:ctxPath+"blog/selectmy",
            contentType:"application/json",
            data:JSON.stringify({"uid":uid,"bstatusid":bstatusid,"pageIndex":1,"searchBlog":""}),
            success:function(result){
                $(".mybolgli").remove();
                var blist = result.list;
                var totalPage = result.totalPage;
                for(var i=0;i<blist.length;i++){
                    var blog = blist[i];
                    var $blog = $("<div class=\"mybolgli\">" +
                        "<div class=\"ybyb\">" +
                        "<p>"+blog.btitle+"</p>" +
                        "<div><span>"+blog.bcreatetime+"</span></div>" +
                        "<div><span onclick='updateblog("+blog.bid+")' >重新发布</span><span onclick='blogview("+blog.bid+")' >查看</span><span onclick='delblog("+blog.bid+")'>删除</span></div>" +
                        "</div>" +
                        "</div>");
                    $(".mybolgall").append($blog);
                }
                $(".mybolgli").show().animate({height:'80px',width:'100%'});
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

    //搜索
    $(".bolgrsz input[type=button]").click(function () {
        var searchBlog = $(".bolgrsz input[type=text]").val();
        var bstatusid = $(".bolgr>input[name=bstatusid]").val();
        var uid = $("input[name=loginUid]").val();
        $.ajax({
            type:'POST',
            url:ctxPath+"blog/selectmy",
            contentType:"application/json",
            data:JSON.stringify({"uid":uid,"bstatusid":bstatusid,"pageIndex":1,"searchBlog":searchBlog}),
            success:function(result){
                $(".mybolgli").remove();
                var blist = result.list;
                var totalPage = result.totalPage;
                for(var i=0;i<blist.length;i++){
                    var blog = blist[i];
                    var $blog = $("<div class=\"mybolgli\">" +
                        "<div class=\"ybyb\">" +
                        "<p>"+blog.btitle+"</p>" +
                        "<div><span>"+blog.bcreatetime+"</span></div>" +
                        "<div><span onclick='updateblog("+blog.bid+")' >重新发布</span><span onclick='blogview("+blog.bid+")' >查看</span><span onclick='delblog("+blog.bid+")'>删除</span></div>" +
                        "</div>" +
                        "</div>");
                    $(".mybolgall").append($blog);
                }
                $(".mybolgli").show().animate({height:'80px',width:'100%'});
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