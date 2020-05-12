$(function() {
	$("#main-ul li:eq(4)").addClass("main-clickli");
			$("#gul li").click(function() {
				$(this).css("border-bottom", "red 5px solid");
				$(this).siblings().css("border-bottom", "white 1px solid");
			})
			//头像高度		
			var l = $(".imghead img").css("width");
			$(".imghead img").css("height", l);
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
			$("#avatar").change(function() {
				var choose_file = $(this)[0].files[0];
				var ftype = choose_file.name.substring(choose_file.name.lastIndexOf(".") + 1);
				alert(choose_file.name);
				if (ftype == "jpg" || ftype == "png" || ftype == "jpeg" || ftype == "JPG") {
					var size = choose_file.size / 1024 / 1024;
					if (size > 1) {
						alert("头像不能大于1M");
						return false;
					}
					var reader = new FileReader();
					reader.readAsDataURL(choose_file);
					reader.onload = function() {
						$(".imghead img").attr("src", this.result);
					}
				} else {
					alert("格式不对！")
					return false;
				}
			})

			$("#cun").click(function() {
				//$(".form-horizontal").submit();
			})

		})