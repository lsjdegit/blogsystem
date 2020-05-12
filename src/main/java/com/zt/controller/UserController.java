package com.zt.controller;

import com.zt.entity.Blog;
import com.zt.entity.User;
import com.zt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * @author scj
 * @create 2020-05-08 19:31
 */
@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 验证登录信息
     */
    @RequestMapping("login")
    @ResponseBody
    public User loginUser(User user, HttpSession session){
        user=userService.Login(user);
        session.setAttribute("loginUser",user);
        return user;
    }

    /**
     * 注销
     */
    @RequestMapping("logout")
    @ResponseBody
    public void logoutUser(HttpSession session){
        session.removeAttribute("loginUser");
    }

    /**
     * 用户注册
     */
    @RequestMapping("register")
    public String registerUser(User user){
       int reg= userService.Register(user);
       if(reg>0){
           return "success";
       }else{
           return "register";
       }
    }

    /**
     * 随机三个专家用户
     * @param m
     * @return
     */
    @RequestMapping("expert")
    public String expertUser(Model m){
        List<User> userList = userService.expertUser();
        List<User> eUserList = new ArrayList<>();
        do{
            for (User user : userList) {
                int i = Math.random()>0.5?1:0;
                if(eUserList.size()<3 ){
                    if(i == 1){
                        boolean flag = true;
                        for (User u : eUserList) {
                            if(u.getUid().equals(user.getUid())){
                                flag = false;
                                break;
                            }
                        }
                        if(flag){
                            eUserList.add(user);
                        }
                    }
                }else {
                    break;
                }
            }
        }while (eUserList.size()<3);
        m.addAttribute("eUserList",eUserList);
        for (User user : eUserList) {
            System.out.println("user = " + user);
        }
        return "forward:guser";
    }

    /**
     * 点赞排行榜前三
     * @param m
     * @return
     */
    @RequestMapping("guser")
    public String gUser(Model m){
        List<User> guserList = userService.rankingUser();
        List<Integer> gList = new ArrayList<>();
        for (User user : guserList) {
            List<Blog> blogList = user.getBlogs();
            Integer gnumber = 0;
            for (Blog blog : blogList) {
                gnumber += blog.getGnumber();
            }
            gList.add(gnumber);
        }
        m.addAttribute("guserList",guserList);
        for (User user : guserList) {
            System.out.println("user = " + user);
        }
        m.addAttribute("gList",gList);
        for (Integer integer : gList) {
            System.out.println("integer = " + integer);
        }
        return "index";
    }



}
