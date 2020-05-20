package com.zt.controller;


import com.zt.entity.*;
import com.zt.service.BrowseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/browse")
public class BrowseController {
    @Autowired
    private BrowseService browseService;

    private Integer pageSize = 10;



    @RequestMapping("selectbrowse")
    @ResponseBody
    public BrowseList selectBrowse(@RequestBody BlogParameter blogParameter){
        System.out.println("进入 selectBrowse。。。。。。");
        System.out.println(blogParameter.getUid()+""+blogParameter.getPageIndex());
        List<Browse> browselists=browseService.getBrowseByUser(blogParameter.getUid(),blogParameter.getPageIndex(),pageSize);
        List<Browse> browselist=browseService.getBrowseByUserAll(blogParameter.getUid());
        List<Blog> blogs = new ArrayList<Blog>();
        for(int i=0;i<browselists.size();i++){
            Browse browse = (Browse) browselists.get(i);
            blogs.add(browse.getBlog());
            System.out.println(browse.getBlog().getBtitle());
        }
        int tatal =browseService.getBrowseByUserAll(blogParameter.getUid()).size();
        int tatalpage=tatal%pageSize==0?tatal/pageSize:tatal/pageSize+1;
        BrowseList bpages=new BrowseList();
        bpages.setBrowselist(browselist);
        bpages.setTatalpage(tatalpage);
        bpages.setBloglist(blogs);
        return bpages;
    }

    @RequestMapping("del")
    @ResponseBody
    public boolean del( Integer uid){
        int unm = browseService.delall(uid);
        System.out.println(unm);
        if(unm>0){
            return true;
        }
        return false;
    }
}
