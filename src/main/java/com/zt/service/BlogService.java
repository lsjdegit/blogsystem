package com.zt.service;

import com.zt.entity.Blog;
import com.zt.entity.User;
import org.apache.ibatis.annotations.Param;

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

    public List<Blog> selectBlogst(Integer btid, Integer uid, String search, Integer first, Integer pageSize,String bcreatetime,Integer bstatusid);

    /**
     * 根据id查blog
     * @param bid
     * @return
     */
    public Blog getBlogById(Integer bid);

    /**
     * 添加博客
     * @param blog
     * @return
     */
    public int addBlog(Blog blog);
}
