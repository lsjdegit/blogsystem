$(function(){
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
	$("#main-ul li:eq(4)").click(function(){
		window.location.href="/user/";
	});
})