
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
			alert(pageIndex);
			$("#collcurrentPage").val(pageIndex);

		}
	});

}

//看收藏的博客
function vie(obj){
	var bid=$(obj).next().val();
	//alert(bid);
	location.href = ctxPath+"blog/view?bid="+bid;
}
//看浏览过的博客
function lvie(obj){
	var bid=$(obj).next().val();
	//alert(bid);
	location.href = ctxPath+"blog/view?bid="+bid;
}
//取消收藏
function qusou(obj){
	var pageIndex=$("#collcurrentPage").val();
	//alert(pageIndex);
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
			//alert("条数："+collects.length);
			//alert("页数："+tatalpage);
			if(collects.length==0){
				var $kong = $("<h3> 暂无收藏！"+
					"</h3>");
				$(".scboq").append($kong);
			}
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
					"<span>博主："+"</span>" +
					"<span>"+blog.user.uname+"</span>" +
					"<span>|" +
					"</span>" +
					"<span>"+blog.bcreatetime+"</span>" +
					"</div>" +
					"</div>");
				$(".scboq").append($blogdan);
			}
			//$(".boti").show().animate({height: '120px', width: '100%'}, "50");
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
			/*$(obj).parent().remove();
			var num = result.length;
			if(num==0){
				var $kong = $("<h3> 空空如也！"+
					"</h3>");
				$(".careall").append($kong);
			}*/
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
                $(".browsehead span").text("0 ");
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
			var epstatic = result.isexpert; // 是否专家
			var $ep = $("<img src=\"img/expert.png}\">");
			//alert(email);
			if(age==null){
				age="";
			}
			if(dc==null){
				dc="";
			}
			$(".xx1 span:eq(0)").html("用户名："+name);
			$(".xx1 span:eq(1)").html("关注："+caress);
			$(".xx1 span:eq(2)").html("粉丝："+fanss);
			$(".xx1 span:eq(4)").html("余额："+bl);
			$(".imghead img").attr("src",ctxPath+"upload/"+img+"?t="+Math.random());
			$(".modal-body img").attr("src",ctxPath+"upload/"+img+"?t="+Math.random());
			$(".xx2 p:eq(0)").html("姓名："+name);
			$(".xx2 p:eq(2)").html("性别："+sex);
			$(".xx2 p:eq(3)").html("年龄："+age);
			$(".xx2 p:eq(4)").html("邮箱："+email);
			$(".xx2 p:eq(5)").html("简介："+dc);
			$(".yue").text("￥"+bl);
			if(epstatic==1){
				$(".xx1 span:eq(0)").after($ep);
			}
			$(".xx1 img").attr("src",ctxPath+"upload/expert.png");

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
	$("#file").change(function(){
        //拿到文件数据
        var choose_file = $(this)[0].files[0];
        //截取图片名称小数点后的字符串
        var ftype=choose_file.name.substring(choose_file.name.lastIndexOf(".")+1);
        //校验格式是否是图片类型
        if(ftype=="jpg" || ftype=="png" || ftype=="jpeg" || ftype == "JPG"){
            //限制大小，照片大小不能超过1M
            var size = choose_file.size / 1024 / 1024;
            if (size > 2) {
                alert("头像不能大于2M");
                return false;
            }
            // 实例化一个阅读器对象
            var reader = new FileReader();
            // 读取文件的路径，没有返回值,结果在reader.result里
            reader.readAsDataURL(choose_file);
            // 读取需要时间，读完后再修改图片路径
            reader.onload=function () {
                //回显给上方图片中
                $("#fileimg").attr("src",this.result);
            }
        }else{
            alert("头像格式不对，请重新选择！");
            return false;
        }
	})

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
				if(age==null){
					age="";
				}
				if(dc==null){
					dc="";
				}
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
				//alert(pageIndex);
			    var $rhead=$("<div class=\"rhead\">"+
					"<p>我的收藏"+"</p>"+
					"<input type=\"hidden\" id=\"collcurrentPage\" value="+pageIndex+">"+
			    	"<p>共"+ "<span>"+tatalpage+"</span>"+ "页</p>"+
					"</div>");
			    $(".dright").append($rhead); //加头
			    var $scboq=$("<div class=\"scboq\">"+
					"</div>");
				$(".dright").append($scboq); //加装博文的盒子
				if(collects.length==0){
					var $kong = $("<h3> 暂无收藏！"+
						"</h3>");
					$(".scboq").append($kong);
				}
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
						"<span>博主"+"</span>" +
						"<span>"+blog.user.uname+"</span>" +
						"<span>|" +
						"</span>" +
						"<span>"+blog.bcreatetime+"</span>" +
						"</div>" +
						"</div>");
					$(".scboq").append($blogdan);
					$(".boti").show().animate({height: '120px', width: '100%'}, "50");
	            }
				var $liufen=$("<div class=\"liufen\">"+
					"<ul class=\"liupage\">"+
					"<li class=\"one\" onclick=\"change(this)\">"+"首页</li>"+
					" <li class=\"prev\" onclick=\"change(this)\">上"+"</li>"+
					"<li class=\"next\" onclick=\"change(this)\">下"+"</li>"+
					"<li class=\"next\" onclick=\"change(this)\">尾页"+"</li>"+
					"</ul>"+
					"<input type=\"hidden\" id=\"colltotalPage\" value="+tatalpage+">"+
					"<input type=\"hidden\" id=\"collcurrentPage\" value="+pageIndex+"/>"+
					"</div>");
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
						"<img src=\""+ctxPath+"upload/"+user.uimage+"\" onclick=\"bozhu("+user.uid+")\"/>" +
						"<span onclick=\"bozhu("+user.uid+")\">"+user.uname+"</span>"+
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
						"<img src=\""+ctxPath+"upload/"+user.uimage+"\" onclick=\"bozhu("+user.uid+")\" />" +
						"<span onclick=\"bozhu("+user.uid+")\">"+user.uname+"</span>"+
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
					"<p>浏览记录"+"</p>"+
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
						"<p class=\"titlebo\" onclick=\"lvie(this)\">"+blog.btitle+"</p>" +
						"<input type=\"hidden\" id=\"collbid\" value="+blog.bid+">"+
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
			}
		});
	})
    //密码修改
    $(".ul1 li:eq(5)").click(function(){
		$(".mima").hide();
        $(".imghead,.p1,.xx").hide(); //个人资料
        $(".rhead,.scboq,.liufen").hide(); //我的收藏
        $(".browsehead,.browsescboq,.browsefen").hide();
        $(".fans").hide();
        $(".care").hide();
        $(".mima").show();

		$(".xinmi").val("");
		$(".zaimi").val("");
		$(".yuanmi").val("");
		$(".xinmi").next().text("");
		$(".zaimi").next().text("");
		$(".yuanmi").next().text("");
    })

    //修改密码
    $("#uppass").submit(function(){
    	//alert("lll");
        var pass=$("input[name=loginpass]").val();
        var xm=$(".xinmi").val();
        var zim= $(".zaimi").val();
        var xsm=$(".yuanmi").val();
        //alert("再"+zim+"新："+xm);
        if(xm=="" || zim=="" || xsm==""){
            alert("请输入完整！");
            return false;
        }else if(zim!= xm){
            alert("输入的密码不一致！");
            $(".zaimi").val("");
            $(".xinmi").val("");
            return false;
        }else if(pass == xm){
			alert("密码与原密码一致！");
			$(".zaimi").val("");
			$(".xinmi").val("");
			return false;
		}else{
            return true;
        }
    })

    $(".yuanmi").blur(function(){
        var uid=$("input[name=loginUid]").val();
        var pass=$("input[name=loginpass]").val();
        var xsm=$(".yuanmi").val();
		//alert(xsm+" |"+pass);
        if(xsm==pass){
            $(".yuanmi").next().text("");
			$(".xinmi,.zaimi").prop("readonly",false);
			$(".xinmi,.zaimi").val("");
        }else{
            $(".yuanmi").next().text("密码输入错误!");
            $(".xinmi,.zaimi").prop("readonly",true);
            $(".xinmi,.zaimi").val("");
        }
    })
   //换头像
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
	//充值
	//$("#moneyul li:eq(0) p").addClass("moneyhover");
	var xc = $(".moneyul li:eq(0) p span:eq(1)").text();
	$(".quec span").text(xc);
	$(".moneyul li").click(function(){
		var yc = $(this).children("p").children("span:eq(1)").html();
		$(".quec span").text(yc);
	})
	$(".quec").click(function(){
		var uid = $("input[name=loginUid]").val();
		var money = $(".quec span").text();
		window.location.href="user/addbalance?uid="+uid+"&balance="+money;
	})

})