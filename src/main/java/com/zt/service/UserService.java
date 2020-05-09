package com.zt.service;

import com.zt.entity.User;

/**
 * @author scj
 * @create 2020-05-08 19:25
 */
public interface UserService {
    /**
     * 登录
     */

    public User Login(User user);
    /**
     * 注册
     */
    public int Register(User user);
}
