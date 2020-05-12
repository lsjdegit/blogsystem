package com.zt.entity;

import lombok.Data;

import java.util.List;

@Data
public class ListPage {
    private List list;
    private Integer totalPage;
}
