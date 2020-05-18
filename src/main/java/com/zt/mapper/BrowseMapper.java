package com.zt.mapper;

import com.zt.entity.Browse;
import org.apache.ibatis.annotations.*;



import java.util.List;

public interface BrowseMapper {

    @Select("select * from browse where uid=#{uid} LIMIT #{first},#{pageSize}")
    @Results({
            @Result(id=true,column="browseid",property="browseid"),
            @Result(column="uid",property="user",one=@One(select="com.zt.mapper.UserMapper.getUserById")),
            @Result(column="bid",property="blog",one=@One(select="com.zt.mapper.BlogMapper.getBlogById"))
    })
    public List<Browse> getBrowseByUser(@Param("uid") Integer uid, @Param("first")Integer first, @Param("pageSize")Integer pageSize);


    @Select("select * from browse where uid=#{uid}")
    @Results({
            @Result(id=true,column="collectid",property="collectid"),
            @Result(column="uid",property="user",one=@One(select="com.zt.mapper.UserMapper.getUserById")),
            @Result(column="bid",property="blog",one=@One(select="com.zt.mapper.BlogMapper.getBlogById"))
    })
    public List<Browse> getBrowseByUserAll(@Param("uid") Integer uid);

    /**
     * 删浏览记录
     * @param browse
     * @return
     */
    @Delete("DELETE FROM browse WHERE uid=#{uid} AND bid=#{bid}")
    public int addBorwse(Browse browse);

    /**
     * 添加浏览记录
     * @param browse
     * @return
     */
    @Insert("INSERT INTO browse(uid,bid,browsetime) VALUES(#{uid},#{bid},#{browsetime})")
    public int addBrowse(Browse browse);
}
