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

    /**
     * 收藏分页
     * @param uid
     * @param first
     * @param pageSize
     * @return
     */
    @Select("select * from collect where uid=#{uid} LIMIT #{first},#{pageSize}")
    @Results({
            @Result(id=true,column="collectid",property="collectid"),
            @Result(column="uid",property="user",one=@One(select="com.zt.mapper.UserMapper.getUserById")),
            @Result(column="bid",property="blog",one=@One(select="com.zt.mapper.BlogMapper.getBlogById"))
    })
    public List<Collect> getCollectsByUserfen(@Param("uid") Integer uid, @Param("first")Integer first, @Param("pageSize")Integer pageSize);

    /**
     * 收藏
     * @param collect
     * @return
     */
    @Insert("insert into collect(uid,bid) values(#{uid},#{bid})")
    public int addCollect(Collect collect);

    /**
     * 取消收藏
     * @param collect
     * @return
     */
    @Delete("delete from collect where uid=#{uid} and bid=#{bid}")
    public int delCollect(Collect collect);

    /**
     * 删除博客对应的收藏
     * @param bid
     * @return
     */
    @Delete("delete from collect where bid=#{bid}")
    public int delCollectByBlog(@Param("bid") Integer bid);

}
