$(function(){
    
    //body宽度
    var maxWidth = window.screen.width;
    $("body").css("width",maxWidth);
    
	// $("#head-ul li:eq(0)").addClass("clickli");
	$("#head-ul li").hover(function(){
		$(this).addClass("hoverli");
	},function(){
		$(this).removeClass("hoverli");
	});

	//头部跳转
	$("#head-ul li:eq(0)").click(function () {
		location.href = ctxPath+"index";
	});
	$("#head-ul li:eq(1)").click(function () {
		if($("#head-user input[name=loginUid]").val() == 0){
			if(confirm("你还没登录，是否去登录？")){
				location.href = ctxPath+"login";
			}
			return ;
		}
		location.href = ctxPath+"myblog";
		$(this).addClass("clickli");
		$(this).siblings().removeClass("clickli");
	});
	$("#head-ul li:eq(2)").click(function () {
		if($("#head-user input[name=loginUid]").val() == 0){
			if(confirm("你还没登录，是否去登录？")){
				location.href = ctxPath+"login";
			}
			return ;
		}
		location.href = ctxPath+"addblog";
		$(this).addClass("clickli");
		$(this).siblings().removeClass("clickli");
	});
	$("#head-ul li:eq(3)").click(function () {
		if($("#head-user input[name=loginUid]").val() == 0){
			if(confirm("你还没登录，是否去登录？")){
				location.href = ctxPath+"login";
			}
			return ;
		}
		location.href = ctxPath+"news";
		$(this).addClass("clickli");
		$(this).siblings().removeClass("clickli");
	});
	$("#head-ul li:eq(4)").click(function () {
		if($("#head-user input[name=loginUid]").val() == 0){
			if(confirm("你还没登录，是否去登录？")){
				location.href = ctxPath+"login";
			}
			return ;
		}
		location.href = ctxPath+"personal";
		$(this).addClass("clickli");
		$(this).siblings().removeClass("clickli");
	});

	//用户登录
	$("#head-user").hover(function(){
		$("#user-login").show();
		if($("#head-user>span").html() == "未登录"){
			$("#user-login>span").unbind();
			$("#user-login>span").bind("click",function () {
				location.href = ctxPath+"login";
			});
		}else{
			$("#user-login>span").unbind();
			$("#user-login>span").bind("click",function () {
				if(confirm("注销当前账户？")){
					$.ajax({
						type: 'post',
						url: ctxPath+'user/logout',
						async: false,
						success: function (result) {
							var img = $("<img src=\""+ctxPath+"/img/userhead.png\"/>");
							$("#head-img>img").replaceWith(img);
							var span = $("<span>未登录</span>");
							$("#head-user>span").replaceWith(span);
							$("#user-login>span").html("登录");
							$("input[name=loginUid]").val("");
							if(window.location.href != "http://localhost:8080/blogsystem/index"){
								location.href = ctxPath+"index";
							}
						}
					})
					return ;
				}else{
					return ;
				}
			});
        }
	},function(){
		$("#user-login").hide();
	});


})