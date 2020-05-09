package com.zt.controller;

import com.zt.entity.User;
import com.zt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author scj
 * @create 2020-05-08 19:31
 */
@Controller
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 进入登录页面
     */
    @RequestMapping("login")
    public String login(){
        return "login1";
    }

    /**
     * 验证登录信息
     */
    @RequestMapping("loginuser")
    @ResponseBody
    public User LoginUser(User user, Model model){
        user=userService.Login(user);
        model.addAttribute("user",user);
        System.out.println(user);
        return user;
    }
    /**
     * 进入注册页面
     */
    @RequestMapping("register")
    public String register(){
        return "register";
    }
    /**
     * 用户注册
     */
    @RequestMapping("registeruser")
    public String registerUser(User user){
       int reg= userService.Register(user);
       if(reg>0){
           return "success";
       }else{
           return "register";
       }
    }
}
