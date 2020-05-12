package com.zt.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User implements Serializable {

	private Integer uid;
	private String uname;
	private String upassword;
	private String uimage;
	private Integer isadmin;
	private String sex;
	private String email;
	private Integer age;
	private Integer blance;
	private String intro;
	private Integer isexpert;
	private List<Blog> blogs;
	private List<Blog> rblogs;
	private List<User> cares;
	private List<User> fans;

	public User(String uname, String upassword) {
		this.uname = uname;
		this.upassword = upassword;
	}
}