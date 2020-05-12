package com.zt.service;

import com.zt.entity.Blog;
import com.zt.entity.User;

import java.util.List;

public interface BlogService {
    /**
     * 查询博客
     * @param btid
     * @param search
     * @param first
     * @param pageSize
     * @return
     */
    public List<Blog> selectBlog(Integer btid, Integer uid, String search, Integer first, Integer pageSize);
}
