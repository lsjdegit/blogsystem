package com.zt.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {

	private Integer uid;
	private String uname;
	private String upassword;
	private String uimage;
	private Integer isadmin;
	private String sex;
	private String email;
	private Integer age;
	private Integer balance;
	private String intro;
	private Integer isexpert;
	private List<Blog> blogs;
	private List<Browse> browses;
	private List<User> cares;
	private List<User> fans;
	private List<Collect> collects;

	public User(String uname, String upassword) {
		this.uname = uname;
		this.upassword = upassword;
	}

}