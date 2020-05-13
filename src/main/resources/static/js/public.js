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

	$("#head-ul li").click(function(){
		$(this).addClass("clickli");
		$(this).siblings().removeClass("clickli");
	});

	$("#head-user").hover(function(){
		$("#user-login").show();
		if($("#head-user>span").html() == "未登录"){
			$("#user-login>span").unbind();
			$("#user-login>span").bind("click",function () {
				location.href="login";
			});
		}else{
			$.ajax({
				type: 'post',
				url: 'user/logout',
				async: false,
				success: function (result) {
					$("#user-login>span").unbind();
					$("#user-login>span").bind("click",function () {
						if(confirm("注销当前账户？")){
							var img = $("<img src=\""+ctxPath+"/img/userhead.png\"/>");
							$("#head-img>img").replaceWith(img);
							var span = $("<span>未登录</span>");
							$("#head-user>span").replaceWith(span);
							$("#user-login>span").html("登录");
							$("input[name=loginUid]").val("");
							return ;
						}else{
							return ;
						}
					});
				}
			})
        }
	},function(){
		$("#user-login").hide();
	});

	$("#head-ul li:eq(4)").click(function(){
		var static=$("#head-user span:eq(0)").text();
		if(static=="未登录"){
			if(confirm("请先登录！")){
				window.location.href="login";
			}else{
				$("#head-ul li:eq(0)").addClass("clickli");
				$("#head-ul li:eq(4)").removeClass("clickli");
			}
		}else{
			window.location.href="personal";
		}
	});

})