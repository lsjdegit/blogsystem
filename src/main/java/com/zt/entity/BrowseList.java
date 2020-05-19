package com.zt.entity;

import lombok.Data;

import java.util.List;
@Data
public class BrowseList {
    private List<Browse> browselist;
    private List<Blog> bloglist;
    private Integer tatalpage;

}
