package com.zt.mapper;

import com.zt.entity.User;
import org.apache.ibatis.annotations.Select;

public interface UserMapper {
    //登录
    @Select("select * from user where uname=#{uname} and upassword=#{upassword}")
    public User Login(User user);

}
