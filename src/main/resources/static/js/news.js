 $(function(){
			 	//首个变色		
			$(".ul1 li:eq(0)").addClass("li");
			//悬浮变色
			$(".ul1 li").hover(function() {
				$(".ul1 li").removeClass("dle");
				$(this).addClass("dle");
			}, function() {
				$(".ul1 li").removeClass("dle");
			})

			$(".ul1 li").click(function() {
				$(".ul1 li").removeClass("li");
				$(this).addClass("li");
			})
			 })