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
})

