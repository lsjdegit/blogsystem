package com.zt.controller;

import com.zt.entity.Blog;
import com.zt.entity.BlogParameter;
import com.zt.entity.ListPage;
import com.zt.entity.User;
import com.zt.mapper.BlogMapper;
import com.zt.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/blog")
public class BlogController {
    @Autowired
    private BlogService blogService;
    private Integer pageSize = 4;

    /**
     * 主页查询博客
     * @param blogParameter
     * @return
     */
    @RequestMapping(value = "select",method = RequestMethod.POST)
    @ResponseBody
    public ListPage selectBlog(@RequestBody BlogParameter blogParameter){
        Integer totalSize = blogService.selectBlog(blogParameter.getBtid(),blogParameter.getUid(),blogParameter.getSearchBlog(),0,0).size();
        Integer totalPage = totalSize%pageSize==0?totalSize/pageSize:totalSize/pageSize+1;
        Integer first = pageSize*(blogParameter.getPageIndex()-1);
        List<Blog> blogList = blogService.selectBlog(blogParameter.getBtid(),blogParameter.getUid(),blogParameter.getSearchBlog(),first,pageSize);
        ListPage listPage = new ListPage();
        listPage.setList(blogList);
        listPage.setTotalPage(totalPage);
        return listPage;
    }

    @RequestMapping(value = "selectst",method = RequestMethod.POST)
    @ResponseBody
    public ListPage selectBlogst(@RequestBody BlogParameter blogParameter){
        System.out.println("状态："+blogParameter.getBstatusid());
        Integer totalSize=blogService.selectBlogst(blogParameter.getBtid(),blogParameter.getUid(),blogParameter.getSearchBlog(),0,0,blogParameter.getBcreatetime(),blogParameter.getBstatusid()).size();
        Integer totalPage = totalSize%pageSize==0?totalSize/pageSize:totalSize/pageSize+1;
        Integer first = pageSize*(blogParameter.getPageIndex()-1);
        List<Blog> blogList = blogService.selectBlogst(blogParameter.getBtid(),blogParameter.getUid(),blogParameter.getSearchBlog(),first,pageSize,blogParameter.getBcreatetime(),blogParameter.getBstatusid());
        ListPage listPage = new ListPage();
        listPage.setList(blogList);
        listPage.setTotalPage(totalPage);
        return listPage;
    }

    @RequestMapping("view")
    public String blogview(Integer bid, Model m){
        Blog blog = blogService.getBlogById(bid);
        m.addAttribute("blog",blog);
        return "blog";
    }

    /**
     * 添加博客
     * @param blog
     * @return
     */
    @RequestMapping("add")
    @ResponseBody
    public boolean addBlog(@RequestBody Blog blog){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        blog.setBcreatetime(sdf.format(new Date()));
        int num = blogService.addBlog(blog);
        if(num>0){
            return true;
        }
        return false;
    }
    /**
     * 管理员点击未审核博客进入对应的个人页面
     * @param bid
     * @param m
     * @return
     */
    @RequestMapping("selectid")
    public String selectid(Integer bid, Model m){
        Blog blog = blogService.getBlogById(bid);
        m.addAttribute("blog",blog);
        return "adminblog";
    }

    /**
     * 管理员点击审核进入对应的个人页面
     * @param bid
     * @param m
     * @return
     */
    @RequestMapping("selectidzhu")
    public String selectidzhu(Integer bid, Model m){
        Blog blog = blogService.getBlogById(bid);
        m.addAttribute("blog",blog);
        return "blog";
    }


    /**
     * 修改是否审核通过
     * @param blog
     * @return
     */
    @RequestMapping("updatesh")
    @ResponseBody
    public int updatesh(@RequestBody Blog blog){
        System.out.println(blog.getBid());
        return blogService.updatetg(blog);
    }


}
