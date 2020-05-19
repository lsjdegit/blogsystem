package com.zt.service.impl;

import com.zt.entity.Blog;
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
     * 根据用户id修改用户余额
     */
    @Override
    public int updateUserbalance(User user) {
        return userMapper.updateUserBalance(user);
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

    @Override
    /**
     * 通过专家的验证
     */
    public int zhuanjia(User user) {
        return userMapper.zhuanjia(user);
    }

    /**
     * 更新密码
     * @param user
     * @return
     */
    @Override
    public int updatepass(User user) {
        return userMapper.updatepass(user);
    }


    @Override
    public List<User> selectAllUser() {
        return userMapper.selectAllUser();
    }

    @Override
    public Integer getBalance(Integer uid) {
        return userMapper.getBalance(uid);
    }

    @Override
    public int getgnumber(Integer uid) {
      User user= userMapper.getUserById(uid);
     List<Blog> bloglist= user.getBlogs();
     int gnumber=0;
     if(bloglist!=null){
            for (int i = 0; i < bloglist.size(); i++) {
                gnumber+=bloglist.get(i).getPraises().size();
            }
        }
        return gnumber;
    }

    @Override
    public int getbnumber(Integer uid) {
        User user= userMapper.getUserById(uid);
        List<Blog> bloglist= user.getBlogs();
        int bnumber=0;
        if(bloglist!=null){
            for (int i = 0; i < bloglist.size(); i++) {
                bnumber+=bloglist.get(i).getBnumber();
            }
        }
        return bnumber;
    }
}
