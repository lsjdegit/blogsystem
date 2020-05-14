package com.zt.mapper;

import com.zt.entity.Collect;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface CollectMapper {

    @Select("select * from collect where bid=#{bid}")
    @Results({
            @Result(id=true,column="collectid",property="collectid"),
            @Result(column="uid",property="user",one=@One(select="com.zt.mapper.UserMapper.getUserById")),
            @Result(column="bid",property="blog",one=@One(select="com.zt.mapper.BlogMapper.getBlogById"))
    })
    public List<Collect> getCollectByBlog(@Param("bid") Integer bid);


    @Select("select * from collect where uid=#{uid}")
    @Results({
            @Result(id=true,column="collectid",property="collectid"),
            @Result(column="uid",property="user",one=@One(select="com.zt.mapper.UserMapper.getUserById")),
            @Result(column="bid",property="blog",one=@One(select="com.zt.mapper.BlogMapper.getBlogById"))
    })
    public List<Collect> getCollectsByUser(@Param("uid") Integer uid);

}
