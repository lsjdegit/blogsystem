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
public class exceptional implements Serializable {

    private Integer eid;
    private Integer bid;
    private Integer uid;
    private Integer money;

}
