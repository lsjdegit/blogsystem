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
public class Collect {
    private Integer collectid;
    private Integer uid;
    private Integer bid;
    private Blog cblogs;

}
