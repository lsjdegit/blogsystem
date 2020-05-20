/**
 * 博客分页方法
 */
function change(obj) {
    var msg = $(obj).html();
    var bcreatetime = $("input[name=date]").val();
    var tname = $(".form-group input").val();
    var totalPage = parseInt($("#totalPage").val());
    var pageIndex = parseInt($("#currentPage").val());
    var bstatusid = $("#bstatusid").val();
    $(".pag li button").css("border", "1px solid #949494");
    $(".pag li button").removeAttr("disabled");
    if (!isNaN(msg)) {
        //是数字就点击那个数字
        pageIndex = parseInt(msg);
        $(obj).css("border", "none");
        $(obj).attr("disabled", "disabled");
        if (pageIndex == 1) {
            $("#prev button").attr("disabled", "disabled");
            $("#one button").attr("disabled", "disabled");
        } else if (pageIndex == totalPage) {
            $("#next button").attr("disabled", "disabled");
            $("#end button").attr("disabled", "disabled");
        }
    } else if ("首页" == msg) {
        pageIndex = 1;
        $(".pag li").eq(pageIndex + 1).children().css("border", "none");
        $(".pag li").eq(pageIndex + 1).children().attr("disabled", "disabled");
        $("#prev button").attr("disabled", "disabled");
        $(obj).attr("disabled", "disabled");
    } else if ("上" == msg) {
        pageIndex = pageIndex - 1;
        $(".pag li").eq(pageIndex + 1).children().css("border", "none");
        $(".pag li").eq(pageIndex + 1).children().attr("disabled", "disabled");
        if (pageIndex == 1) {
            $("#one button").attr("disabled", "disabled");
            $(obj).attr("disabled", "disabled");
        }
    } else if ("下" == msg) {
        pageIndex = pageIndex + 1;
        $(".pag li").eq(pageIndex + 1).children().css("border", "none");
        $(".pag li").eq(pageIndex + 1).children().attr("disabled", "disabled");
        if (pageIndex == totalPage) {
            $("#end button").attr("disabled", "disabled");
            $(obj).attr("disabled", "disabled");
        }
    } else if ("尾页" == msg) {
        pageIndex = totalPage;
        $(".pag li").eq(pageIndex + 1).children().css("border", "none");
        $(".pag li").eq(pageIndex + 1).children().attr("disabled", "disabled");
        $("#next button").attr("disabled", "disabled");
        $(obj).attr("disabled", "disabled");
    }
    $("#currentPage").val(pageIndex);
    $(".bolgall").empty();
    $.ajax({
        type: 'post',
        url: 'blog/selectst',
        contentType: 'application/json',
        data: JSON.stringify({
            "bcreatetime": $("input[name=date]").val(),
            "searchBlog": $("input[name=btitle]").val(),
            "pageIndex": pageIndex,
            "bstatusid": bstatusid
        }),
        success: function (result) {
            var blist = result.list;
            var totalPage = result.totalPage;
            for(var a=0;a<blist.length;a++){
                var blog=blist[a];
                var $blog= $("<div class=\"mybolgli\" onclick=\"adminshen("+blog.bid+")\">"+
                    "<div class=\"ybyb\">"+
                    "<p title=\"查看\">"+blog.btitle+"</p>"+
                    "<div>"	 + "<img src=\""+ctxPath+"/upload/"+blog.user.uimage+"\" />" +
                    "<span>"+blog.user.uname+"</span>"+
                    "</div>"+
                    "<div>"+
                    "<span>"+blog.bcreatetime+"</span>"+
                    "<span class=\"iconfont icon-good_filled\">"+blog.praises.length+"</span>" +
                    "<span class=\"iconfont icon-liulan\">"+blog.bnumber+"</span>" +
                    "<span class=\"iconfont icon-shoucang\">"+blog.gnumber+"</span>" +
                    "</div>"+
                    "</div>"+
                    "</div>");

                $(".bolgall").prepend($blog);
            }
            $(".blog").show().animate({height: '80px', width: '100%'});
        }
    })
}

/**
 * 博主分页方法
 */
