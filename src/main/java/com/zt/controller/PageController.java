package com.zt.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {

    /**
     * 进入登录页面
     */
    @RequestMapping("login")
    public String login(){
        return "login";
    }

    /**
     * 进入注册页面
     */
    @RequestMapping("register")
    public String register(){
        return "register";
    }

    /**
     * 进入主页面
     */
    @RequestMapping("index")
    public String index(){
        return "forward:/blogtype/all";
    }

    @RequestMapping("addbolg")
    public String addbolg(){
        return "addbolg";
    }

    @RequestMapping("adminindex")
    public String adminindex(){
        return "adminindex";
    }

    @RequestMapping("myblog")
    public String myblog(){
        return "myblog";
    }

    @RequestMapping("personal")
    public String personal(){
        return "personal";
    }


}
