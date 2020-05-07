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
public class Ubrelevance implements Serializable {

	private Integer ubid;
	private Integer bid;
	private Integer uid;
	private Integer gstate;
	private Integer cstate;
	private String btime;


}