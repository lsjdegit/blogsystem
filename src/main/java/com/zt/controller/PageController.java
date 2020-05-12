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

    /**
     * 进入blag页面
     */
    @RequestMapping("blog")
    public String blog(){
        return "blog";
    }

    /**
     * 进入addblag页面
     */
    @RequestMapping("addbolg")
    public String addbolg(){
        return "addbolg";
    }

    /**
     * 进入管理员页面
     */
    @RequestMapping("adminindex")
    public String adminindex(){
        return "adminindex";
    }

    /**
     * 进入我的博客页面
     */
    @RequestMapping("myblog")
    public String myblog(){
        return "myblog";
    }

    /**
     * 进入个人中心页面
     */
    @RequestMapping("personal")
    public String personal(){
        return "personal";
    }
    /**
     * 进入消息中心页面
     */
    @RequestMapping("news")
    public String news(){
        return "news";
    }


    /**
     * 进入他人信息页面
     */
    @RequestMapping("homepage")
    public String homepage(){
        return "homepage";
    }


}
