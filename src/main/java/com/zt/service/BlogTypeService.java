package com.zt.service;

import com.zt.entity.Blogtype;

import java.util.List;

/**
 * @author scj
 * @create 2020-05-09 15:31
 */
public interface BlogTypeService {

    /**
     * 遍历所有博客类型
     */
    public List<Blogtype> selectallblogtype();
}
