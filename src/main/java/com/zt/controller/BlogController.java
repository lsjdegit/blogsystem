package com.zt.controller;

import com.zt.entity.Blog;
import com.zt.mapper.BlogMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/blog")
public class BlogController {
    @Autowired
    private BlogMapper blogMapper;

//    @RequestMapping("select")
//    @ResponseBody
//    public List<Blog> selectBlog(){
//        List<Blog> blogList = blogMapper.selectBlog(0,"",1,2);
//        System.out.println("blogList.size() = " + blogList.size());
//        for (Blog blog : blogList) {
//            System.out.println("blog = " + blog);
//        }
//        return blogList;
//    }


}
