$(function(){
	$("#head-ul li:eq(0)").addClass("clickli");
	$("#head-ul li").hover(function(){
		$(this).addClass("hoverli");
	},function(){
		$(this).removeClass("hoverli");
	});
	$("#head-ul li").click(function(){
		$(this).addClass("clickli");
		$(this).siblings().removeClass("clickli");
	});
	$("#head-user").hover(function(){
		$("#user-login").show();
	},function(){
		$("#user-login").hide();
	});
})