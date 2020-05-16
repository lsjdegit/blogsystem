package com.zt.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
	@JsonBackReference(value = "parent")
	private Comment parent;
	@JsonBackReference(value = "sons")
	private List<Comment> sons;


}