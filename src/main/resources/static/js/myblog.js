$(function () {

    //头列表样式
    $("#head-ul li:eq(1)").addClass("clickli");

    $(".bolgf ul li:eq(0)").addClass("li");
    $(".bolgf ul li").hover(function () {
        $(".bolgf ul li").removeClass("dle");
        $(this).addClass("dle");
    }, function () {
        $(".bolgf ul li").removeClass("dle");
    })
    $(".bolgf ul li").click(function () {
        $(".bolgf ul li").removeClass("li");
        $(this).addClass("li");
    })

    $(".ulsh li:eq(0)").css("color", "#000000");
    $(".ulsh li:eq(0)").addClass("lic");
    $(".ulsh li").hover(function () {
        $(".ulsh li").removeClass("lih");
        $(this).addClass("lih");
    }, function () {
        $(".ulsh li").removeClass("lih");
    })
    $(".ulsh li").click(function () {
        $(".ulsh li").css("color", "#8C8C8C");

        $(".ulsh li").removeClass("lic");
        $(this).addClass("lic");
        $(this).css("color", "#000000");
        $(".bolgrs").css("display", "none");
    })
    $(".ulsh li:eq(0)").click(function () {
        $(".bolgrs").css("display", "block");
    })
})