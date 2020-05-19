
function change(coll){
	var totalPage = $("#colltotalPage").val();
	var pageIndex = $("#collcurrentPage").val();
	var uid=$("input[name=loginUid]").val();
	var msg=$(coll).text();
	if(msg=="首页"){
		pageIndex = 1;
	}
	if(msg=="上"){
		if(pageIndex==1){
			pageIndex==1;
		}else{
			pageIndex-- ;
		}
	}
	if(msg=="下"){
		if(pageIndex==totalPage){
			pageIndex=totalPage;
		}else{
			pageIndex++;
		}
	}
	if(msg=="尾页"){
		pageIndex=totalPage;
	}
	$.ajax({
		type:'POST',
		url:ctxPath+"/collect/selectcollects",
		contentType:"application/json",
		data:JSON.stringify({"uid":uid,"pageIndex":pageIndex}),
		success:function(result){
			var collects=result.list; //收藏的博客关系集合
			var unm=result.list.length;
			$(".boti").remove();
			for(var i=0;i<collects.length;i++){
				var blog = collects[i].blog;
				var $blogdan = $("<div class=\"boti\">" +
					"<p class=\"titlebo\">"+blog.btitle+"</p>" +
					"<input type=\"hidden\" id=\"collbid\" value="+blog.bid+">"+
					"<button class=\"qusc\" onclick=\"qusou(this)\">取消收藏"+"</button>" +
					"<div class=\"zhaiyao\">" +
					"<p>"+blog.babstract+"</p>" +
					"</div>" +
					"<div class=\"author\">" +
					"<span>"+blog.user.uname+"</span>" +
					"<span>|" +
					"</span>" +
					"<span>"+blog.bcreatetime+"</span>" +
					"</div>" +
					"</div>");
				$(".scboq").append($blogdan);

			}
			$("#collcurrentPage").val(pageIndex);

		}
	});

}

//看博客
function vie(obj){
	var bid=$(obj).next().val();
	alert(bid);
	location.href = ctxPath+"blog/view?bid="+bid;
}
//取消收藏
function qusou(obj){
	var pageIndex=$("#collcurrentPage").val();
	var bid=$(obj).prev().val();
	var uid=$("input[name=loginUid]").val();
	$.ajax({
		type:'POST',
		url:ctxPath+"/collect/delcollect",
		contentType:"application/json",
		data:JSON.stringify({"uid":uid,"bid":bid,"pageIndex":pageIndex}),
		success:function(result){
			var collects=result.list; //收藏的博客关系集合
			var tatalpage=result.totalPage;
			$(".rhead p span").text(tatalpage);
			$("#colltotalPage").val(tatalpage);
			$(".boti").remove();
			for(var i=0;i<collects.length;i++){
				var blog = collects[i].blog;
				var $blogdan = $("<div class=\"boti\">" +
					"<p class=\"titlebo\" onclick=\"vie(this)\">"+blog.btitle+"</p>" +
					"<input type=\"hidden\" id=\"collbid\" value="+blog.bid+">"+
					"<button class=\"qusc\" onclick=\"qusou(this)\">取消收藏"+"</button>" +
					"<div class=\"zhaiyao\">" +
					"<p>"+blog.babstract+"</p>" +
					"</div>" +
					"<div class=\"author\">" +
					"<span>"+blog.user.uname+"</span>" +
					"<span>|" +
					"</span>" +
					"<span>"+blog.bcreatetime+"</span>" +
					"</div>" +
					"</div>");
				$(".scboq").append($blogdan);
			}
			if(tatalpage==1){
				$(".liufen").hide();
			}
			$("#collcurrentPage").val(pageIndex);
			//alert($("#collcurrentPage").val());
		}
	})
}
//粉丝列表取关或关注
function guan(obj){
	var uid=$("input[name=loginUid]").val(); //自己的id
	var msg = $(obj).text();
	var fansid = $(obj).prev().val();
	$.ajax({
		type:'POST',
		url:ctxPath+"/user/updateuu",
		contentType:"application/json",
		data:JSON.stringify({"uid":uid,"fansid":fansid}),
		success:function(result){
			if(result==0){
				$(obj).text("关注");
			}
			if(result==1){
				$(obj).text("已关注");
			}
		}
	})
}
//我的关注 取消关注
function xiaoguan(obj){
	var uid=$("input[name=loginUid]").val(); //自己的id
	var careid = $(obj).prev().val();
	$.ajax({
		type:'POST',
		url:ctxPath+"/user/deluu",
		contentType:"application/json",
		data:JSON.stringify({"uid":careid,"fansid":uid}),
		success:function(result){
			if(result){
				$(obj).parent().remove();
			}
		}
	})

}

