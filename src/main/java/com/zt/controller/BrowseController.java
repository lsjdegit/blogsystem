package com.zt.controller;


import com.zt.entity.BlogParameter;
import com.zt.entity.ListPage;
import com.zt.service.BrowseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/browse")
public class BrowseController {
    @Autowired
    private BrowseService browseService;

    private Integer pageSize = 4;



    @RequestMapping("selectbrowse")
    @ResponseBody
    public ListPage selectBrowse(@RequestBody BlogParameter blogParameter){
        System.out.println("进入 selectBrowse。。。。。。");
        System.out.println(blogParameter.getUid()+""+blogParameter.getPageIndex());
        List browselists=browseService.getBrowseByUser(blogParameter.getUid(),blogParameter.getPageIndex(),pageSize);
        int tatal =browseService.getBrowseByUserAll(blogParameter.getUid()).size();
        int tatalpage=tatal%pageSize==0?tatal/pageSize:tatal/pageSize+1;
        ListPage bpages=new ListPage();
        bpages.setList(browselists);
        bpages.setTotalPage(tatalpage);
        return bpages;
    }
}
