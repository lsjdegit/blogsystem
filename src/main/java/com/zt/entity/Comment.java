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
public class Comment implements Serializable {

	private Integer cid;
	private Integer bid;
	private Integer uid;
	private String cocontext;


}