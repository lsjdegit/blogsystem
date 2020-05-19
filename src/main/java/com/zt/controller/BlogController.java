package com.zt.controller;

import com.zt.entity.*;
import com.zt.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
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

    /**
     * 查看博客
     * @param bid
     * @param m
     * @return
     */
    @RequestMapping("view")
    public String blogview(Integer bid, Model m, HttpSession session){
        List<Integer> bids = (List<Integer>) session.getAttribute("bids");
        if(bids == null){
            return "redirect:../index";
        }
        boolean flag = true;
        for (int i=0;i<bids.size();i++) {
            if(bids.get(i) == bid){
                flag = false;
                break;
            }
        }
        if(flag){
            blogService.addBnumber(bid);
            bids.add(bid);
            session.setAttribute("bids",bids);
        }
        Blog blog = blogService.getBlogById(bid);
        Integer broSize = 0;
        Integer praSize = 0;
        Integer blogSize = 0;
        for (Blog b : blog.getUser().getBlogs()) {
            broSize += b.getBnumber();
            praSize += b.getPraises().size();
            if(b.getBstatusid() == 1){
                blogSize++;
            }
        }
        //是否关注
        boolean isFans = false;
        User user = (User) session.getAttribute("loginUser");
        if(user != null){
            Integer fansid = user.getUid();
            for (User u : blog.getUser().getFans()) {
                if(u.getUid() == fansid){
                    isFans = true;
                    break;
                }
            }
        }

        m.addAttribute("blog",blog);
        m.addAttribute("praSize",praSize);
        m.addAttribute("broSize",broSize);
        m.addAttribute("blogSize",blogSize);
        m.addAttribute("isFans",isFans);
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

    /**
     * 查询我的博客
     * @param blogParameter
     * @return
     */
    @RequestMapping(value = "selectmy",method = RequestMethod.POST)
    @ResponseBody
    public ListPage selectMyBlog(@RequestBody BlogParameter blogParameter){
        Integer pageSize = 5;
        Integer totalSize = blogService.selectMyBlog(blogParameter.getUid(),blogParameter.getBstatusid(),blogParameter.getSearchBlog(),0,0).size();
        Integer totalPage = totalSize%pageSize==0?totalSize/pageSize:totalSize/pageSize+1;
        Integer first = pageSize*(blogParameter.getPageIndex()-1);
        List<Blog> blogList = blogService.selectMyBlog(blogParameter.getUid(),blogParameter.getBstatusid(),blogParameter.getSearchBlog(),first,pageSize);
        ListPage listPage = new ListPage();
        listPage.setList(blogList);
        listPage.setTotalPage(totalPage);
        return listPage;
    }

    /**
     * 删除我的博客
     * @param blogParameter
     * @return
     */
    @RequestMapping(value = "delmyblog",method = RequestMethod.POST)
    @ResponseBody
    public ListPage delMyBlog(@RequestBody BlogParameter blogParameter){
        blogService.delBlog(blogParameter.getBid());
        Integer pageSize = 5;
        Integer pageIndex = blogParameter.getPageIndex();
        Integer totalSize = blogService.selectMyBlog(blogParameter.getUid(),blogParameter.getBstatusid(),blogParameter.getSearchBlog(),0,0).size();
        Integer totalPage = totalSize%pageSize==0?totalSize/pageSize:totalSize/pageSize+1;
        if(totalPage<pageIndex && totalPage!=0){
            pageIndex = totalPage;
        }
        Integer first = pageSize*(pageIndex-1);
        List<Blog> blogList = blogService.selectMyBlog(blogParameter.getUid(),blogParameter.getBstatusid(),blogParameter.getSearchBlog(),first,pageSize);
        ListPage listPage = new ListPage();
        listPage.setList(blogList);
        listPage.setTotalPage(totalPage);
        return listPage;
    }

    @RequestMapping("update")
    public String updateBlog(Integer bid,Model model){
        Blog blog = blogService.getBlogById(bid);
        model.addAttribute("blog",blog);
        return "addblog";
    }


}
