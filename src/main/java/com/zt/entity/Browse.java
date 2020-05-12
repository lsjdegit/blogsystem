package com.zt.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Browse {
    private Integer browseid;
    private Integer uid;
    private Integer bid;
    private String browsetime;
    private Blog bblogs;
}
