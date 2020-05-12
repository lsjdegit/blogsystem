package com.zt.mapper;

import com.zt.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface UserMapper {

    /**
     * 登录
     */
    @Select("select * from user where uname=#{uname} and upassword=#{upassword}")
    public User Login(User user);

    /**
     * 注册
     */
    @Insert("insert into user(uname,upassword,uimage,sex,email,age) values(#{uname},#{upassword},#{uimage},#{sex},#{email},#{age})")
    public int Register(User user);

    /**
     * 专家认证的用户
     * @return
     */
    @Select("select * from user where isexpert=1")
    @Results({
            @Result(id=true,column="uid",property="uid"),
            @Result(column="uid",property="blogs",many=@Many(select="com.zt.mapper.BlogMapper.getBlogByUser"))
    })
    public List<User> expertUser();

    /**
     * 根据点赞数量的用户排行榜
     * @return
     */
    @Select("SELECT uid FROM blog GROUP BY uid ORDER BY SUM(gnumber) DESC")
    public List<Integer> rankingUser();

    /**
     * 根据id获得用户
     * @param uid
     * @return
     */
    @Select("select * from user where uid=#{uid}")
    @Results({
            @Result(id=true,column="uid",property="uid"),
            @Result(column="uid",property="blogs",many=@Many(select="com.zt.mapper.BlogMapper.getBlogByUser")),
            @Result(column="uid",property="rblogs",many=@Many(select="com.zt.mapper.BlogMapper.getRblogByUser")),
            @Result(column="uid",property="cares",many=@Many(select="com.zt.mapper.UserMapper.getCareByUser")),
            @Result(column="uid",property="fans",many=@Many(select="com.zt.mapper.UserMapper.getFansByUser"))
    })
    public User getUserById(@Param("uid") Integer uid);

    /**
     * 根据博客id获取互动用户集合
     * @param bid
     * @return
     */
    @Select("select * from user where uid in(select uid from ubrelevance where bid=#{bid})")
    public List<User> getUserByBlog(@Param("bid")Integer bid);

    /**
     * 根据用户id查关注的用户集合
     * @param uid
     * @return
     */
    @Select("select * from user where uid in(select uid from uurelevance where fansid=#{uid})")
    public List<User> getCareByUser(@Param("uid")Integer uid);

    /**
     * 根据用户id查粉丝的用户集合
     * @param uid
     * @return
     */
    @Select("select * from user where uid in(select fansid from uurelevance where uid=#{uid})")
    public List<User> getFansByUser(@Param("uid")Integer uid);

}
