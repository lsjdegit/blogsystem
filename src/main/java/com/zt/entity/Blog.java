package com.zt.entity;

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
public class Blog implements Serializable {

	private Integer bid;
	private Integer uid;
	private String btitle;
	private String bcontent;
	private String bcreatetime;
	private Integer btid;
	private Integer gnumber;
	private Integer bnumber;
	private Integer bstatusid;
	private String babstract;
	private User user;
	@JsonIgnore
	private List<Collect> collects;
	private List<Praise> praises;
	@JsonIgnore
	private List<Comment> comments;

}