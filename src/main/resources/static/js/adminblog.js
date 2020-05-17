$(function () {

    //博客内容
    var bcontent = $("#article input[name=bcontent]").val();
    var $bcontent = $(bcontent);
    $(".rcenter").append($bcontent);
    $(".rcenter").fadeIn(1000);

    //评论回复
    $(".chakan").click(function () {
        if ($(".huifu").css("display") == "none") {
            $(".huifu").css("display", "block");
            $(this).html("收起评论");
            $(".count").css("display", "none");
        } else if ($(".huifu").css("display") != "none") {
            $(".huifu").css("display", "none");
            $(this).html("查看评论");
            $(".count").css("display", "block");
        }
    })
    $("#dai").click(function(){
        $.ajax({
            type:'post',
            url:ctxPath+'blog/updatesh',
            contentType:'application/json',
            data:JSON.stringify({"bstatusid":2,"bid":$("#bid").val()}),
            success:function(result){
                if(result>0){
                    window.location.href="../adminindex";
                }
            }
        })
    })
    $("#sheng").click(function(){
         var id=$("#bid").val();
        $.ajax({
            type:'post',
            url:ctxPath+'blog/updatesh',
            contentType:'application/json',
            data:JSON.stringify({"bstatusid":1,"bid":$("#bid").val()}),
            success:function(result){
                if(result>0){
                    window.location.href="../adminindex";
                }
            }
        })
    })
})

