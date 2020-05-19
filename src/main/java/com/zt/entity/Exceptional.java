package com.zt.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Exceptional implements Serializable {

    private Integer eid;
    private Integer bid;
    private Integer uid;
    private Integer money;
    private String etime;
    private User user;

}
