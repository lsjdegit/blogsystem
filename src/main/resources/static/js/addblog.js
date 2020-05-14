$(function () {

    //头列表样式
    $("#head-ul li:eq(2)").addClass("clickli");

    //bootstrap弹出框
    $('[data-toggle="popover"]').popover();

    //富文本编辑器
    var E = window.wangEditor;
    var editor = new E('#dome01');
    // 使用 base64 保存图片
    editor.customConfig.uploadImgShowBase64 = true;
    // 将图片大小限制为 3M
    editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
    // 限制一次最多上传 5 张图片
    editor.customConfig.uploadImgMaxLength = 10;
    // 关闭粘贴样式的过滤
    editor.customConfig.pasteFilterStyle = false;
    // 自定义字体
    editor.customConfig.fontNames = [
        '宋体',
        '微软雅黑',
        'Arial',
        'Tahoma',
        'Verdana'
    ];
    editor.create();

    //文章类型下拉列表框
    $.ajax({
        type:'POST',
        url:ctxPath+"/blogtype/alla",
        success:function(result){
            for(var i=0;i<result.length;i++){
                var bt=result[i];
                var $option = $("<option value=\""+bt.btid+"\">"+bt.tname+"</option>");
                $(".fushu>select").append($option);
            }
        }
    })

    //获取焦点
    $(".ti input[name=\"btitle\"]").focus(function () {
        $("#popover575669").css("display","none");
    });
    $(".fushu>p:eq(0)>textarea").focus(function () {
        $("#popover647756").css("display","none");
    });
    $(".fushu>select").focus(function () {
        $("#popover19436").css("display","none");
    });
    //失去焦点验证
    $(".ti input[name=\"btitle\"]").blur(function () {
        if($(this).val() == ""){
            $("#popover575669").css("display","block");
        }
    });
    $(".fushu>p:eq(0)>textarea").blur(function () {
        if($(this).val() == ""){
            $("#popover647756").css("display","block");
        }
        if(editor.txt.html().length > 25){
            $("#popover748664").css("display","none");
        }
    });
    $(".fushu>select").blur(function () {
        if($(this).val() == 0){
            $("#popover19436").css("display","block");
        }
    });

    //发布博客
    $(".pb_fa button").click(function () {
        var uid = $("input[name=loginUid]").val();
        var btitle = $(".ti input[name=\"btitle\"]").val();
        var bcontent = editor.txt.html();
        var babstract = $(".fushu>p:eq(0)>textarea").val();
        var btid = $(".fushu>select option:selected").val();
        var flag = true;
        if(btitle == ""){
            $("#popover575669").css("display","block");
            flag = false;
        }
        if(bcontent.length < 25){
            $("#popover748664").css("display","block");
            flag = false;
        }
        if(babstract == ""){
            $("#popover647756").css("display","block");
            flag = false;
        }
        if(btid == 0){
            $("#popover19436").css("display","block");
            flag = false;
        }
        alert(flag);
        if(flag){
            $.ajax({
                type: 'POST',
                url: ctxPath + "/blog/add",
                contentType: "application/json",
                data: JSON.stringify({"uid": uid, "btitle": btitle, "bcontent": bcontent, "btid": btid, "babstract": babstract}),
                success: function (result) {
                    if(result){
                        alert("发布成功，等待审核");
                    }else{
                        alert("发布失败！");
                    }
                }
            })
        }
    });

})