package com.zt.mapper;

import com.zt.entity.Blog;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface BlogMapper {

    /**
     * 根据用户id查博客
     * @param uid
     * @return
     */
    @Select("select * from blog where uid=#{uid}")
    public List<Blog> getBlogByUser(@Param("uid") Integer uid);
}
