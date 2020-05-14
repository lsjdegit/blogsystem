package com.zt.service.impl;

import com.zt.entity.User;
import com.zt.mapper.UserMapper;
import com.zt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public List<User> rankingUser(){
        List<User> userList = new ArrayList<>();
        List<Integer> uids = userMapper.rankingUser();
        for (Integer uid : uids) {
            System.out.println(uid);
            User user = userMapper.getUserById(uid);
            userList.add(user);
        }
        return userList;
    }

    /**
     * 根据用户id查用户数据（关注、粉丝、浏览记录）
     */
    @Override
    public User getUserById(Integer uid) {
        return userMapper.getUserById(uid);
    }


    /**
     * 根据用户id修改用户基础信息
     */
    @Override
    public int updateUser(User user) {
        return userMapper.updateUser(user);
    }

    /**
     * 根据用户id修改用户头像
     */
    @Override
    public int updateUserimg(User user) {
        return userMapper.updateUserimg(user);
    }

    /**
     * 根据用户多条件查询
     * @param uname
     * @param isexpert
     * @param first
     * @param pageSize
     * @return
     */
    @Override
    public List<User> selectAll(String uname, Integer isexpert, Integer first, Integer pageSize) {
        return userMapper.selectAll(uname,isexpert,first,pageSize);
    }
}
