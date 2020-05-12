package com.zt.service;

import com.zt.entity.User;

import java.util.List;

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

    /**
     * 专家认证用户
     * @return
     */
    public List<User> expertUser();

    /**
     * 根据点赞数量的用户排行榜
     * @return
     */
    public List<User> rankingUser();
}
