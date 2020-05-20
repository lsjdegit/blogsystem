//查看博客方法
function blogview(bid) {
    location.href = ctxPath + "blog/view?bid=" + bid;
}

$(function () {
    //关注按钮悬浮样式
    // var guan = $(".homeguan button").text();
    // if (guan == "关注") {
    //     $(".homeguan button").hover(function () {
    //         //$(this).addClass("guanh")
    //         $(this).css("color", "white");
    //         $(this).css("background-color", "#00BFF3");
    //         $(this).css("border", "#00BFF3 1px solid");
    //     }, function () {
    //         $(this).css("color", "#777777");
    //         $(this).css("background-color", "white");
    //         $(this).css("border", "#23527C 0.5px solid");
    //     })
    // } else if (guan == "已关注") {
    //     $(".homeguan button").hover(function () {
    //         $(".homeguan button").text("取消");
    //     }, function () {
    //         $(".homeguan button").text(guan);
    //     })
    // }


    $(".homezhufen ul li:eq(0)").addClass("homezhufenh");
    $(".homezhufen ul li").click(function () {
        $(".homezhufen ul li").removeClass("homezhufenh");
        $(this).addClass("homezhufenh");
    })

    /**
     * 默认为我的博客
     */
    $(".homeli .mybolgli").show();

    $(".homezhufen ul li:eq(0)").click(function () {
        $(".homeli .mybolgli").show();
        $(".homeli .mybolgli1").hide();
        $(".homeli .mybolgli2").hide();
        $(".homeli .mybolgli3").hide();
    })
    $(".homezhufen ul li:eq(1)").click(function () {
        $(".homeli .mybolgli").hide();
        $(".homeli .mybolgli1").show();
        $(".homeli .mybolgli2").hide();
        $(".homeli .mybolgli3").hide();
    })
    $(".homezhufen ul li:eq(2)").click(function () {
        $(".homeli .mybolgli").hide();
        $(".homeli .mybolgli1").hide();
        $(".homeli .mybolgli2").show();
        $(".homeli .mybolgli3").hide();
    })
    $(".homezhufen ul li:eq(3)").click(function () {
        $(".homeli .mybolgli").hide();
        $(".homeli .mybolgli1").hide();
        $(".homeli .mybolgli2").hide();
        $(".homeli .mybolgli3").show();
    })

    //关注
    $(".homeguan button").click(function () {
        var loginuid = $("input[name=loginUid]").val();
        if(loginuid == 0 || loginuid == ""){
            if(confirm("你还没登录，是否去登录？")){
                location.href = ctxPath+"login";
            }
            return ;
        }
        var ad = $(this).html();
        var uid = $(this).next().val();
        var url = "";
        if(ad == "关注"){
            url = "addcare";
        }else{
            url = "delcare";
        }
        $.ajax({
            type:'POST',
            url:ctxPath+"/user/"+url,
            contentType:"application/json",
            data:JSON.stringify({"uid":uid,"fansid":loginuid}),
            success:function(result){
                if(result==0){
                    $(".homeguan button").html("关注");
                    $(".homeguan button").removeClass("btn-default");
                    $(".homeguan button").removeClass("btn-danger");
                    $(".homeguan button").addClass("btn-danger");
                }
                if(result==1){
                    $(".homeguan button").html("取消关注");
                    $(".homeguan button").removeClass("btn-default");
                    $(".homeguan button").removeClass("btn-danger");
                    $(".homeguan button").addClass("btn-default");
                }
            }
        })
    });
})