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
public class Message implements Serializable {

	private Integer mid;
	private Integer mtypeid;
	private Integer bid;
	private Integer status;

}