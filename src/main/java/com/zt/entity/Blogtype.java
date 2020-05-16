package com.zt.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Blogtype implements Serializable {

	private Integer btid;
	private String tname;


}