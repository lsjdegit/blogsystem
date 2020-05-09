package com.zt.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.io.Serializable;

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
	private Integer bnumber;
	private Integer bstatusid;
}