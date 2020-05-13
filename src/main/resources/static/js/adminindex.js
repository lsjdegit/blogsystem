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

	$("#addblogtype").click(function(){
		var tname=$(".form-group input").val();
		var sel=$("select");
		alert(name);
		$.ajax({
			type:'post',
			url: 'blogtype/add',
			contentType:'application/json',
			data:JSON.stringify({"tname":$(".form-group input").val()}),
			success:function(result){
				var add=eval(result);
				if(add>0){
					$("#myModal").modal('hide');
					sel.append("<option>"+tname+"</option>");
				}else{
					$("#myModal").modal('hide');
				}
			}
		})
	})


		})

