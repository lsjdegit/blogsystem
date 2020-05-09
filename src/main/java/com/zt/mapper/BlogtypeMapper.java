package com.zt.mapper;

import com.zt.entity.Blogtype;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface BlogtypeMapper {

    /**
     * 遍历所有博客类型
     */

    @Select("select * from blogtype")
    public List<Blogtype> selectallblogtype();
}