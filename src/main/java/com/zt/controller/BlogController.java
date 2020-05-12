package com.zt.controller;

import com.zt.entity.Blog;
import com.zt.mapper.BlogMapper;
import com.zt.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/blog")
public class BlogController {
    @Autowired
    private BlogService blogService;
    private Integer pageSize = 4;

    @RequestMapping("select")
    @ResponseBody
    public List<Blog> selectBlog(Integer btid,Integer uid,String searchBlog,Integer pageIndex){

        Integer first = pageIndex%pageSize==0?pageIndex/pageSize:pageIndex/pageSize+1;
        List<Blog> blogList = blogService.selectBlog(1,0,"",0,pageSize);
        return blogList;
    }


}
