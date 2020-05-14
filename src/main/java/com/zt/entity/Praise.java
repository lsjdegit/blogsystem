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
public class Praise implements Serializable {
    private Integer praiseid;
    private Integer uid;
    private Integer bid;
    private User user;

}
