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

    /**
     * 根据用户id查用户数据（关注、粉丝、浏览记录）
     */
    public User getUserById(Integer uid);

    /**
     * 根据用户id修改用户基础信息
     * @param user
     * @return
     */
    public int updateUser(User user);

    /**
     * 根据用户id修改用户头像
     * @param user
     * @return
     */
    public int updateUserimg(User user);

    /**
     * 根据用户id修改用户余额
     * @param user
     * @return
     */
    public int updateUserbalance(User user);


    /**
     * 根据用户多条件查询
     * @param uname
     * @param isexpert
     * @param first
     * @param pageSize
     * @return
     */
    public List<User> selectAll(String uname,Integer isexpert,Integer first,Integer pageSize);

    /**
     * 通过专家申请
     * @param user
     * @return
     */
    public int zhuanjia(User user);

    /**
     * 查询用户余额
     * @param uid
     * @return
     */
    public Integer getBalance(Integer uid);
}
