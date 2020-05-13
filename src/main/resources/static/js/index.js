//分页方法
function change(obj){
    var msg = $(obj).html();
    var searchBlog = $("#centre-search input").val();
    var btid = $("#main>input[name=btid]").val();
    var uid = 0;
    if(btid == -1){
        uid = $("input[name=loginUid]").val();
        btid = 0;
    }
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
        url:ctxPath+"/blog/select",
        contentType:"application/json",
        data:JSON.stringify({"btid":btid,"uid":uid,"pageIndex":pageIndex,"searchBlog":searchBlog}),
        success:function(result){
            $(".blog").remove();
            var blist = result.list;
            var totalPage = result.totalPage;
            for(var i=0;i<blist.length;i++){
                var blog = blist[i];
                var $blog = $("<div class=\"blog\">" +
                    "<p>"+blog.btitle+"</p>" +
                    "<span>"+blog.bcontent+"</span>" +
                    "<div>" +
                    "<div class=\"blog-user\">" +
                    "<div class=\"user-img\">" +
                    "<img src=\""+ctxPath+"/upload/"+blog.user.uimage+"\" />" +
                    "</div>" +
                    "<span>"+blog.user.uname+"</span>" +
                    "</div>" +
                    "<div class=\"blog-msg\">" +
                    "<span class=\"iconfont icon-zan\"></span>" +
                    "<span>"+blog.gnumber+"</span>\n" +
                    "<span class=\"iconfont icon-liulan\"></span>" +
                    "<span>"+blog.bnumber+"</span>\n" +
                    "</div>" +
                    "</div>" +
                    "</div>");
                $("#centre-blog").append($blog);
            }
            $(".blog").show().animate({height:'130px',width:'100%'});
        }
    });
}


$(function(){

    $("#head-ul li:eq(0)").addClass("clickli");

    //单击悬浮改变样式
    $("#main-ul li:eq(0)").addClass("main-clickli");
    $("#main-ul li").hover(function(){
        $(this).addClass("main-hoverli");
    },function(){
        $(this).removeClass("main-hoverli");
    });
    $("#main-ul li").click(function(){
        $(this).siblings().removeClass("main-clickli");
        $(this).addClass("main-clickli");
    });

	//第一次进入所显示的内容
	$.ajax({
		type:'POST',
		url:ctxPath+"/blog/select",
		contentType:"application/json",
		data:JSON.stringify({"btid":0,"uid":0,"pageIndex":1,"searchBlog":""}),
		success:function(result){
			var blist = result.list;
			var totalPage = result.totalPage;
			for(var i=0;i<blist.length;i++){
			    var blog = blist[i];
                var $blog = $("<div class=\"blog\">" +
                    "<p>"+blog.btitle+"</p>" +
                    "<span>"+blog.bcontent+"</span>" +
                    "<div>" +
                    "<div class=\"blog-user\">" +
                    "<div class=\"user-img\">" +
                    "<img src=\""+ctxPath+"/upload/"+blog.user.uimage+"\" />" +
                    "</div>" +
                    "<span>"+blog.user.uname+"</span>" +
                    "</div>" +
                    "<div class=\"blog-msg\">" +
                    "<span class=\"iconfont icon-zan\"></span>" +
                    "<span>"+blog.gnumber+"</span>\n" +
                    "<span class=\"iconfont icon-liulan\"></span>" +
                    "<span>"+blog.bnumber+"</span>\n" +
                    "</div>" +
                    "</div>" +
                    "</div>");
                $("#centre-blog").append($blog);
            }
            $(".blog").show().animate({height:'130px',width:'100%'});
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

    //左侧分类切换列表
    $("#main-ul li").click(function(){
        var btid = $(this).val();
        $("#main>input[name=btid]").val(btid);
        var btype = $(this).html();
        $("#centre-search input[type=text]").attr("placeholder","搜索"+btype+"博客");
        var uid = 0;
        if(btid == 0){
            if($(this).html() == "动态"){
                uid = $("input[name=loginUid]").val();
                if(uid == ""){
                    location.href="login";
                }
                $("#main>input[name=btid]").val("-1");
            }
        }
        $.ajax({
            type:'POST',
            url:ctxPath+"/blog/select",
            contentType:"application/json",
            data:JSON.stringify({"btid":btid,"uid":uid,"pageIndex":1,"searchBlog":""}),
            success:function(result){
                $(".blog").remove();
                var blist = result.list;
                var totalPage = result.totalPage;
                for(var i=0;i<blist.length;i++){
                    var blog = blist[i];
                    var $blog = $("<div class=\"blog\">" +
                        "<p>"+blog.btitle+"</p>" +
                        "<span>"+blog.bcontent+"</span>" +
                        "<div>" +
                        "<div class=\"blog-user\">" +
                        "<div class=\"user-img\">" +
                        "<img src=\""+ctxPath+"/upload/"+blog.user.uimage+"\" />" +
                        "</div>" +
                        "<span>"+blog.user.uname+"</span>" +
                        "</div>" +
                        "<div class=\"blog-msg\">" +
                        "<span class=\"iconfont icon-zan\"></span>" +
                        "<span>"+blog.gnumber+"</span>\n" +
                        "<span class=\"iconfont icon-liulan\"></span>" +
                        "<span>"+blog.bnumber+"</span>\n" +
                        "</div>" +
                        "</div>" +
                        "</div>");
                    $("#centre-blog").append($blog);
                }
                $(".blog").show().animate({height:'130px',width:'100%'});
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
    $("#centre-search button").click(function () {
        var searchBlog = $("#centre-search input").val();
        var btid = $("#main>input[name=btid]").val();
        var uid = 0;
        if(btid == -1){
            uid = $("input[name=loginUid]").val();
            btid = 0;
        }
        $.ajax({
            type:'POST',
            url:ctxPath+"/blog/select",
            contentType:"application/json",
            data:JSON.stringify({"btid":btid,"uid":uid,"pageIndex":1,"searchBlog":searchBlog}),
            success:function(result){
                $(".blog").remove();
                var blist = result.list;
                var totalPage = result.totalPage;
                for(var i=0;i<blist.length;i++){
                    var blog = blist[i];
                    var $blog = $("<div class=\"blog\">" +
                        "<p>"+blog.btitle+"</p>" +
                        "<span>"+blog.bcontent+"</span>" +
                        "<div>" +
                        "<div class=\"blog-user\">" +
                        "<div class=\"user-img\">" +
                        "<img src=\""+ctxPath+"/upload/"+blog.user.uimage+"\" />" +
                        "</div>" +
                        "<span>"+blog.user.uname+"</span>" +
                        "</div>" +
                        "<div class=\"blog-msg\">" +
                        "<span class=\"iconfont icon-zan\"></span>" +
                        "<span>"+blog.gnumber+"</span>\n" +
                        "<span class=\"iconfont icon-liulan\"></span>" +
                        "<span>"+blog.bnumber+"</span>\n" +
                        "</div>" +
                        "</div>" +
                        "</div>");
                    $("#centre-blog").append($blog);
                }
                $(".blog").show().animate({height:'130px',width:'100%'});
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