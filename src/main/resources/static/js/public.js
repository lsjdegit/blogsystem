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
		if($("#head-user>span").html() == "未登录"){
			$("#user-login>span").click(function () {
				location.href="login";
			});
		}else{
			$.ajax({
				type: 'post',
				url: 'user/logout',
				async: false,
				success: function (result) {
					$("#user-login>span").click(function () {
						var img = $("<img th:src=\"@{/img/userhead.png}\"/>");
						$("#head-img>img").replaceWith(img);
						var span = $("<span th:if=\"${session.loginUser == null}\">未登录</span>");
						$("#head-user>span").replaceWith(span);
					});
				}
			}）
        }
	},function(){
		$("#user-login").hide();
	});
})