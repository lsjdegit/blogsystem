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

}
