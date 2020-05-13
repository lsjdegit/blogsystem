$(function(){
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
                $("#centre-blog").prepend($blog);
            }
		}
	})

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

	$("#main-ul li").click(function(){
		var type = $(this).val();
	});

})