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

    @Select("select * from praise where bid=#{bid}")
    public List<Praise> getPraiseByBlogBlog(@Param("bid") Integer bid);

    /**
     * 点赞
     * @param praise
     * @return
     */
    @Insert("insert into praise(uid,bid) values(#{uid},#{bid})")
    public int addPraise(Praise praise);

    /**
     * 取消赞
     * @param praise
     * @return
     */
    @Delete("delete from praise where uid=#{uid} and bid=#{bid}")
    public int delPraise(Praise praise);

    /**
     * 删除博客下的赞
     * @param bid
     * @return
     */
    @Delete("delete from praise where bid=#{bid}")
    public int delPraiseByBlog(@Param("bid") Integer bid);

}