function changezhu(obj) {
    var msg = $(obj).html();
    var totalPage = parseInt($("#totalPage").val());
    var pageIndex = parseInt($("#currentPage").val());
    var user = $("#user").val();
    $(".pag li button").css("border", "1px solid #949494");
    $(".pag li button").removeAttr("disabled");
    if (!isNaN(msg)) {
        //是数字就点击那个数字
        pageIndex = parseInt(msg);
        $(obj).css("border", "none");
        $(obj).attr("disabled", "disabled");
        if (pageIndex == 1) {
            $("#prev button").attr("disabled", "disabled");
            $("#one button").attr("disabled", "disabled");
        } else if (pageIndex == totalPage) {
            $("#next button").attr("disabled", "disabled");
            $("#end button").attr("disabled", "disabled");
        }
    } else if ("首页" == msg) {
        pageIndex = 1;
        $(".pag li").eq(pageIndex + 1).children().css("border", "none");
        $(".pag li").eq(pageIndex + 1).children().attr("disabled", "disabled");
        $("#prev button").attr("disabled", "disabled");
        $(obj).attr("disabled", "disabled");
    } else if ("上" == msg) {
        pageIndex = pageIndex - 1;
        $(".pag li").eq(pageIndex + 1).children().css("border", "none");
        $(".pag li").eq(pageIndex + 1).children().attr("disabled", "disabled");
        if (pageIndex == 1) {
            $("#one button").attr("disabled", "disabled");
            $(obj).attr("disabled", "disabled");
        }
    } else if ("下" == msg) {
        pageIndex = pageIndex + 1;
        $(".pag li").eq(pageIndex + 1).children().css("border", "none");
        $(".pag li").eq(pageIndex + 1).children().attr("disabled", "disabled");
        if (pageIndex == totalPage) {
            $("#end button").attr("disabled", "disabled");
            $(obj).attr("disabled", "disabled");
        }
    } else if ("尾页" == msg) {
        pageIndex = totalPage;
        $(".pag li").eq(pageIndex + 1).children().css("border", "none");
        $(".pag li").eq(pageIndex + 1).children().attr("disabled", "disabled");
        $("#next button").attr("disabled", "disabled");
        $(obj).attr("disabled", "disabled");
    }
    $("#currentPage").val(pageIndex);
    $(".bolgallzhu").empty();
    $.ajax({
        type: 'post',
        url: 'user/selectall',
        contentType: 'application/json',
        data: JSON.stringify({"pageIndex": pageIndex, "uname": $("#user").val()}),
        success: function (result) {
            var ulist = result.list;
            var fei = "<img src=\"" + ctxPath + "/img/username.png\" />";
            var bozhu = "<img src=\"" + ctxPath + "/img/expert.png\" />";
            for (var i = 0; i < ulist.length; i++) {
                var blog = ulist[i];

                if (blog.isexpert != 1) {
                    var $blog = $("<div class=\"mybolgli\" onclick=\"bozhu(" + blog.uid + ")\">" +
                        "<div class=\"ybybzhu\">" +
                        "<div class=\"ybnat\">" +
                        "<img src=\"" + ctxPath + "/upload/" + blog.uimage + "\" />" +
                        fei +
                        "<span>" + blog.uname + "</span>" +
                        "<span>" + blog.email + "</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>");

                } else if (blog.isexpert == 1) {
                    var $blog = $("<div class=\"mybolgli\" onclick=\"bozhu(" + blog.uid + ")\">" +
                        "<div class=\"ybybzhu\">" +
                        "<div class=\"ybnat\">" +
                        "<img src=\"" + ctxPath + "/upload/" + blog.uimage + "\" />" +
                        bozhu +
                        "<span>" + blog.uname + "</span>" +
                        "<span>" + blog.email + "</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>");
                }
                $(".bolgallzhu").prepend($blog);
            }
            $(".mybolgli").show().animate({height: '80px', width: '100%'});
        }
    })
}


