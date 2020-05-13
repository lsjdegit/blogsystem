/**
 * 分页方法
 */
 function change(obj){
    var msg = $(obj).html();
    var bcreatetime= $("input[name=date]").val();
    var tname=$(".form-group input").val();
    var totalPage = parseInt($("#totalPage").val());
    var pageIndex = parseInt($("#currentPage").val());
    var bstatusid=$("#bstatusid").val();
    $(".pag li button").css("border","1px solid #949494");
    $(".pag li button").removeAttr("disabled");
    if(!isNaN(msg)){
        //是数字就点击那个数字
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
    $(".bolgall").empty();
    $.ajax({
        type:'post',
        url:'blog/selectst',
        contentType:'application/json',
        data:JSON.stringify({"bcreatetime":$("input[name=date]").val(),"searchBlog":$("input[name=btitle]").val(),"pageIndex":pageIndex,"bstatusid":bstatusid}),
        success:function(result){
            var blist = result.list;
            var totalPage = result.totalPage;
            for(var a=0;a<blist.length;a++){
                var blog=blist[a];
                var $blog= $("<div class=\"mybolgli\">"+
                    "<div class=\"ybyb\">"+
                    "<p title=\"查看\">"+blog.btitle+"</p>"+
                    "<div>"	 + "<img src=\"/upload/"+blog.user.uimage+"\" />" +
                    "<span>"+blog.user.uname+"</span>"+
                    "</div>"+
                    "<div>"+
                    "<span>"+blog.bcreatetime+"</span>"+
                    "<span class=\"iconfont icon-liulan\">"+blog.bnumber+"</span>" +
                    "<span class=\"iconfont icon-liulan\">"+blog.gnumber+"</span>" +
                    "<span class=\"iconfont icon-liulan\">"+blog.gnumber+"</span>" +
                    "</div>"+
                    "</div>"+
                    "</div>");

                $(".bolgall").prepend($blog);
            }
            $(".mybolgli").show().animate({height:'80px',width:'100%'});
        }
    })
}


$(function(){
			$(".admmain_er ul li:eq(0)").addClass("uler");
			$(".admmain_er ul li").click(function(){
				$(".admmain_er ul li").removeClass("uler");
				$(this).addClass("uler");
			})

	/**
	 * 遍历博客类型
	 */
	$.ajax({
		type:'post',
	    url: 'blogtype/alla',
		success:function (result) {
			var sel=$("select");
			sel.append("<option>请选择</option>");
			for(var i=0;i<result.length;i++){
               var p= result[i];
			    sel.append("<option value=\""+p.btid+"\">" + p.tname + "</option>");
				}
			}
		})

	/**
	 * 添加博客类型
	 */
	$("#addblogtype").click(function(){
		var tname=$(".form-group input").val();
		var sel=$("select");
		$.ajax({
			type:'post',
			url: 'blogtype/add',
			contentType:'application/json',
			data:JSON.stringify({"tname":$(".form-group input").val()}),
			success:function(result){
				var add=eval(result);
				if(add>0){
					$("#myModal").modal('hide');
					sel.append("<option>"+tname+"</option>");
				}else{
					$("#myModal").modal('hide');
				}
			}
        })
	})
	/**
	 * 根据博客标题模糊查询相关的已审核博客信息
	 */
	$("#sou").click(function(){
		$(".bolgall").empty();
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
					var $blog= $("<div class=\"mybolgli\">"+
						"<div class=\"ybyb\">"+
						"<p title=\"查看\">"+blog.btitle+"</p>"+
						"<div>"	 + "<img src=\"/upload/"+blog.user.uimage+"\" />" +
						"<span>"+blog.user.uname+"</span>"+
						"</div>"+
						"<div>"+
						"<span>"+blog.bcreatetime+"</span>"+
						"<span class=\"iconfont icon-liulan\">"+blog.bnumber+"</span>" +
						"<span class=\"iconfont icon-liulan\">"+blog.gnumber+"</span>" +
						"<span class=\"iconfont icon-liulan\">"+blog.gnumber+"</span>" +
						"</div>"+
						"</div>"+
						"</div>");

					$(".bolgall").prepend($blog);
				}
                $(".mybolgli").show().animate({height:'80px',width:'100%'});
				//页码
                $("#totalPage").val(totalPage);
                if(totalPage<2){
                    $("#centre-paging").fadeOut(1000);
                }else{
                    $("#centre-paging").fadeIn(1000);
                    $(".pIndex").remove();
                    for(var a=0;a<totalPage;a++){
                        var li = $("<li class=\"pIndex\"><button onclick=\"change(this)\">"+(i+1)+"</button></li>");
                        if(a==0){
                            li = $("<li class=\"pIndex\"><button onclick=\"change(this)\" style=\"border: none;\">"+(i+1)+"</button></li>");
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
    $("#yi").click(function(){
        $(".bolgall").empty();
        var sid=1;
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
                    var $blog= $("<div class=\"mybolgli\">"+
                        "<div class=\"ybyb\">"+
                        "<p title=\"查看\">"+blog.btitle+"</p>"+
                        "<div>"	 + "<img src=\"/upload/"+blog.user.uimage+"\" />" +
                        "<span>"+blog.user.uname+"</span>"+
                        "</div>"+
                        "<div>"+
                        "<span>"+blog.bcreatetime+"</span>"+
                        "<span class=\"iconfont icon-liulan\">"+blog.bnumber+"</span>" +
                        "<span class=\"iconfont icon-liulan\">"+blog.gnumber+"</span>" +
                        "<span class=\"iconfont icon-liulan\">"+blog.gnumber+"</span>" +
                        "</div>"+
                        "</div>"+
                        "</div>");
                    $(".bolgall").prepend($blog);
                }
                $(".blog").show().animate({height:'80px',width:'100%'});
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
    })

    /**
     * 点击待审核遍历所有没有审核的博客
     */
    $("#dai").click(function(){
        $(".bolgall").empty();
        var sid=0;
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
                   var $blog= $("<div class=\"mybolgli\">"+
                       "<div class=\"ybyb\">"+
                       "<p title=\"查看\">"+blog.btitle+"</p>"+
                       "<div>"	 + "<img src=\"/upload/"+blog.user.uimage+"\" />" +
                       "<span>"+blog.user.uname+"</span>"+
                       "</div>"+
                       "<div>"+
                       "<span>"+blog.bcreatetime+"</span>"+
                       "<span class=\"iconfont icon-liulan\">"+blog.bnumber+"</span>" +
                       "<span class=\"iconfont icon-liulan\">"+blog.gnumber+"</span>" +
                       "<span class=\"iconfont icon-liulan\">"+blog.gnumber+"</span>" +
                       "</div>"+
                       "</div>"+
                       "</div>");
                   $(".bolgall").prepend($blog);
               }
                   $(".blog").show().animate({height:'80px',width:'100%'});
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
        })

    /**
     * 下拉框选择博客类型遍历对应的博客
     */
    $("select").change(function(){
        $(".bolgall").empty();
        $.ajax({
            type:'post',
            url:'blog/selectst',
            contentType:'application/json',
            data:JSON.stringify({"bcreatetime":$("input[name=date]").val(),"searchBlog":$("input[name=btitle]").val(),"pageIndex":1,"bstatusid":$("#bstatusid").val(),"btid":$("select").val()}),
            success:function(result) {
                var blist = result.list;
                var totalPage = result.totalPage;
                for(var a=0;a<blist.length;a++){
                    var blog=blist[a];
                    var $blog= $("<div class=\"mybolgli\">"+
                        "<div class=\"ybyb\">"+
                        "<p title=\"查看\">"+blog.btitle+"</p>"+
                        "<div>"	 + "<img src=\"/upload/"+blog.user.uimage+"\" />" +
                        "<span>"+blog.user.uname+"</span>"+
                        "</div>"+
                        "<div>"+
                        "<span>"+blog.bcreatetime+"</span>"+
                        "<span class=\"iconfont icon-liulan\">"+blog.bnumber+"</span>" +
                        "<span class=\"iconfont icon-liulan\">"+blog.gnumber+"</span>" +
                        "<span class=\"iconfont icon-liulan\">"+blog.gnumber+"</span>" +
                        "</div>"+
                        "</div>"+
                        "</div>");
                    $(".bolgall").prepend($blog);
                }
                $(".blog").show().animate({height:'80px',width:'100%'});
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
				var $blog= $("<div class=\"mybolgli\">"+
					"<div class=\"ybyb\">"+
					"<p title=\"查看\">"+blog.btitle+"</p>"+
					"<div>"	 + "<img src=\"/upload/"+blog.user.uimage+"\" />" +
	                 "<span>"+blog.user.uname+"</span>"+
					"</div>"+
					"<div>"+
					"<span>"+blog.bcreatetime+"</span>"+
					"<span class=\"iconfont icon-liulan\">"+blog.bnumber+"</span>" +
					"<span class=\"iconfont icon-liulan\">"+blog.gnumber+"</span>" +
					"<span class=\"iconfont icon-liulan\">"+blog.gnumber+"</span>" +
					"</div>"+
					"</div>"+
					"</div>");
				$(".bolgall").prepend($blog);
			}
                    $(".blog").show().animate({height:'80px',width:'100%'});
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
	});
	})
	/**
	 * 根据发布时间查询相关的已审核博客信息
	 */
	// $("input[name=date]").blur(function(){
	// 	alert($("input[name=date]").val())
	// 	$.ajax({
	// 		type:'post',
	// 		url: 'blogtype/select',
	// 		contentType:'application/json',
	// 		data:JSON.stringify({"bcreatetime":$("input[name=date]").val(),"batatusid":1,"pageindex":1}),
	// 		success:function(result){
	// 			var res=eval(result);
	// 		}
	// 	})
	// })




