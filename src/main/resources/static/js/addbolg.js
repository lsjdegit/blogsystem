 var E = window.wangEditor;
		var editor = new E('.dome01');
		editor.customConfig.uploadImgShowBase64 = true; //上传本地图片
		// 关闭粘贴样式的过滤
        editor.customConfig.pasteFilterStyle = false;
		// 自定义字体
    editor.customConfig.fontNames = [
        '宋体',
        '微软雅黑',
        'Arial',
        'Tahoma',
        'Verdana'
    ]
		editor.create();