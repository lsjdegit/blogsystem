$(function(){
				$(".chakan").click(function(){
					if($(".huifu").css("display") == "none"){
						$(".huifu").css("display","block");
						$(this).html("收起评论");
						$(".count").css("display","none");
					}else if($(".huifu").css("display") != "none"){
						$(".huifu").css("display","none");
						$(this).html("查看评论");
						$(".count").css("display","block");
					}
				})
			})

