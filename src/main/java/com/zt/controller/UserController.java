package com.zt.controller;

import com.zt.entity.User;
import com.zt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author scj
 * @create 2020-05-08 19:31
 */
@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("login")
    public String login(){
        return "login1";
    }

    @RequestMapping("LoginUser")
    public String LoginUser(User user, Model model){
       user=userService.Login(user);
       model.addAttribute("user",user);
        if("admin".equals(user.getUname())){
            return "success";
        }else{
            return "success";
        }
    }
}
