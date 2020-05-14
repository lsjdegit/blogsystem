package com.zt.mapper;

import com.zt.entity.Praise;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface PraiseMapper {

    @Select("select * from praise where bid=#{bid}")
    @Results({
            @Result(id=true,column="praiseid",property="praiseid"),
            @Result(column="uid",property="user",one=@One(select="com.zt.mapper.UserMapper.getUserById"))
    })
    public List<Praise> getPraiseByBlog(@Param("bid") Integer bid);

}
