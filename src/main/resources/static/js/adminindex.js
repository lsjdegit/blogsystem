$(function(){
			$(".admmain_er ul li:eq(0)").addClass("uler");
			$(".admmain_er ul li").click(function(){
				$(".admmain_er ul li").removeClass("uler");
				$(this).addClass("uler");
			})
		})