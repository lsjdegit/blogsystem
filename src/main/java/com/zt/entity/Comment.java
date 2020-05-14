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
public class Comment implements Serializable {

	private Integer cid;
	private Integer bid;
	private Integer uid;
	private Integer parentid;
	private String cocontext;
	private String comtime;
	private Blog blog;
	private User user;
	private Comment parent;
	private List<Comment> sons;


}