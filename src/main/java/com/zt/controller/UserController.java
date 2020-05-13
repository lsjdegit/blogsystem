package com.zt.controller;

import com.zt.entity.Blog;
import com.zt.entity.User;
import com.zt.service.UserService;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
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

    /**
     * 个人中心数据
     * @param sess
     * @return
     */
    @RequestMapping("pansonalselect")
    @ResponseBody
    public User personalselect(HttpSession sess){
        User kl= (User) sess.getAttribute("loginUser");
        User puser =userService.getUserById(kl.getUid());
        //System.out.println(puser);
        System.out.println(puser.getFans().size());
        System.out.println(puser.getBalance());
        return puser;
    }

    /**
     * 修改用户
     * @param user
     * @return
     */
    @RequestMapping("/updateuser")
    @ResponseBody
    public boolean updateUser(@RequestBody User user,HttpSession sess){
        User ui= (User) sess.getAttribute("loginUser");
        user.setUid(ui.getUid());
        int num=userService.updateUser(user);
        System.out.println(num);
        if(num==0){
            return false;
        }
        return true;
    }


    @RequestMapping(value="updateUserimg",method= RequestMethod.POST)
    @ResponseBody
    public boolean uploadImg(@RequestBody HttpServletRequest request, Model m,HttpSession sess, User user){
        User uu= (User) sess.getAttribute("loginUser");
        user.setUid(uu.getUid());
        MultipartHttpServletRequest req = (MultipartHttpServletRequest) request;
        MultipartFile file = req.getFile(user.getUimage());
        String path = request.getRealPath("/upload")+"/"+uu.getUid()+"head.jpg";
        File destFile = new File(path);
        //m.addAttribute("image", "/upload/"+file.getOriginalFilename());
        try {
            FileUtils.copyInputStreamToFile(file.getInputStream(), destFile);
            return true;
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return false;
    }



}
