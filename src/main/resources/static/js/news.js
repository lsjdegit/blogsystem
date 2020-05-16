$(function () {

    //头列表样式
    $("#head-ul li:eq(3)").addClass("clickli");

    //首个变色
    $(".ul1 li:eq(0)").addClass("li");
    //悬浮变色
    $(".ul1 li").hover(function () {
        $(".ul1 li").removeClass("dle");
        $(this).addClass("dle");
    }, function () {
        $(".ul1 li").removeClass("dle");
    })

    $(".ul1 li").click(function () {
        $(".ul1 li").removeClass("li");
        $(this).addClass("li");
    })

    //第一次进入所显示的内容
    var uid = $("input[name=loginUid]").val();
    $.ajax({
        type:'POST',
        url:ctxPath+"/message/select",
        contentType:"application/json",
        data:JSON.stringify({"uid":uid,"mtypeid":1,"pageIndex":1}),
        success:function(result){
            var mlist = result.list;
            var totalPage = result.totalPage;
            for(var i=0;i<mlist.length;i++){
                var message = mlist[i];
                var mtype = "评论了你的博客";
                if(message.mtypeid == 4){
                    mtype = "回复了你的评论";
                }
                var $message = $("<li>" +
                    "<img src=\""+ctxPath+"upload/"+message.yuser.uimage+"\" style=\"width: 40px; height: 40px;border-radius: 20px;margin-left: 20px;\">" +
                    "<span style='font-size: 18px;display: inline-block;height: 80px;'>"+message.yuser.uname+"</span>" +
                    "<span style='font-size: 18px;display: inline-block;height: 80px;'>"+mtype+"</span>" +
                    "<span style='display: inline-block;margin-left: 20px;height: 80px;padding: 0px;font-size: 20px;text-decoration: underline;width: 35%;'>"+message.blog.btitle+"</span>" +
                    "<span style='display: inline-block;float: right;color: #888;font-size: 18px;margin-right: 3%;'>"+message.mtime+"</span>" +
                    "</li>");
                $(".dul").append($message);
            }
            $(".dul li").show().animate({height:'80px',width:'100%'});
            //页码
            $("#totalPage").val(totalPage);
            if(totalPage<2){
                $("#centre-paging").fadeOut(1000);
            }else{
                $("#centre-paging").fadeIn(1000);
                $(".pIndex").remove();
                for(var i=0;i<totalPage;i++){
                    var li = $("<li class=\"pIndex\"><button onclick=\"change(this)\">"+(i+1)+"</button></li>");
                    if(i==0){
                        li = $("<li class=\"pIndex\"><button onclick=\"change(this)\" style=\"border: none;\">"+(i+1)+"</button></li>");
                    }
                    $("#next").before(li);
                }
            }
        }
    })

    $(".ul1 li").click(function () {
        
    });


})