package com.zt.entity;

import lombok.Data;

@Data
public class BlogParameter {
    private Integer bid;
    private Integer btid;
    private Integer uid;
    private Integer pageIndex;
    private String searchBlog;
    private String bcreatetime;
    private Integer bstatusid;
    private String uname;
    private Integer isexpert;
}
