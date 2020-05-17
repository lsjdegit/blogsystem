package com.zt.util;

public class RandomUtil {
	//  生成6位数随机验证码
	public static String getRandom() {
		String[] letters = new String[] {
				"q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m",
				"A","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M",
				"0","1","2","3","4","5","6","7","8","9"};
		String code ="";
		for (int i = 0; i < 6; i++) {
			code = code + letters[(int)Math.floor(Math.random()*letters.length)];
		}
		return code;
	}

	//返回页面Html携带的6位随机码
	public static String html(String code) {

		String html = "Email地址验证<br/>"+
				"这封邮件是由【博客】发送的。<br/>"+
				"账号注册声明<br/>"+
				"请将下面的验证码输入到提示框即可：<h3 style='color:red;'>" + code + "</h3><br/>";
		return html;
	}
}
