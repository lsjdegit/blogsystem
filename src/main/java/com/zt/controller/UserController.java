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
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 验证登录信息
     */
    @RequestMapping("login")
    @ResponseBody
    public User LoginUser(User user, Model model){
        user=userService.Login(user);
        model.addAttribute("user",user);
        System.out.println(user);
        return user;
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
}