//删除记录
function delbrowse(){
    var uid=$("input[name=loginUid]").val(); //自己的id
    $.ajax({
        type:'POST',
        url:ctxPath+"/browse/del",
        data:"uid="+uid,
        success:function(result){
            if(result){
                $(".browseboti").remove();
                var $kong = $("<h3> 暂无记录！"+
                    "</h3>");
                $(".browsescboq").append($kong);
            }
        }


    })
}
$(function() {
	//第一次进入所显示的内容
    $(".mima").hide();
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
			$(".imghead img").attr("src",ctxPath+"upload/"+img);
			$(".xx2 p:eq(0)").html("姓名："+name);
			$(".xx2 p:eq(2)").html("性别："+sex);
			$(".xx2 p:eq(3)").html("年龄："+age);
			$(".xx2 p:eq(4)").html("邮箱："+email);
			$(".xx2 p:eq(5)").html("简介："+dc);
			$(".yue").text("￥"+bl);

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
	function uploadImage() {
		var input = $("#file");
		//判断是否有选择上传文件
		var file = $("#file").val();
		if (file == "") {
			alert("请选择上传。doc文档文件！");
			return;
		}
		//判断上传文件的后缀名
		var strExtension = file.substr(file.lastIndexOf('.') + 1);
		if (strExtension != 'doc') {
			alert("请选择word文档文件");
			return;
		}
		//上传文件
		var formData = new FormData();
		formData.append('expoid',$("#expoid").val());
		formData.append('file',input[0].files[0]);
		layer.load(1, {
			shade: [0.1,'#fff'] //0.1透明度的白色背景
		});
		$.ajax({
			type: "POST", // 上传文件要用POST
			url: "${ctx}/expo/exhibitionpo/uploadfile",
			dataType : "json",
			crossDomain: true, // 如果用到跨域，需要后台开启CORS
			processData: false,  // 注意：不要 process data
			contentType: false,  // 注意：不设置 contentType
			data: formData
		}).success(function(data) {
			$("#fileName").innerHTML=data.fileName;
			$("#timeDate").innerHTML =data.timeDate;
			$("#userName").innerHTML =data.userName;
			layer.alert("文件上传成功！",{icon:1});
			layer.closeAll('loading');
		}).fail(function(data) {
			layer.alert("网络错误，请刷新后重试！",{icon:2});
		});
	}

	//个人资料
	$(".ul1 li:eq(0)").click(function(){
		//alert("第一");
		$(".imghead,.p1,.xx").show(); //个人资料
		$(".rhead,.scboq,.liufen").hide(); //我的收藏
		$(".browsehead,.browsescboq,.browsefen").hide();
		$(".fans").hide();
		$(".care").hide();
        $(".mima").hide();
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
				$(".yue").text("￥"+bl);
			}

		});
	})
   //我的收藏 $(".rhead,.scboq").hide();
	$(".ul1 li:eq(1)").click(function() {
		$(".imghead,.p1,.xx").hide(); //个人资料
		$(".rhead,.scboq,.liufen").hide(); //我的收藏
		$(".browsehead,.browsescboq,.browsefen").hide();
		$(".fans").hide();
		$(".care").hide();
        $(".mima").hide();

		var uid=$("input[name=loginUid]").val();
		var pageIndex = 1;

		$.ajax({
			type:'POST',
			url:ctxPath+"/collect/selectcollects",
			contentType:"application/json",
			data:JSON.stringify({"uid":uid,"pageIndex":pageIndex}),
			success:function(result){
				var collects=result.list; //收藏的博客关系集合
				var unm=result.list.length;
				var tatalpage =result.totalPage;
				//alert(unm);
				var $liufen=$("<div class=\"liufen\">"+
                    "<ul class=\"liupage\">"+
                    "<li class=\"one\" onclick=\"change(this)\">"+"首页</li>"+
                    " <li class=\"prev\" onclick=\"change(this)\">上"+"</li>"+
                    "<li class=\"next\" onclick=\"change(this)\">下"+"</li>"+
                    "<li class=\"next\" onclick=\"change(this)\">尾页"+"</li>"+
                    "</ul>"+
                    "<input type=\"hidden\" id=\"colltotalPage\" value="+tatalpage+">"+
                    "<input type=\"hidden\" id=\"collcurrentPage\" value=\"1\"/>"+
                    "</div>");


			    var $rhead=$("<div class=\"rhead\">"+
			    	"<p>共"+ "<span>"+tatalpage+"</span>"+ "页</p>"+
					"</div>");
			    $(".dright").append($rhead); //加头
			    var $scboq=$("<div class=\"scboq\">"+
					"</div>");
				$(".dright").append($scboq); //加装博文的盒子
				for(var i=0;i<collects.length;i++){
					var blog = collects[i].blog;
					var $blogdan = $("<div class=\"boti\">" +
						"<p class=\"titlebo\" onclick=\"vie(this)\">"+blog.btitle+"</p>" +
						"<input type=\"hidden\" id=\"collbid\" value="+blog.bid+">"+
						"<button class=\"qusc\" onclick=\"qusou(this)\">取消收藏"+"</button>" +
						"<div class=\"zhaiyao\">" +
						"<p>"+blog.babstract+"</p>" +
						"</div>" +
						"<div class=\"author\">" +
						"<span>"+blog.user.uname+"</span>" +
						"<span>|" +
						"</span>" +
						"<span>"+blog.bcreatetime+"</span>" +
						"</div>" +
						"</div>");
					$(".scboq").append($blogdan);

	            }
				if(tatalpage>1){
					$(".dright").append($liufen);
				}

		    }
        });

	})

    //我的粉丝
	$(".ul1 li:eq(2)").click(function() {
		$(".imghead,.p1,.xx").hide(); //个人资料
		$(".rhead,.scboq,.liufen").hide(); //我的收藏
		$(".browsehead,.browsescboq,.browsefen").hide();
		$(".fans").hide();
		$(".care").hide();
        $(".mima").hide();

		var uid=$("input[name=loginUid]").val();
		$.ajax({
			type:'POST',
			url:ctxPath+"/user/pansonalselect",
			contentType:"application/json",
			//data:JSON.stringify("uid",3),
			success:function(result) {
				var fans=result.fans;// 粉丝集合
				var fanss = result.fans.length; //粉丝数
				var cares=result.cares;//关注集合
				//alert(bolgs);
				//alert(fanss);
				var $fans=$("<div class=\"fans\">"+
					"</div>");
				$(".dright").append($fans);
				var $fanshead=$("<div class=\"fanshead\">"+
					"<p class=\"fansr\">我的粉丝"+"</p>"+
					"<p class=\"fansf\">"+"<span>"+fanss+"</span>"+"人</p>"+
					"</div>");
				$(".fans").append($fanshead);
				var $fansall=$("<div class=\"fansall\">"+
					"</div>");
				$(".fans").append($fansall);

				//alert(fans.length);
				if(fans.length==0){
					var $kong = $("<h3> 暂无关注！"+
						"</h3>");
					$(".fansall").append($kong);
				}
				for(var i=0;i<fans.length;i++){
					var user=fans[i];
					var guan = "关注";
					for (var j=0;j<cares.length;j++){
						var careuser = cares[j];
						if(careuser.uid==user.uid){
							guan = "已关注";
						}
					}
					var $fansli=$("<div class=\"fansli\">"+
						"<img src=\""+ctxPath+"upload/"+user.uimage+"\" />" +
						"<span>"+user.uname+"</span>"+
						"<input type=\"hidden\" id=\"fansid\" value="+user.uid+">"+
						"<span class=\"quguan\" onclick=\"guan(this)\">"+guan+"</span>"+
						"</div>");
					$(".fansall").append($fansli);

				}

			}
		})
	})
    //我的关注
	$(".ul1 li:eq(3)").click(function() {
		$(".imghead,.p1,.xx").hide(); //个人资料
		$(".rhead,.scboq,.liufen").hide(); //我的收藏
		$(".browsehead,.browsescboq,.browsefen").hide();
		$(".fans").hide();
		$(".care").hide();
        $(".mima").hide();
		$.ajax({
			type:'POST',
			url:ctxPath+"/user/pansonalselect",
			contentType:"application/json",
			//data:JSON.stringify("uid",3),
			success:function(result) {
				var cares=result.cares;//关注集合
				var caress = result.cares.length; //关注量
				var unm = result.collects.length;
				//alert(bolgs);
				//alert(caress);
				var $care=$("<div class=\"care\">"+
					"</div>");
				$(".dright").append($care);
				var $carehead=$("<div class=\"carehead\">"+
					"<p class=\"carer\">我的关注"+"</p>"+
					"<p class=\"caref\">"+"<span>"+caress+"</span>"+"人</p>"+
					"</div>");
				$(".care").append($carehead);
				var $careall=$("<div class=\"careall\">"+
					"</div>");
				$(".care").append($careall);
				if(cares.length==0){
					var $kong = $("<h3> 暂无关注！"+
						"</h3>");
					$(".careall").append($kong);
				}
				for(var i=0;i<cares.length;i++){
					var user=cares[i];
					var $careli=$("<div class=\"careli\">"+
						"<img src=\""+ctxPath+"upload/"+user.uimage+"\" />" +
						"<span>"+user.uname+"</span>"+
						"<input type=\"hidden\" id=\"careid\" value="+user.uid+">"+
						"<span class=\"quguan\" onclick=\"xiaoguan(this)\">"+"取消关注</span>"+
						"</div>");
					$(".careall").append($careli);


				}

			}
		})
	})

	//浏览
    $(".ul1 li:eq(4)").click(function() {
		$(".imghead,.p1,.xx").hide(); //个人资料
		$(".rhead,.scboq,.liufen").hide(); //我的收藏
		$(".browsehead,.browsescboq,.browsefen").hide();
		$(".fans").hide();
		$(".care").hide();
		$(".mima").hide();

		var uid=$("input[name=loginUid]").val();
		var pageIndex = 0;
		$.ajax({
			type:'POST',
			url:ctxPath+"/browse/selectbrowse",
			contentType:"application/json",
			data:JSON.stringify({"uid":uid,"pageIndex":pageIndex}),
			success:function(result){
				var browses=result.browselist.length; //浏览数
				var browse=result.browselist; //浏览集合
                var blogs = result.bloglist; //博客集合
				var tatalpage =result.totalPage; // 总页数
				//alert(browses);
				var $browsehead=$("<div class=\"browsehead\">"+
					"<p>共"+ " <span>"+browses+" </span>"+ "条 内 容</p>"+
					"<p>"+"|</p>"+
					"<p class=\"quanshan\" onclick=\"delbrowse()\">"+"删除记录</p>"+
					"</div>");
				$(".dright").append($browsehead); //加头
				var $browsescboq=$("<div class=\"browsescboq\">"+
					"</div>");
				$(".dright").append($browsescboq); //加装博文的盒子
                if(browses==0){
                    var $kong = $("<h3> 暂无记录！"+
                        "</h3>");
                    $(".browsescboq").append($kong);
                }
				for(var i=0;i<browse.length;i++){
					var br = browse[i];
					var blog = blogs[i];
					var $blogdan = $("<div class=\"browseboti\">" +
						"<p class=\"titlebo\">"+blog.btitle+"</p>" +
						//"<button class=\"browsequsc\">删除记录"+"</button>" +
						"<div class=\"browsezhaiyao\">" +
						"<p>"+blog.babstract+"</p>" +
						"</div>" +
						"<div class=\"browseauthor\">" +
						"<span>"+br.browsetime+"</span>" +
						"</div>" +
						"</div>");
					$(".browsescboq").append($blogdan);
				}
				/*var $browsefen=$("<div class=\"browsefen\">"+
					"<ul class=\"browsepage\">"+
					"<li class=\"one\">"+"首页</li>"+
					" <li class=\"prev\">上"+"</li>"+
					"<li class=\"next\">下"+"</li>"+
					"<li class=\"next\">下"+"</li>"+
					"</ul>"+
					"<input type=\"hidden\" id=\"browsecaretotalPage\" value=\"1\"/>"+
					"<input type=\"hidden\" id=\"browsecarecurrentPage\" value=\"1\"/>"+
					"</div>");
				$(".care").append($browsefen);*/
			}
		});
	})
    //密码修改
    $(".ul1 li:eq(5)").click(function(){
        $(".imghead,.p1,.xx").hide(); //个人资料
        $(".rhead,.scboq,.liufen").hide(); //我的收藏
        $(".browsehead,.browsescboq,.browsefen").hide();
        $(".fans").hide();
        $(".care").hide();
        $(".mima").show();
    })

    //修改密码
    $(".qrxg").click(function(){
        alert("lll");
        var pass=$("input[name=loginpass]").val();
        var xm=$(".xinmi").val();
        var zim= $(".zaimi").val();
        var xsm=$(".yuanmi").val();
        if(xm=="" || zim=="" || xsm==""){
            alert("请输入完整！");
        }else if(zimi!= xm){
            alert("输入的密码不一致");
            $(".zaimi").val("");
            $(".xinmi").val("");
        }else{
            $("#mima").submit();
        }

    })

    $(".yuanmi").blur(function(){
        var uid=$("input[name=loginUid]").val();
        var pass=$("input[name=loginpass]").val();
        var xsm=$(".yuanmi").val();
        if(xsm==pass){
            $(".yuanmi").next().text();
        }else{
            $(".yuanmi").next().text("密码输入错误!");
            $(".xinmi,.zaimi").attr("readonly","true");
            $(".xinmi,.zaimi").val("");
        }
    })

    $("#myimgfile").submit(function(){
    	var skong = $("#file").val();
    	//alert(skong);
    	if(skong==""){
    		alert("请选图！")
    		return false;
		}else{
    		return true;
		}
	})






})