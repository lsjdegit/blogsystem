package com.zt.mapper;

import com.zt.entity.Collect;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface CollectMapper {

    @Select("select * from collect where bid=#{bid}")
    @Results({
            @Result(id=true,column="collectid",property="collectid"),
            @Result(column="uid",property="user",one=@One(select="com.zt.mapper.CollectMapper.getUserById")),
            @Result(column="bid",property="blog",one=@One(select="com.zt.mapper.PraiseMapper.getBlogById"))
    })
    public List<Collect> getCollectByBlog(@Param("bid") Integer bid);

}
