$(function(){
			//关注按钮悬浮样式
			var guan=$(".homeguan button").text();
			if(guan=="关注"){
				$(".homeguan button").hover(function(){
					//$(this).addClass("guanh")
					$(this).css("color","white");
					$(this).css("background-color","#00BFF3");
					$(this).css("border","#00BFF3 1px solid");
				},function(){
					$(this).css("color","#777777");
					$(this).css("background-color","white");
					$(this).css("border","#23527C 0.5px solid");
				})
			}else if(guan=="已关注"){
				$(".homeguan button").hover(function(){
					$(".homeguan button").text("取消");
				},function(){
					$(".homeguan button").text(guan);
				})
			}
			
			
			$(".homezhufen ul li:eq(0)").addClass("homezhufenh");
			$(".homezhufen ul li").click(function(){
				$(".homezhufen ul li").removeClass("homezhufenh");
				$(this).addClass("homezhufenh");
			})
		})