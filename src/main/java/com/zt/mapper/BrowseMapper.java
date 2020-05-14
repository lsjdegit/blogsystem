package com.zt.mapper;

import com.zt.entity.Browse;
import org.apache.ibatis.annotations.*;



import java.util.List;

public interface BrowseMapper {

    @Select("select * from browse where uid=#{uid}")
    @Results({
            @Result(id=true,column="collectid",property="collectid"),
            @Result(column="uid",property="user",one=@One(select="com.zt.mapper.UserMapper.getUserById")),
            @Result(column="bid",property="blog",one=@One(select="com.zt.mapper.BlogMapper.getBlogById"))
    })
    public List<Browse> getBrowseByUser(@Param("uid") Integer uid);
}
