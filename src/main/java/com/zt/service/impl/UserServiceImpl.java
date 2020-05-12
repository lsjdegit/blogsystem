package com.zt.service.impl;

import com.zt.entity.User;
import com.zt.mapper.UserMapper;
import com.zt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author scj
 * @create 2020-05-08 19:28
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private  UserMapper userMapper;

    /**
     * 登录
     */
    public User Login(User user) {
        return userMapper.Login(user);
    }

    /**
     *  注册
     */
    public int Register(User user) {
        return userMapper.Register(user);
    }

    /**
     * 专家认证用户
     * @return
     */
    @Override
    public List<User> expertUser() {
        return userMapper.expertUser();
    }
}
