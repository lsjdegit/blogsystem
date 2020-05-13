$(function() {
	//第一次进入所显示的内容
	$.ajax({
		type:'POST',
		url:ctxPath+"/user/pansonalselect",
		contentType:"application/json",
		//data:JSON.stringify("uid",3),
		success:function(result){
			var name=result.uname; //姓名
			var img=result.uimage; //img名
			var fanss=result.fans.length; //粉丝数
			var caress=result.cares.length; //关注量
			var bl=result.balance; //余额
			var email=result.email; //邮箱
			var sex=result.sex; //性别
			var age=result.age; //年龄
			var dc=result.intro; //简介
			//alert(email);
			$(".xx1 span:eq(0)").html("用户名："+name);
			$(".xx1 span:eq(1)").html("关注："+caress);
			$(".xx1 span:eq(2)").html("粉丝："+fanss);
			$(".xx1 span:eq(4)").html("余额："+bl);
			$(".imghead img").attr("src",ctxPath+"/upload/"+img);
			$(".xx2 p:eq(0)").html("姓名："+name);
			$(".xx2 p:eq(2)").html("性别："+sex);
			$(".xx2 p:eq(3)").html("年龄："+age);
			$(".xx2 p:eq(4)").html("邮箱："+email);
			$(".xx2 p:eq(5)").html("简介："+dc);


		}

	});
	//获取文本域
    /*$("#inputintro").on("input propertychange",function(){
       $(this).val();
    });*/

    $(".pyou").click(function(){
        //model
        $("#inputname").val($(".xx1 span:eq(0)").html().substr(4));
        $("#inputage").val($(".xx2 p:eq(3)").html().substr(3));
        $("#inputemail").val($(".xx2 p:eq(4)").html().substr(3));
        var sex=$(".xx2 p:eq(2)").html().substr(3);
        if(sex=="男"){
            $("input[value=男]").prop("checked",true);
        }else{
            $("input[value=女]").prop("checked",true);
        }
        $(".form-control").html($(".xx2 p:eq(5)").html().substr(3));

    })
	//修改用户
    $("#cun").click(function(){

        var name=$("#inputname").val();
        var age=$("#inputage").val();
        var email=$("#inputemail").val();
        var sex=$("input[name=sex]:checked").val();
        var intro=$("#inputintro").val();
        $.ajax({
            type:'POST',
            url:ctxPath+"/user/updateuser",
            contentType:"application/json",
            data:JSON.stringify({"uname":name,"age":age,"email":email,"sex":sex,"intro":intro}),
            success:function(result){
                if(result){
                    window.location.href="personal";
                }else{
                    window.location.href="personal";
                    alert("修改失败");
                }
            }

        })
        $("#myModal").hidden();
    });

	var log=$("#head-user span:eq(0)").text();
	if(log=="未登录"){
		window.location.href="index";
	}

	//头部样式
	$("#head-ul li:eq(4)").addClass("clickli");

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

    //更换头像
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