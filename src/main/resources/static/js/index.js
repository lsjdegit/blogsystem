$(function(){
	//第一次进入所显示的内容
	$.ajax({
		type:'POST',
		url:ctxPath+"/blog/select",
		contentType:"application/json",
		data:JSON.stringify({"btid":0,"uid":0,"pageIndex":1,"searchBlog":""}),
		success:function(result){
			// var blist = result.getList();
			// var totalPage = result.getTotalPage();
			alert(result[0]);
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