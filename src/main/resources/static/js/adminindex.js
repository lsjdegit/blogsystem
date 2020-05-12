$(function(){
			$(".admmain_er ul li:eq(0)").addClass("uler");
			$(".admmain_er ul li").click(function(){
				$(".admmain_er ul li").removeClass("uler");
				$(this).addClass("uler");
			})

	$.ajax({
		type:'post',
	    url: 'blogtype/alla',
		success:function (result) {
			var bt=eval(result);
			var sel=$("select");
			sel.append("<option>请选择</option>")
			for(var i=0;i<bt.length;i++){
				var p=bt[i];
				for(var key in p){
					if(key=="tname"){
						sel.append("<option>" + p[key] + "</option>");
					}
				}
			}
		}
	})
		})