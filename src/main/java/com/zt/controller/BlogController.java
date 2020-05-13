package com.zt.controller;

import com.zt.entity.Blog;
import com.zt.entity.BlogParameter;
import com.zt.entity.ListPage;
import com.zt.entity.User;
import com.zt.mapper.BlogMapper;
import com.zt.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/blog")
public class BlogController {
    @Autowired
    private BlogService blogService;
    private Integer pageSize = 4;

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


}