$(function () {
    /**
     * 切换审核和未审核的博客按钮
     */
    $(".admmain_er ul li:eq(0)").addClass("uler");
    $(".admmain_er ul li").click(function () {
        $(".admmain_er ul li").removeClass("uler");
        $(this).addClass("uler");
    })


    /**
     * 切换博客与博主
     */
    $("#head-uli li:eq(0)").addClass("ttou");
    $("#head-uli li").click(function () {
        $("#head-uli li").removeClass("ttou");
        $(this).addClass("ttou");
    })

    /**
     * 切换中间页面
     */
    $("#head-uli li:eq(0)").click(function () {
        $(".admmain").css("display", "block");
        $(".admmainzhu").css("display", "none");
    })
    $("#head-uli li:eq(1)").click(function () {
        $(".admmain").css("display", "none");
        $(".admmainzhu").css("display", "block");
    })


    /**
     * 遍历博客类型
     */
    $.ajax({
        type: 'post',
        url: 'blogtype/alla',
        success: function (result) {
            var sel = $("select");
            sel.append("<option value='0'>请选择</option>");
            for (var i = 0; i < result.length; i++) {
                var p = result[i];
                sel.append("<option value=\"" + p.btid + "\">" + p.tname + "</option>");
            }
        }
    })

    /**
     * 添加博客类型
     */
    $("#addblogtype").click(function () {
        var tname = $(".form-group input").val();
        var sel = $("select");
        $.ajax({
            type: 'post',
            url: 'blogtype/add',
            contentType: 'application/json',
            data: JSON.stringify({"tname": $(".form-group input").val()}),
            success: function (result) {
                var add = eval(result);
                if (add > 0) {
                    $("#myModal").modal('hide');
                    sel.append("<option>" + tname + "</option>");
                } else {
                    $("#myModal").modal('hide');
                }
            }
        })
	})
	/**
	 * 根据博客标题模糊查询相关的已审核博客信息
	 */
	$("#sou").click(function(){
        $(".pag li button").attr("onclick","change(this)");
		$(".bolgall").empty();
		$.ajax({
			type:'post',
			url:'blog/selectst',
			contentType:'application/json',
			data:JSON.stringify({"bcreatetime":$("input[name=date]").val(),"searchBlog":$("input[name=btitle]").val(),"pageIndex":1,"bstatusid":$("#bstatusid").val()}),
            success: function (result) {
                var blist = result.list;
                var totalPage = result.totalPage;
                for(var a=0;a<blist.length;a++){
                    var blog=blist[a];
                    var $blog= $("<div class=\"mybolgli\" onclick=\"adminshen("+blog.bid+")\">"+
                        "<div class=\"ybyb\">"+
                        "<p title=\"查看\">"+blog.btitle+"</p>"+
                        "<div>"	 + "<img src=\""+ctxPath+"/upload/"+blog.user.uimage+"\" />" +
                        "<span>"+blog.user.uname+"</span>"+
                        "</div>"+
                        "<div>"+
                        "<span>"+blog.bcreatetime+"</span>"+
                        "<span class=\"iconfont icon-good_filled\">"+blog.praises.length+"</span>" +
                        "<span class=\"iconfont icon-liulan\">"+blog.gnumber+"</span>" +
                        "<span class=\"iconfont icon-shoucang\">"+blog.bnumber+"</span>" +
                        "</div>"+
                        "</div>"+
                        "</div>");
                    $(".bolgall").prepend($blog);
                }
                $(".blog").show().animate({height: '80px', width: '100%'});
                //页码
                $("#totalPage").val(totalPage);
                if (totalPage < 2) {
                    $("#centre-paging").hide();
                } else {
                    $("#centre-paging").show();
                    $(".pIndex").remove();
                    for (var i = 0; i < totalPage; i++) {
                        var li = $("<li class=\"pIndex\"><button onclick=\"change(this)\">" + (i + 1) + "</button></li>");
                        if (i == 0) {
                            li = $("<li class=\"pIndex\"><button onclick=\"change(this)\" style=\"border: none;\">" + (i + 1) + "</button></li>");
                        }
                        $("#next").before(li);
                    }
                }
            }
        })
    })
    /**
     * 点击待审核遍历所有已审核的博客
     */
    $("#yi").click(function () {
        $(".pag li button").attr("onclick", "change(this)");
        $(".bolgall").empty();
        var sid = 1;
        $("#bstatusid").val(sid);
        $.ajax({
            type: 'post',
            url: 'blog/selectst',
            contentType: 'application/json',
            data: JSON.stringify({
                "bcreatetime": $("input[name=date]").val(),
                "searchBlog": $("input[name=btitle]").val(),
                "pageIndex": 1,
                "bstatusid": $("#bstatusid").val()
            }),
            success: function (result) {
                var blist = result.list;
                var totalPage = result.totalPage;
                for(var a=0;a<blist.length;a++){
                    var blog=blist[a];
                    var $blog= $("<div class=\"mybolgli\" onclick=\"adminshen("+blog.bid+")\">"+
                        "<div class=\"ybyb\">"+
                        "<p title=\"查看\">"+blog.btitle+"</p>"+
                        "<div>"	 + "<img src=\""+ctxPath+"/upload/"+blog.user.uimage+"\" />" +
                        "<span>"+blog.user.uname+"</span>"+
                        "</div>"+
                        "<div>"+
                        "<span>"+blog.bcreatetime+"</span>"+
                        "<span class=\"iconfont icon-good_filled\">"+blog.praises.length+"</span>" +
                        "<span class=\"iconfont icon-liulan\">"+blog.gnumber+"</span>" +
                        "<span class=\"iconfont icon-shoucang\">"+blog.bnumber+"</span>" +
                        "</div>"+
                        "</div>"+
                        "</div>");
                    $(".bolgall").prepend($blog);
                }
                $(".blog").show().animate({height: '80px', width: '100%'});
                //页码
                $("#totalPage").val(totalPage);
                if (totalPage < 2) {
                    $("#centre-paging").hide();
                } else {
                    $("#centre-paging").show();
                    $(".pIndex").remove();
                    for (var i = 0; i < totalPage; i++) {
                        var li = $("<li class=\"pIndex\"><button onclick=\"change(this)\">" + (i + 1) + "</button></li>");
                        if (i == 0) {
                            li = $("<li class=\"pIndex\"><button onclick=\"change(this)\" style=\"border: none;\">" + (i + 1) + "</button></li>");
                        }
                        $("#next").before(li);
                    }
                }
            }
        })
    })
    /**
     * 点击待审核遍历所有没有审核的博客
     */
    $("#dai").click(function () {
        $(".bolgall").empty();
        var sid = 0;
        $("#bstatusid").val(sid);
       $.ajax({
           type:'post',
           url:'blog/selectst',
           contentType:'application/json',
           data:JSON.stringify({"bcreatetime":$("input[name=date]").val(),"searchBlog":$("input[name=btitle]").val(),"pageIndex":1,"bstatusid":$("#bstatusid").val()}),
           success:function(result) {
               var blist = result.list;
               var totalPage = result.totalPage;
               for(var a=0;a<blist.length;a++){
                   var blog=blist[a];
                   var $blog= $("<div class=\"mybolgli\" onclick=\"adminver("+blog.bid+")\">"+
                       "<div class=\"ybyb\">"+
                       "<p title=\"查看\">"+blog.btitle+"</p>"+
                       "<div>"	 + "<img src=\""+ctxPath+"/upload/"+blog.user.uimage+"\" />" +
                       "<span>"+blog.user.uname+"</span>"+
                       "</div>"+
                       "<div>"+
                       "<span>"+blog.bcreatetime+"</span>"+
                       "<span class=\"iconfont icon-good_filled\">"+blog.praises.length+"</span>" +
                       "<span class=\"iconfont icon-liulan\">"+blog.gnumber+"</span>" +
                       "<span class=\"iconfont icon-shoucang\">"+blog.bnumber+"</span>" +
                       "</div>"+
                       "</div>"+
                       "</div>");
                   $(".bolgall").prepend($blog);
               }
                   $(".blog").show().animate({height:'80px',width:'100%'});
                   //页码
                   $("#totalPage").val(totalPage);
                   if(totalPage<2){
                       $("#centre-paging").hide();
                   }else{
                       $("#centre-paging").show();
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
        })

    /**
     * 下拉框选择博客类型遍历对应的博客
     */
    $("select").change(function () {
        $(".pag li button").attr("onclick", "change(this)");
        $(".bolgall").empty();
        $.ajax({
            type: 'post',
            url: 'blog/selectst',
            contentType: 'application/json',
            data: JSON.stringify({
                "bcreatetime": $("input[name=date]").val(),
                "searchBlog": $("input[name=btitle]").val(),
                "pageIndex": 1,
                "bstatusid": $("#bstatusid").val(),
                "btid": $("select").val()
            }),
            success: function (result) {
                var blist = result.list;
                var totalPage = result.totalPage;
                for(var a=0;a<blist.length;a++){
                    var blog=blist[a];
                    var $blog= $("<div class=\"mybolgli\" onclick=\"adminshen("+blog.bid+")\">"+
                        "<div class=\"ybyb\">"+
                        "<p title=\"查看\">"+blog.btitle+"</p>"+
                        "<div>"	 + "<img src=\""+ctxPath+"/upload/"+blog.user.uimage+"\" />" +
                        "<span>"+blog.user.uname+"</span>"+
                        "</div>"+
                        "<div>"+
                        "<span>"+blog.bcreatetime+"</span>"+
                        "<span class=\"iconfont icon-good_filled\">"+blog.praises.length+"</span>" +
                        "<span class=\"iconfont icon-liulan\">"+blog.gnumber+"</span>" +
                        "<span class=\"iconfont icon-shoucang\">"+blog.bnumber+"</span>" +
                        "</div>"+
                        "</div>"+
                        "</div>");
                    $(".bolgall").prepend($blog);
                }
                $(".blog").show().animate({height: '80px', width: '100%'});
                //页码
                $("#totalPage").val(totalPage);
                if (totalPage < 2) {
                    $("#centre-paging").hide();
                } else {
                    $("#centre-paging").show();
                    $(".pIndex").remove();
                    for (var i = 0; i < totalPage; i++) {
                        var li = $("<li class=\"pIndex\"><button onclick=\"change(this)\">" + (i + 1) + "</button></li>");
                        if (i == 0) {
                            li = $("<li class=\"pIndex\"><button onclick=\"change(this)\" style=\"border: none;\">" + (i + 1) + "</button></li>");
                        }
                        $("#next").before(li);
                    }
                }
            }
        })
    })
    /**
     * 首次进入现实所有已经审核的博客
     */
	$.ajax({
		type:'post',
		url:'blog/selectst',
		contentType:'application/json',
        data:JSON.stringify({"bcreatetime":$("input[name=date]").val(),"searchBlog":$("input[name=btitle]").val(),"pageIndex":1,"bstatusid":$("#bstatusid").val()}),
		success:function(result){
			var blist = result.list;
			var totalPage = result.totalPage;
			for(var a=0;a<blist.length;a++){
				var blog=blist[a];
				var $blog= $("<div class=\"mybolgli\" onclick=\"adminshen("+blog.bid+")\">"+
					"<div class=\"ybyb\">"+
					"<p title=\"查看\">"+blog.btitle+"</p>"+
					"<div>"	 + "<img src=\""+ctxPath+"/upload/"+blog.user.uimage+"\" />" +
	                 "<span>"+blog.user.uname+"</span>"+
					"</div>"+
					"<div>"+
					"<span>"+blog.bcreatetime+"</span>"+
					"<span class=\"iconfont icon-good_filled\">"+blog.praises.length+"</span>" +
					"<span class=\"iconfont icon-liulan\">"+blog.bnumber+"</span>" +
					"<span class=\"iconfont icon-shoucang\">"+blog.gnumber+"</span>" +
					"</div>"+
					"</div>"+
					"</div>");
				$(".bolgall").prepend($blog);
			}
                    $(".blog").show().animate({height:'80px',width:'100%'});
                    //页码
                    $("#totalPage").val(totalPage);
                    if(totalPage<2){
                        $("#centre-paging").hide();
                    }else{
                        $("#centre-paging").show();
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

    });
    /**
     * 点击博主管理遍历所有的博主
     */
    $("#head-uli li:eq(1)").click(function () {
        $("#quan").addClass("uler");
        $(".pag li button").attr("onclick", "changezhu(this)");
        $(".bolgallzhu").empty();
        $.ajax({
            type: 'post',
            url: 'user/selectall',
            contentType: 'application/json',
            data: JSON.stringify({"pageIndex": 1}),
            success: function (result) {
                var ulist = result.list;
                var totalPage = result.totalPage;
                var fei = "<img src=\"" + ctxPath + "/img/username.png\" />";
                var bozhu = "<img src=\"" + ctxPath + "/img/expert.png\" />";
                for (var i = 0; i < ulist.length; i++) {
                    var blog = ulist[i];

                    if (blog.isexpert != 1) {
                        var $blog = $("<div class=\"mybolgli\" onclick=\"bozhu(" + blog.uid + ")\">" +
                            "<div class=\"ybybzhu\">" +
                            "<div class=\"ybnat\">" +
                            "<img src=\"" + ctxPath + "/upload/" + blog.uimage + "\" />" +
                            fei +
                            "<span>" + blog.uname + "</span>" +
                            "<span>" + blog.email + "</span>" +
                            "</div>" +
                            "</div>" +
                            "</div>");

                    } else if (blog.isexpert == 1) {
                        var $blog = $("<div class=\"mybolgli\" onclick=\"bozhu(" + blog.uid + ")\">" +
                            "<div class=\"ybybzhu\">" +
                            "<div class=\"ybnat\">" +
                            "<img src=\"" + ctxPath + "/upload/" + blog.uimage + "\" />" +
                            bozhu +
                            "<span>" + blog.uname + "</span>" +
                            "<span>" + blog.email + "</span>" +
                            "</div>" +
                            "</div>" +
                            "</div>");
                    }
                    $(".bolgallzhu").prepend($blog);
                }
                $(".blog").show().animate({height: '80px', width: '100%'});
                //页码
                $("#totalPage").val(totalPage);
                if (totalPage < 2) {
                    $("#centre-paging").hide();
                } else {
                    $("#centre-paging").show();
                    $(".pIndex").remove();
                    for (var i = 0; i < totalPage; i++) {
                        var li = $("<li class=\"pIndex\"><button onclick=\"changezhu(this)\">" + (i + 1) + "</button></li>");
                        if (i == 0) {
                            li = $("<li class=\"pIndex\"><button onclick=\"changezhu(this)\" style=\"border: none;\">" + (i + 1) + "</button></li>");
                        }
                        $("#next").before(li);
                    }
                }
            }
        })
    })

    /**
     * 点击专家申请遍历所有要申请的博主
     */
    $("#shen").click(function () {
        $("#isexpert").val(2);
        $(".bolgallzhu").empty();
        $(".pag li button").attr("onclick", "changezhu(this)");
        $.ajax({
            type: 'post',
            url: 'user/selectall',
            contentType: 'application/json',
            data: JSON.stringify({"pageIndex": 1, "isexpert": $("#isexpert").val()}),
            success: function (result) {
                var ulist = result.list;
                var totalPage = result.totalPage;
                for (var i = 0; i < ulist.length; i++) {
                    var blog = ulist[i];
                    var $blog = $("<div onclick=\"exceptional(" + blog.uid + ")\" class=\"mybolgli\" href='#myModal2' data-toggle=\"modal\">" +
                        "<div class=\"ybybzhu\">" +
                        "<div class=\"ybnat\">" +
                        "<img src=\"" + ctxPath + "/upload/" + blog.uimage + "\" />" +
                        "<img src=\"" + ctxPath + "/img/username.png\" />" +
                        "<span>" + blog.uname + "</span>" +
                        "<span>" + blog.email + "</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>");
                    $(".bolgallzhu").prepend($blog);
                }
                $(".blog").show().animate({height: '80px', width: '100%'});
                //页码
                $("#totalPage").val(totalPage);
                if (totalPage < 2) {
                    $("#centre-paging").hide();
                } else {
                    $("#centre-paging").show();
                    $(".pIndex").remove();
                    for (var i = 0; i < totalPage; i++) {
                        var li = $("<li class=\"pIndex\"><button onclick=\"changezhu(this)\">" + (i + 1) + "</button></li>");
                        if (i == 0) {
                            li = $("<li class=\"pIndex\"><button onclick=\"changezhu(this)\" style=\"border: none;\">" + (i + 1) + "</button></li>");
                        }
                        $("#next").before(li);
                    }
                }
            }
        })
    })

    /**
     * 点击所有博主遍历所有博主
     */
    $("#quan").click(function () {
        $("#isexpert").val("null");
        $(".bolgallzhu").empty();
        $(".pag li button").attr("onclick", "changezhu(this)");
        $.ajax({
            type: 'post',
            url: 'user/selectall',
            contentType: 'application/json',
            data: JSON.stringify({"pageIndex": 1, "isexpert": $("#isexpert").val()}),
            success: function (result) {
                var ulist = result.list;
                var totalPage = result.totalPage;
                var fei = "<img src=\"" + ctxPath + "/img/username.png\" />";
                var bozhu = "<img src=\"" + ctxPath + "/img/expert.png\" />";
                for (var i = 0; i < ulist.length; i++) {
                    var blog = ulist[i];

                    if (blog.isexpert != 1) {
                        var $blog = $("<div class=\"mybolgli\" onclick=\"bozhu(" + blog.uid + ")\">" +
                            "<div class=\"ybybzhu\">" +
                            "<div class=\"ybnat\">" +
                            "<img src=\"" + ctxPath + "/upload/" + blog.uimage + "\" />" +
                            fei +
                            "<span>" + blog.uname + "</span>" +
                            "<span>" + blog.email + "</span>" +
                            "</div>" +
                            "</div>" +
                            "</div>");

                    } else if (blog.isexpert == 1) {
                        var $blog = $("<div class=\"mybolgli\" onclick=\"bozhu(" + blog.uid + ")\">" +
                            "<div class=\"ybybzhu\">" +
                            "<div class=\"ybnat\">" +
                            "<img src=\"" + ctxPath + "/upload/" + blog.uimage + "\" />" +
                            bozhu +
                            "<span>" + blog.uname + "</span>" +
                            "<span>" + blog.email + "</span>" +
                            "</div>" +
                            "</div>" +
                            "</div>");
                    }
                    $(".bolgallzhu").prepend($blog);
                }
                $(".blog").show().animate({height: '80px', width: '100%'});
                //页码
                $("#totalPage").val(totalPage);
                if (totalPage < 2) {
                    $("#centre-paging").hide();
                } else {
                    $("#centre-paging").show();
                    $(".pIndex").remove();
                    for (var i = 0; i < totalPage; i++) {
                        var li = $("<li class=\"pIndex\"><button onclick=\"changezhu(this)\">" + (i + 1) + "</button></li>");
                        if (i == 0) {
                            li = $("<li class=\"pIndex\"><button onclick=\"changezhu(this)\" style=\"border: none;\">" + (i + 1) + "</button></li>");
                        }
                        $("#next").before(li);
                    }
                }
            }
        })
    })
    /**
     * 点击搜索模糊查询对应的博主
     */
    $("#sousuo").click(function () {
        $(".pag li button").attr("onclick", "changezhu(this)");
        $(".bolgallzhu").empty();
        $.ajax({
            type: 'post',
            url: 'user/selectall',
            contentType: 'application/json',
            data: JSON.stringify({"pageIndex": 1, "uname": $("#user").val(), "isexpert": $("#isexpert").val()}),
            success: function (result) {
                var ulist = result.list;
                var totalPage = result.totalPage;
                var fei = "<img src=\"" + ctxPath + "/img/username.png\" />";
                var bozhu = "<img src=\"" + ctxPath + "/img/expert.png\" />";
                for (var i = 0; i < ulist.length; i++) {
                    var blog = ulist[i];

                    if (blog.isexpert != 1) {
                        var $blog = $("<div class=\"mybolgli\" onclick=\"bozhu(" + blog.uid + ")\">" +
                            "<div class=\"ybybzhu\">" +
                            "<div class=\"ybnat\">" +
                            "<img src=\"" + ctxPath + "/upload/" + blog.uimage + "\" />" +
                            fei +
                            "<span>" + blog.uname + "</span>" +
                            "<span>" + blog.email + "</span>" +
                            "</div>" +
                            "</div>" +
                            "</div>");

                    } else if (blog.isexpert == 1) {
                        var $blog = $("<div class=\"mybolgli\" onclick=\"bozhu(" + blog.uid + ")\">" +
                            "<div class=\"ybybzhu\">" +
                            "<div class=\"ybnat\">" +
                            "<img src=\"" + ctxPath + "/upload/" + blog.uimage + "\" />" +
                            bozhu +
                            "<span>" + blog.uname + "</span>" +
                            "<span>" + blog.email + "</span>" +
                            "</div>" +
                            "</div>" +
                            "</div>");
                    }
                    $(".bolgallzhu").prepend($blog);
                }
                $(".blog").show().animate({height: '80px', width: '100%'});
                //页码
                $("#totalPage").val(totalPage);
                if (totalPage < 2) {
                    $("#centre-paging").hide();
                } else {
                    $("#centre-paging").show();
                    $(".pIndex").remove();
                    for (var i = 0; i < totalPage; i++) {
                        var li = $("<li class=\"pIndex\"><button onclick=\"changezhu(this)\">" + (i + 1) + "</button></li>");
                        if (i == 0) {
                            li = $("<li class=\"pIndex\"><button onclick=\"changezhu(this)\" style=\"border: none;\">" + (i + 1) + "</button></li>");
                        }
                        $("#next").before(li);
                    }
                }
            }
        })
    })
    /**
     * 点击博客管理将按钮变成change
     */
    $("#boke").click(function () {
        $(".pag li button").attr("onclick", "change(this)");
    })
    /**
     * 申请专家
     */
    $("#jingshen").click(function () {
        $.ajax({
            type: 'post',
            url: 'user/bianzhuan',
            contentType: 'application/json',
            data: JSON.stringify({"isexpert": 1, "uid": $("#usid").val()}),
            success: function (result) {
                $("#myModal2").modal('hide');
                window.location.href = "adminindex";
            }
        })
    })

    $("#youdai").click(function(){
        $.ajax({
            type:'post',
            url:'user/bianzhuan',
            contentType:'application/json',
            data:JSON.stringify({"isexpert":0,"uid":$("#usid").val()}),
            success:function(result){
                $("#myModal2").modal('hide');
                window.location.href="adminindex";
            }
        })
    })

})

/**
 * 管理员将未审核的博客通过审核
 */
function adminver(id) {
    window.location.href = "blog/selectid?bid=" + id;
}

            /**
             * 管理员点击已审核的可以看博客的详细信息
             * @param id
             */
            function adminshen(id){
                window.location.href="blog/view?bid="+id;
                        }

/**
 * 管理员点击博主进入对应博主的个人页面
 * @param id
 */
function bozhu(id) {
    window.location.href = "user/selectzhuid?uid=" + id;
}

            /**
             * 管理员单击要申请专家的用户弹出对应的模态框
             * @param id
             */
            function exceptional(uid){
                var id=uid;
                $(".left-top").empty();
                $.ajax({
                    type:'post',
                    url:'user/getzhuanjia',
                    data:"uid="+id,
                    success:function (result) {

                       var gid= result.zpnumber;
                       var bid=result.zbnumber;
                       var blog=result.user;
                       var  $blog=$("<div class=\"left-top\">"+
                          "<div class=\"ltop\">"+
                          "<img src=\""+ctxPath+"/upload/"+blog.uimage+"\" />" +
                          "<div class=\"long\">"+
                          "<p class=\"name\" >"+
                          "<span>"+blog.uname+"</span>"+

                          "</p>"+
                          "</div>"+
                          "</div>"+
                          "<div class=\"lcenter\">"+
                          "<ul class=\"lut\">"+
                          "<li><span>"+blog.fans.length+"</span>"+
                          "<p>粉丝</p></li>"+
                          "<li><span>"+gid+"</span>"+
                          "<p>获赞</p></li>"+
                          "<li><span>"+bid+"</span>"+
                          "<p>访问</p></li>"+
                          "<li><span>"+blog.blogs.length+"</span>"+
                          "<p>博客</p></li>"+
                          "</ul>"+
                          "</div>"+
                            "<input type=\"hidden\" id=\"usid\" value=\""+blog.uid+"\">"+
                          "</div>");

            $(".left").prepend($blog);
        }
    })
}







